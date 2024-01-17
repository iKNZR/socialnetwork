import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light", // Modo de la aplicación (light o dark)
    user :null, // Usuario actualmente autenticado
    token: null, // Token de autenticación del usuario
    posts: [], // Lista de publicaciones
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) =>{ // Función para cambiar el modo de la aplicación
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action)=>{ // Función para establecer el usuario y el token al iniciar sesión
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) =>{ // Función para eliminar el usuario y el token al cerrar sesión
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => { // Función para establecer la lista de amigos del usuario
            if(state.user) {
                state.user.friends = action.payload.friends;
            } else {
                throw new Error("Cannot set friends because user is not logged in");
            }
        },
        setPosts:(state, action) => { // Función para establecer la lista de publicaciones
            state.posts = action.payload.posts;
        },
        setPost: (state, action) =>{ // Función para actualizar una publicación específica
            const updatedPosts = state.posts.map(post =>{
                if(post._id === action.payload.post._id){
                    return action.payload.post;
                }
                return post;
            })
            state.posts = updatedPosts;
        }
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;