import {Box} from "@mui/material";
import {styled } from "@mui/system";

/**
 * Componente envolvente para los widgets.
 * @component
 */
const WidgetWrapper = styled(Box)(({theme}) => ({
    padding : "1.5rem 1.5rem 0.75rem 1.5rem", // Agrega relleno a la parte superior, derecha, inferior e izquierda del componente
    backgroundColor : theme.palette.background.alt, // Establece el color de fondo del componente utilizando el color de fondo alternativo del tema
    borderRadius: "0.75rem" // Establece el radio de borde del componente
}));


export default WidgetWrapper;