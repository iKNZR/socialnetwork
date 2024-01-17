import express from 'express'; // Framework de aplicaciones web para Node.js
import { getFeedPosts, getUserPosts, likePost} from '../controllers/posts.js'; // Importa las funciones getFeedPosts, getUserPosts y likePost del archivo posts.js en la carpeta controllers
import { verifyToken } from '../middleware/auth.js'; // Importa la función verifyToken del archivo auth.js en la carpeta middleware

const router = express.Router(); // Crea una instancia de Router

//READ
router.get('/', verifyToken, getFeedPosts);// Establece la ruta para obtener las publicaciones del feed
router.get('/:userId/posts', verifyToken, getUserPosts);// Establece la ruta para obtener las publicaciones de un usuario por su id

//UPDATE
router.patch('/:id/like', verifyToken, likePost);// Establece la ruta para dar like a una publicación por su id

export default router; // Exporta el router