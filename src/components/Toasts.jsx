import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dismissToast, selectToasts } from '../store/toastSlice/slice'
import { CheckIcon } from './icons'

const TOAST_MS = 2600

// Each toast schedules its own dismissal so several can stack at once.
function ToastItem({ toast, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(toast.id), TOAST_MS)
    return () => clearTimeout(timer)
  }, [toast.id, onClose])

  return (
    <div className={`toast toast-${toast.type}`}>
      {toast.type === 'success' && <CheckIcon size={16} />}
      <span>{toast.message}</span>
    </div>
  )
}

function Toasts() {
  const dispatch = useDispatch()
  const toasts = useSelector(selectToasts)
  const close = useCallback((id) => dispatch(dismissToast(id)), [dispatch])

  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={close} />
      ))}
    </div>
  )
}

export default Toasts
