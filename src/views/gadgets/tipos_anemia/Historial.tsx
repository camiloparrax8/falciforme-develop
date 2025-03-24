import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui';
import TableCustomHistorialType from '@/views/common/TableCustomHistorialType';

function List() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://anemia-classifier-back-production.up.railway.app/api/v1/patients-type')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>Error al cargar los datos: {error.message}</p>;

    return (
        <div>
            <Card>
                <TableCustomHistorialType data={data} className={'mx-4'}/>
            </Card>
        </div>
    );
}

export default List;
