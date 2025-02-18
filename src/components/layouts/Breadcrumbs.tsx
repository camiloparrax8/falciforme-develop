import { useLocation, Link } from "react-router-dom";


const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);


    // Mapear segmentos a nombres legibles
    const breadcrumbMap: { [key: string]: string } = {
        "home": " ",
        "historia-clinica": "Historia Clínica",
        "paciente": "Pacientes",
        "usuario": "Usuarios",
        "add": "Agregar",
        "img-diagnosticas": "Imágenes Diagnósticas",
        "complicaciones-agudas": "Complicaciones Agudas",
        "complicaciones-cronicas": "Complicaciones Crónicas",
        "examenes-fisicos": "Exámenes Físicos",
        "laboratorios": "Laboratorios",
        "soportes-transfucionales": "Soportes Transfusionales",
        "transplantes-progenitores": "Trasplantes de Progenitores",
        "tratamientos": "Tratamientos",
        "Vacunas": "Vacunas",
    };

    return (
        <nav aria-label="breadcrumb" className="bg-gray-100 p-3 rounded">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
                {/* Miga inicial para Home */}
                <li>
                    <Link to="/" className="text-blue-500 hover:underline">
                        Inicio
                    </Link>
                    <span className="mx-2 text-gray-400">/</span>
                </li>

                {pathnames.map((value, index) => {
                    const isLast = index === pathnames.length - 1;
                    const pathTo = `/${pathnames.slice(0, index + 1).join("/")}`;

                    // Si es dinámico, muestra el ID directamente
                    const displayName = breadcrumbMap[value] || (isNaN(Number(value)) ? value : `Modulos`);


                    return (
                        <li key={index}>
                            {isLast ? (
                                <span className="text-gray-700 font-semibold">
                                    {displayName}
                                </span>
                            ) : (
                                <Link
                                    to={pathTo}
                                    className="text-blue-500 hover:underline"
                                >
                                    {displayName}
                                </Link>
                            )}
                            {!isLast && <span className="mx-2 text-gray-400">/</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;