import dotenv from 'dotenv'; // Loads environment variables from a .env file into process.env
import express from 'express'; // Fast, unopinionated, minimalist web framework for Node.js
import bodyParser from 'body-parser'; // Node.js body parsing middleware
import mongoose from 'mongoose'; // MongoDB object modeling tool designed to work in an asynchronous environment
import cors from 'cors'; // Middleware that enables cross-origin resource sharing
import multer from 'multer'; // Middleware for handling multipart/form-data, primarily used for file uploads
import helmet from 'helmet'; // Helps secure Express apps by setting various HTTP headers
import morgan from 'morgan'; // HTTP request logger middleware for Node.js
import path from 'path'; // Provides utilities for working with file and directory paths
import { fileURLToPath } from 'url'; // Provides utilities for working with file and directory paths
import authRoutes from './routes/auth.js'; // Importa las rutas de autenticación desde el archivo auth.js en la carpeta routes
import userRoutes from './routes/users.js'; // Importa las rutas de usuario desde el archivo user.js en la carpeta routes
import postRoutes from './routes/posts.js'; // Importa las rutas de publicaciones desde el archivo posts.js en la carpeta routes
import { register } from './controllers/auth.js'; // Importa la función register del archivo auth.js en la carpeta controllers
import { createPost } from './controllers/posts.js'; // Importa la función createPost del archivo posts.js en la carpeta controllers
import { verifyToken } from './middleware/auth.js'; // Importa la función verifyToken del archivo auth.js en la carpeta middleware

//para inyección manual de data que se trae de la carpeta "data"
// import User from './models/User.js'; // Importa el modelo User
// import Post from './models/Post.js'; // Importa el modelo Post
// import { users, posts} from './data/index.js'; // Importa los datos de usuarios y publicaciones


// CONFIGURATIONS

const __filename = fileURLToPath(import.meta.url); // Convierte la URL del archivo en una ruta de archivo
const __dirname = path.dirname(__filename); // Obtiene el nombre del directorio a partir de la ruta del archivo
dotenv.config(); // Carga las variables de entorno desde un archivo .env en process.env
const app = express(); // Crea una instancia de la aplicación Express
app.use(express.json()); // Analiza las solicitudes entrantes con cargas útiles JSON
app.use(helmet()); // Establece varios encabezados HTTP para asegurar la aplicación Express
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })); // Establece el encabezado Cross-Origin Resource Policy
app.use(morgan("common")); // Registra las solicitudes HTTP en la consola
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Analiza las solicitudes entrantes con cargas útiles JSON y establece el límite de tamaño de carga útil
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Analiza las solicitudes entrantes con cargas útiles codificadas en URL y establece el límite de tamaño de carga útil
app.use(cors()); // Habilita el intercambio de recursos de origen cruzado (CORS)
app.use("/assets", express.static(path.join(__dirname, 'public/assets'))); // Sirve archivos estáticos desde el directorio especificado


// FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets'); // Establece la carpeta de destino donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Establece el nombre del archivo guardado como el nombre original del archivo
    }
});

const upload = multer({ storage }); // Crea una instancia de multer con la configuración de almacenamiento


//ROUTES WITH FILES
app.post('/auth/register', upload.single('picture'), register);// Establece la ruta para registrar un usuario
app.post('/posts', verifyToken, upload.single('picture'), createPost);// Establece la ruta para crear una publicación

//ROUTES WITHOUT FILES
app.use('/auth', authRoutes); // Establece el prefijo /auth para las rutas de autenticación
app.use('/users', userRoutes); // Establece el prefijo /users para las rutas de usuario
app.use('/posts', postRoutes); // Establece el prefijo /posts para las rutas de publicaciones


// DATABASE CONNECTION
const PORT = process.env.PORT || 6001; // Establece el puerto de escucha del servidor
const URL = process.env.MONGO_URL; // Establece la URL de la base de datos

mongoose.connect(URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

        //inyección manual de data que se trae de la carpeta "data"
        // User.insertMany(users);
        // Post.insertMany(posts);
    })
    .catch(err => console.log(`Error: ${err} did not connect`));


/*mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
}).catch(err => console.log(`Error: ${err} did not connect`));*/ //FORMA ANTIGUA DE CONECTAR MONGODB