﻿# api_AI_Limewire
Asegúrate de tener tu clave API de LimeWire en un archivo .env
Para probarlo usando Postman, asegúrate de enviar una solicitud POST a "http://localhost:3003/generate-image", welecciona raw y JSON en la pestaña Body de Postman, con el siguiente JSON:
 {
    "prompt": "A cute heart in love",
    "negative_prompt": "darkness, fog",
    "samples": 1,
    "quality": "LOW",
    "guidance_scale": 50,
    "aspect_ratio": "1:1",
    "style": "PHOTOREALISTIC"
}  
