import { Card } from '@/components/ui'
import FormExamenesFisicos from './FormExamenesFisicos'
import ImgNino from './body/ImgNino'
import SeccionOne from './body/one/SeccionOne'
import SeccionTwo from './body/two/SeccionTwo'
import SeccionThree from './body/three/SeccionThree'

function ExamenesFisicos() {
    return (
        <Card>
            <FormExamenesFisicos></FormExamenesFisicos>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Columna izquierda */}
                <ImgNino></ImgNino>
                {/* Columna derecha dividida en 3 secciones */}
                <div className="grid grid-rows-3 gap-4">
                    <div className="p-4 text-white">
                        {/* Sección 1 */}
                        <SeccionOne></SeccionOne>
                    </div>
                    <div className="p-4 text-white">
                        {/* Sección 2 */}
                        <SeccionTwo></SeccionTwo>
                    </div>
                    <div className="p-4 text-white">
                        {/* Sección 3 */}
                        <SeccionThree></SeccionThree>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ExamenesFisicos
