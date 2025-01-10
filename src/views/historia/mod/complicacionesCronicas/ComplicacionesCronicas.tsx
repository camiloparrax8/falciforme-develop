import { Card } from "@/components/ui"
import ImgNino from "../examenesFisicos/body/ImgNino"
import SeccionOne from "./body/one/SeccionOne"
import SeccionTwo from "./body/two/SeccionTwo"
import SeccionTres from "./body/three/SeccionThree"

function ComplicacionesCronicas() {
  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Columna izquierda */}
        <ImgNino></ImgNino>
        {/* Columna derecha dividida en 3 secciones */}
        <div className="grid grid-rows-3 gap-4">
          <div className="p-4 text-white">
            {/* Sección 1 */}
            <SeccionOne></SeccionOne>
          </div>
          {/* Sección 2 */}
          <div className="p-4 text-white">
            {/* Sección 3 */}
            <SeccionTwo></SeccionTwo>
          </div>
          {/* Sección 3 */}
          <div className="p-4 text-white">
            <SeccionTres></SeccionTres>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ComplicacionesCronicas