import User from "../models/User.js";// Importa el modelo User

//READ
export const getUser = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el id de los parámetros de la solicitud
        const user = await User.findById(id); // Busca el usuario en la base de datos por su id
        res.status(200).json(user); // Envía la respuesta con el usuario
    } catch (error) {
        res.status(404).json({ error: error.message }); // Envía la respuesta con el error
    }
}

//
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el id de los parámetros de la solicitud
        const user = await User.findById(id); // Busca el usuario en la base de datos por su id

        const friends = await Promise.all(
            user.friends.map(id => User.findById(id))
        ); // Busca los amigos del usuario en la base de datos por su id

        const formatedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        })

        res.status(200).json(formatedFriends); // Envía la respuesta con los amigos del usuario formateados

    } catch (error) {
        res.status(404).json({ error: error.message }); // Envía la respuesta con el error
    }
}

//UPDATE
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params; // Obtiene el id del usuario y el id del amigo de los parámetros de la solicitud
        const user = await User.findById(id); // Busca el usuario en la base de datos por su id
        const friend = await User.findById(friendId); // Busca el amigo en la base de datos por su id

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter(id => id !== friendId); // Si el usuario ya tiene al amigo, lo elimina de la lista de amigos
            friend.friends = friend.friends.filter(id => id !== id); // Si el amigo ya tiene al usuario, lo elimina de la lista de amigos
        } else {
            user.friends.push(friendId); // Si el usuario no tiene al amigo, lo agrega a la lista de amigos
            friend.friends.push(id); // Si el amigo no tiene al usuario, lo agrega a la lista de amigos
        }
        await user.save(); // Guarda el usuario en la base de datos
        await friend.save(); // Guarda el amigo en la base de datos

        const friends = await Promise.all(
            user.friends.map(id => User.findById(id))
        ); // Busca los amigos del usuario en la base de datos por su id

        const formatedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        })

        res.status(200).json(formatedFriends); // Envía la respuesta con los amigos del usuario formateados

    } catch (error) {
        res.status(404).json({ error: error.message }); // Envía la respuesta con el error
    }
}