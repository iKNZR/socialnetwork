import express from 'express'; // Framework de aplicaciones web para Node.js
import {login} from '../controllers/auth.js'; // Importa la función login del archivo auth.js en la carpeta controllers

const router = express.Router(); // Crea una instancia de Router

router.post('/login', login);


export default router; // Exporta el router