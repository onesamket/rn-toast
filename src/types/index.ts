export type ToastVariant = 
  | 'default'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'info'
  | 'loading'
  | 'custom'
  | 'error';

export interface ToastAction {
  label: string;
  onPress: () => void;
}

export interface ToastPromise {
  loading: string;
  success: string;
  error: string;
}

export interface Toast {
  id: string;
  description: string;
  variant?: ToastVariant;
  duration?: number;
  action?: ToastAction;
  promise?: ToastPromise;
  swipeToClose?: boolean;
  position?: 'top' | 'bottom';
}

export interface ToastContextType {
  toast: (toast: Omit<Toast, 'id'>) => string;
  dismissToast: (id: string) => void;
  promise: <T>(promise: Promise<T>, options: Omit<Toast, 'id' | 'variant'>) => Promise<T>;
  loading: (options: Omit<Toast, 'id' | 'variant'>) => string;
  success: (options: Omit<Toast, 'id' | 'variant'>) => string;
  error: (options: Omit<Toast, 'id' | 'variant'>) => string;
  warning: (options: Omit<Toast, 'id' | 'variant'>) => string;
  info: (options: Omit<Toast, 'id' | 'variant'>) => string;
  custom: (options: Omit<Toast, 'id'>) => string;
}