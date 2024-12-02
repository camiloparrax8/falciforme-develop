import ContentLoader from "react-content-loader";

const PacienteSkeleton = () => (
  <ContentLoader
    speed={1}
    width="100%" // Ancho dinámico basado en el contenedor
    height="auto" // Alto proporcional
    viewBox="0 0 100 16" // Usamos un viewBox en proporciones relativas
    backgroundColor="#85a4b7"
    foregroundColor="#ecebeb"
    preserveAspectRatio="xMinYMin meet" // Mantiene las proporciones
  >
    {/* Líneas ajustadas en porcentaje */}
    <rect x="5%" y="1" rx="0.3" ry="0.3" width="20%" height="0.6" />
    <rect x="5%" y="2.6" rx="0.3" ry="0.3" width="10%" height="0.6" />
    <rect x="0" y="5.6" rx="0.3" ry="0.3" width="40%" height="0.6" />
    <rect x="0" y="7.2" rx="0.3" ry="0.3" width="38%" height="0.6" />
    <rect x="0" y="8.8" rx="0.3" ry="0.3" width="15%" height="0.6" />

    {/* Círculo ajustado */}
    <circle cx="2" cy="2" r="2" />
  </ContentLoader>
);

export default PacienteSkeleton;
