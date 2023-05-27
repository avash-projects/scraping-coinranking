import toast from 'react-hot-toast';

type Notifytype = 'blank' | 'success' | 'error';
type Position = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'

export const notify = (message: string, type: Notifytype, position: Position) => {
    switch (type) {
        case 'blank':
            toast(message, { position })
            break;
        case 'success':
            toast.success(message, { position })
            break;
        case 'error':
            toast.error(message, { position })
            break;
        default:
            break;
    }
}
