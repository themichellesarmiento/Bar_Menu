export interface Toast {
  id: string,
  message: string
}

export interface ToastContextType {
  toasts: Toast[],
  showToast: (message: string) => void,
  dismissToast: (id: string) => void
}