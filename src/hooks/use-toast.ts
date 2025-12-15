import { useState, useEffect } from "react"

type ToastProps = {
  title?: string
  description?: string
  action?: React.ReactNode
}

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = ({ title, description, action }: ToastProps) => {
    console.log("Toast:", title, description)
    // In a real implementation, this would add to a state that renders a Toast component
    // For now, we just log it to avoid the crash and provide feedback
    // We could also use a simple alert if we wanted visible feedback without the UI components
    // alert(`${title}\n${description}`) 
  }

  return {
    toast,
    toasts,
    dismiss: (toastId?: string) => console.log("Dismiss", toastId),
  }
}
