import Post from '../models/Post.js';
import User from '../models/User.js';

//CREATE
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body; // Extrae los datos del cuerpo de la petición
        const user = await User.findById(userId); // Busca el usuario en la base de datos
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        }) // Crea un nuevo post

        await newPost.save(); // Guarda el post en la base de datos

        const post = await Post.find();
        res.status(201).json(post); // Envía la respuesta con el post creado
    } catch (error) {
        res.status(409).json({ error: error.message }); // Envía la respuesta con el error
    }
}; // Establece la función para crear un post

//READ
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post); // Envía la respuesta con el post creado
    } catch (error) {
        res.status(404).json({ error: error.message }); // Envía la respuesta con el error
    }
}; // Establece la función para obtener las publicaciones del feed

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;// Extrae el id del usuario de los parámetros de la petición
        const post = await Post.find({ userId }); // Busca el usuario en la base de datos
        res.status(200).json(post); // Envía la respuesta con el post creado
    } catch (error) {
        res.status(404).json({ error: error.message }); // Envía la respuesta con el error
    }
};// Establece la función para obtener las publicaciones de un usuario por su id

//UPDATE
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;// Extrae el id del post de los parámetros de la petición
        const { userId } = req.body;// Extrae el id del usuario de los parámetros de la petición
        const post = await Post.findById(id); // Busca el post en la base de datos
        const isLiked = post.likes.get(userId); // Verifica si el usuario ya le dio like al post

        if (isLiked) {
            post.likes.delete(userId); // Si ya le dio like, lo elimina
        } else {
            post.likes.set(userId, true); // Si no le ha dado like, lo agrega
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id, // Busca el post por su id
            { likes: post.likes },  // Actualiza los likes del post
            { new: true } // Devuelve el post actualizado
        ); // Actualiza el post en la base de datos

        res.status(200).json(updatedPost); // Envía la respuesta con el post actualizado

    } catch (error) {
        res.status(404).json({ error: error.message }); // Envía la respuesta con el error
    }
}; // Establece la función para dar like a una publicación por su id