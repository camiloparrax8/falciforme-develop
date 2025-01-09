

import { Dialog } from '@/components/ui'

export default function ModalExamenORL({  isOpen, onClose, onRequestClose }) {
    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5>Examen ORL</h5>
            </div>
        </Dialog>
    )
}
