export type ToastType = 'success' | 'error' | 'info' | 'warn';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}
