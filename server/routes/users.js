import express from 'express'; // Framework de aplicaciones web para Node.js
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from '../controllers/users.js'; // Importa las funciones getUser, getUserFriends y addRemoveFriend del archivo users.js en la carpeta controllers
import { verifyToken } from '../middleware/auth.js'; // Importa la función verifyToken del archivo auth.js en la carpeta middleware

const router = express.Router(); // Crea una instancia de Router

//READ
router.get('/:id', verifyToken, getUser);// Establece la ruta para obtener un usuario por su id
router.get('/:id/friends', verifyToken, getUserFriends);// Establece la ruta para obtener los amigos de un usuario por su id

//UPDATE
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);// Establece la ruta para agregar o eliminar un amigo de un usuario por su id

export default router; // Exporta el router