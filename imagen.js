require('dotenv').config();
const express = require('express');
const axios = require('axios');


const app = express();
const PORT = process.env.PORT || 3003;


// Middleware para parsear JSON
app.use(express.json());


// Endpoint para generar una imagen a partir de un prompt
app.post('/generate-image', async (req, res) => {
    const { prompt, negative_prompt, samples, quality, guidance_scale, aspect_ratio, style } = req.body;


    // Validar que se proporcionen los campos obligatorios
    if (!prompt || !aspect_ratio || !style) {
        return res.status(400).json({ error: 'Los campos "prompt", "aspect_ratio" y "style" son obligatorios.' });
    }


    try {
        // Crear el cuerpo de la solicitud para la API de LimeWire
        const requestBody = {
            prompt,
            negative_prompt: negative_prompt || '', // Puede ser opcional
            samples: samples || 1, // Valor por defecto
            quality: quality || 'LOW', // Valor por defecto
            guidance_scale: guidance_scale || 50, // Valor por defecto
            aspect_ratio,
            style: style || 'PHOTOREALISTIC' // Valor por defecto
        };


        // Realizar la solicitud a la API de LimeWire
        const response = await axios.post(
            'https://api.limewire.com/api/image/generation', // URL de la API de LimeWire
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Api-Version': 'v1',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${process.env.LIMEWIRE_API_KEY}` // Asegúrate de tener tu clave en .env
                }
            }
        );


        // Suponiendo que la respuesta contiene la URL de la imagen
        const data = response.data; // Obtén los datos de la respuesta
        res.status(200).json(data); // Envía la respuesta al cliente
    } catch (error) {
        console.error('Error al generar la imagen:', error.message);


        // Manejo de errores según la respuesta de la API de LimeWire
        if (error.response) {
            res.status(error.response.status).json({
                error: error.response.data.message || 'Error en la solicitud a LimeWire.'
            });
        } else {
            res.status(500).json({ error: 'Error al comunicarse con la API de LimeWire.' });
        }
    }
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
