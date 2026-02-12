from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import openai
import json
import uuid
from services.video_service import video_service
from templates import TEMPLATES

load_dotenv()

app = FastAPI(title="Clipora API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for output
os.makedirs("outputs", exist_ok=True)
app.mount("/outputs", StaticFiles(directory="outputs"), name="outputs")

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class VideoRequest(BaseModel):
    topic: str
    tone: str
    length: int
    platform: str
    voice: str = "onyx"
    template: str = None

@app.get("/")
async def root():
    return {"message": "Welcome to Clipora API"}

@app.post("/generate-script")
async def generate_script(request: VideoRequest):
    try:
        template_info = TEMPLATES.get(request.template, {})
        extra_prompt = template_info.get("prompt_extra", "")
        
        prompt = f"""
        Generate a viral {request.platform} script about '{request.topic}'.
        Tone: {request.tone}
        Duration: Approximately {request.length} seconds.
        {extra_prompt}
        
        The script must:
        1. Hook the viewer in the first 3 seconds.
        2. Be optimized for high retention.
        3. Include a call-to-action at the end.
        4. Be structured as a series of scenes with visual descriptions.
        
        Format the output as JSON:
        {{
            "title": "...",
            "hook": "...",
            "scenes": [
                {{
                    "text": "...",
                    "visual_description": "...",
                    "duration": 5
                }},
                ...
            ],
            "cta": "..."
        }}
        """
        
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            response_format={ "type": "json_object" }
        )
        
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate-video")
async def generate_full_video(request: VideoRequest):
    try:
        # 1. Generate Script
        script_data = await generate_script(request)
        scenes = script_data['scenes']
        
        job_id = str(uuid.uuid4())
        job_dir = os.path.join("outputs", job_id)
        os.makedirs(job_dir, exist_ok=True)
        
        voiceover_paths = []
        
        # 2. Generate Assets
        for i, scene in enumerate(scenes):
            # Voiceover
            vo_path = os.path.join(job_dir, f"voice_{i}.mp3")
            await video_service.generate_voiceover(scene['text'], vo_path, voice=request.voice)
            voiceover_paths.append(vo_path)
            
            # Image
            img_path = os.path.join(job_dir, f"image_{i}.png")
            await video_service.generate_image(scene['visual_description'], img_path)
            
        # 3. Assemble
        output_filename = f"{job_id}_final.mp4"
        final_video_path = video_service.assemble_video(scenes, voiceover_paths, output_filename)
        
        return {
            "status": "success",
            "video_url": f"/outputs/{output_filename}",
            "script": script_data
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
