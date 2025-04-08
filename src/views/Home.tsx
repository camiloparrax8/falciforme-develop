import SimpleDonut from '@/views/common/SimpleDonut'
import SplineArea from '@/views/common/SplineArea'
import BasicLine from '@/views/common/BasicLine'
import DashedLine from '@/views/common/DashedLine'

const Home = () => {
    return (
        <div className="flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[27px]">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">
                        Estadísticas de Soportes Transfusionales
                    </h2>
                    <SimpleDonut />
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">
                        Estadísticas de atenciones
                    </h2>
                    <SplineArea />
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">
                        Estadísticas de atenciones por mes
                    </h2>
                    <BasicLine />
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">
                        Estadísticas de Soportes Transfusionales
                    </h2>
                    <DashedLine />
                </div>
            </div>
        </div>
    )
}

export default Home
