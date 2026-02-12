import os
import requests
import openai
from dotenv import load_dotenv
import subprocess
import json
import uuid
import logging
from typing import List, Dict

load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class VideoService:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.client = openai.OpenAI(api_key=self.api_key)
        self.output_dir = os.path.abspath("outputs")
        os.makedirs(self.output_dir, exist_ok=True)
        
        self.ffmpeg_path = "ffmpeg"
        self.ffprobe_path = "ffprobe"

    def _check_ffmpeg(self):
        """Checks if ffmpeg is available."""
        try:
            subprocess.run([self.ffmpeg_path, "-version"], capture_output=True, check=True)
            return True
        except:
            return False

    async def generate_voiceover(self, text: str, output_path: str, voice: str = "onyx"):
        """Generates AI voiceover using OpenAI TTS."""
        logger.info(f"Generating voiceover for: {text[:30]}...")
        response = self.client.audio.speech.create(
            model="tts-1",
            voice=voice,
            input=text
        )
        response.stream_to_file(output_path)
        return output_path

    async def generate_image(self, prompt: str, output_path: str):
        """Generates an image using DALL-E 3."""
        logger.info(f"Generating image for prompt: {prompt[:30]}...")
        try:
            response = self.client.images.generate(
                model="dall-e-3",
                prompt=prompt + ". High quality, cinematic, 9:16 vertical aspect ratio for TikTok/Reels.",
                size="1024x1792",
                quality="standard",
                n=1,
            )
            image_url = response.data[0].url
            img_data = requests.get(image_url).content
            with open(output_path, 'wb') as f:
                f.write(img_data)
            return output_path
        except Exception as e:
            logger.error(f"Error generating image: {e}")
            return None

    def assemble_video(self, scenes: List[Dict], voiceover_paths: List[str], output_filename: str):
        """Assembles the final video using FFmpeg."""
        if not self._check_ffmpeg():
            logger.error("FFmpeg not found! Cannot assemble video.")
            raise RuntimeError("FFmpeg not found on system. Please install it to generate videos.")

        job_id = str(uuid.uuid4())
        project_dir = os.path.join(self.output_dir, job_id)
        os.makedirs(project_dir, exist_ok=True)
        
        scene_videos = []
        
        for i, scene in enumerate(scenes):
            img_path = os.path.join(project_dir, f"image_{i}.png")
            audio_path = voiceover_paths[i]
            scene_video_path = os.path.join(project_dir, f"scene_{i}.mp4")
            
            # Get audio duration
            duration_cmd = [self.ffprobe_path, "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", audio_path]
            duration = float(subprocess.check_output(duration_cmd).decode().strip())
            
            # Create scene video: image + audio + subtitle overlay
            # Using a simple zoom-in effect (ken burns)
            filter_complex = (
                f"zoompan=z='min(zoom+0.0015,1.5)':d={int(duration*25)}:s=1080x1920,"
                f"drawtext=text='{scene['text']}':fontcolor=white:fontsize=60:x=(w-text_w)/2:y=h-400:"
                f"box=1:boxcolor=black@0.5:boxborderw=20"
            )
            
            cmd = [
                self.ffmpeg_path, "-y",
                "-loop", "1", "-i", img_path,
                "-i", audio_path,
                "-vf", filter_complex,
                "-c:v", "libx264", "-t", str(duration), "-pix_fmt", "yuv420p",
                "-c:a", "aac", "-b:a", "192k", "-shortest",
                scene_video_path
            ]
            subprocess.run(cmd, check=True)
            scene_videos.append(scene_video_path)
            
        # Concatenate scenes
        list_path = os.path.join(project_dir, "scenes.txt")
        with open(list_path, "w") as f:
            for v in scene_videos:
                # Use absolute paths and escape single quotes for ffmpeg concat
                v_abs = os.path.abspath(v).replace("'", "'\\''")
                f.write(f"file '{v_abs}'\n")
                
        final_output = os.path.join(self.output_dir, output_filename)
        concat_cmd = [
            self.ffmpeg_path, "-y",
            "-f", "concat", "-safe", "0", "-i", list_path,
            "-c", "copy", final_output
        ]
        subprocess.run(concat_cmd, check=True)
        return final_output

# Service instance
video_service = VideoService()
