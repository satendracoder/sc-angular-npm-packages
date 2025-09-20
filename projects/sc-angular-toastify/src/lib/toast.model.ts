export type ToastType = 'success' | 'error' | 'info' | 'warn';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
  position?: ToastPosition;
  closing?: boolean; // for slide-out animation
}
