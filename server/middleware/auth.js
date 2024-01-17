import jwt from 'jsonwebtoken';


export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization"); // Obtiene el token de la cabecera de la solicitud

        if(!token){
            return res.status(403).json({error: "You are not authorized"}); // Si no hay token, envía la respuesta con el mensaje "You are not authorized"
        }

        if(token.startsWith("Bearer")){
            token=token.slice(7, token.length); // Elimina la palabra "Bearer " del token
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token
        req.user = verified; // Establece el usuario verificado en el objeto de solicitud

        next(); // Continúa con la siguiente función de middleware

    } catch (error) {
        res.status(500).json({error: error.message}); // Envía la respuesta con el error
    }
}