const express = require('express');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configura Cloudinary con tus credenciales del archivo .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(bodyParser.json());

// Ruta para eliminar la imagen de Cloudinary
app.post('/deleteImage', async (req, res) => {
  const { public_id } = req.body; // Espera el public_id desde el cliente

  if (!public_id) {
    return res.status(400).json({ error: 'Falta el public_id de la imagen.' });
  }

  try {
    await cloudinary.uploader.destroy(public_id);
    res.json({ message: 'Imagen eliminada exitosamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la imagen de Cloudinary.', details: error });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
