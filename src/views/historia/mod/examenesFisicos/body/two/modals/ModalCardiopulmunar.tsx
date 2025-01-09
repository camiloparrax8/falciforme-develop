import { Dialog } from '@/components/ui'

export default function ModalCardiopulmunar({  isOpen, onClose, onRequestClose }) {
    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            onRequestClose={onRequestClose}
        >
            <div className="flex flex-col h-full space-y-4">
                <h5>Cardiopulmonar</h5>
            </div>
        </Dialog>
    )
}
