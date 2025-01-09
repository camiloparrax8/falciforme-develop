import { Dialog } from '@/components/ui'

export default function ModalPerimetroCefalico({  isOpen, onClose, onRequestClose }) {
    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5>Perimetro Cefalico</h5>
            </div>
        </Dialog>
    )
}
