import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

//REGISTER

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, picturePath, friends, location, occupation } = req.body; // Obtiene los datos del cuerpo de la solicitud

        const salt = await bcrypt.genSalt(10); // Genera un salt para el hash de la contraseña
        const passwordHash = await bcrypt.hash(password, salt); // Genera un hash de la contraseña

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        }); // Crea una nueva instancia del modelo User

        const savedUser = await newUser.save(); // Guarda el usuario en la base de datos
        res.status(200).json(savedUser); // Envía la respuesta con el usuario guardado
    } catch (error) {
        res.status(500).json({ error: error.message }); // Envía la respuesta con el error
    }
}


//LOGIN

export const login = async (req, res) => {
    try {
        const { email, password } = req.body; // Obtiene los datos del cuerpo de la solicitud
        const user = await User.findOne({ email: email });    // Busca el usuario en la base de datos

        if(!user) return res.status(400).json({ message: "User not found" }); // Si el usuario no existe, envía la respuesta con el mensaje "User not found"

        const isMatch = await bcrypt.compare(password, user.password); // Compara la contraseña ingresada con la contraseña almacenada en la base de datos
        if(!isMatch) return res.status(400).json({ message: "Incorrect password" }); // Si la contraseña no coincide, envía la respuesta con el mensaje "Incorrect password"

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET); // Crea un token de autenticación
        delete user.password; // Elimina la contraseña del usuario del response
        res.status(200).json({token, user}); // Envía la respuesta con el token y el usuario

    } catch (error) {
        res.status(500).json({ error: error.message }); // Envía la respuesta con el error
    }
}