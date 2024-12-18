import { useParams } from 'react-router-dom';

const HistoriaClinica = () => {
    const { id } = useParams(); 


    return (
        <div>
            <h1>Historia Clínica</h1>
            <p>ID del paciente: {id}</p>
        </div>
    );
};

export default HistoriaClinica;