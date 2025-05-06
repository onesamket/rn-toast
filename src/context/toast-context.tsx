import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Toast, ToastContextType } from '../types/index';
import { Toaster } from '../components/toaster';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutRefs = useMemo(() => new Map<string, NodeJS.Timeout>(), []);

  const dismissToast = useCallback((id: string) => {
    const timeout = timeoutRefs.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutRefs.delete(id);
    }
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  }, [timeoutRefs]);

  const createToast = useCallback(
    (options: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).substr(2, 9);
      const toast = { ...options, id };
      setToasts((prevToasts) => [...prevToasts, toast]);

      if (options.duration !== 0) {
        const timeout = setTimeout(() => {
          dismissToast(id);
        }, options.duration || 3000);
        timeoutRefs.set(id, timeout);
      }

      return id;
    },
    [dismissToast, timeoutRefs]
  );

  const toast = useCallback(
    (options: Omit<Toast, 'id'>) => {
      return createToast({ ...options, variant: options.variant || 'default' });
    },
    [createToast]
  );

  const promise = useCallback(
    <T,>(promise: Promise<T>, options: Omit<Toast, 'id' | 'variant'>) => {
      const loadingId = createToast({
        ...options,
        variant: 'loading',
        duration: 0,
        description: options.promise?.loading || 'Loading...',
      });

      return promise
        .then((result) => {
          dismissToast(loadingId);
          createToast({
            ...options,
            variant: 'success',
            description: options.promise?.success || 'Success',
          });
          return result;
        })
        .catch((error) => {
          dismissToast(loadingId);
          createToast({
            ...options,
            variant: 'destructive',
            description: options.promise?.error || error.message || 'Error',
          });
          throw error;
        });
    },
    [createToast, dismissToast]
  );

  const loading = useCallback(
    (options: Omit<Toast, 'id' | 'variant'>) => {
      return createToast({ ...options, variant: 'loading' });
    },
    [createToast]
  );

  const success = useCallback(
    (options: Omit<Toast, 'id' | 'variant'>) => {
      return createToast({ ...options, variant: 'success' });
    },
    [createToast]
  );

  const error = useCallback(
    (options: Omit<Toast, 'id' | 'variant'>) => {
      return createToast({ ...options, variant: 'destructive' });
    },
    [createToast]
  );

  const warning = useCallback(
    (options: Omit<Toast, 'id' | 'variant'>) => {
      return createToast({ ...options, variant: 'warning' });
    },
    [createToast]
  );

  const info = useCallback(
    (options: Omit<Toast, 'id' | 'variant'>) => {
      return createToast({ ...options, variant: 'info' });
    },
    [createToast]
  );

  const custom = useCallback(
    (options: Omit<Toast, 'id'>) => {
      return createToast({ ...options, variant: 'custom' });
    },
    [createToast]
  );

  // Social media notification methods
  const mention = useCallback(
    (options: Omit<Toast, 'id' | 'variant'>) => {
      return createToast({ ...options, variant: 'mention' });
    },
    [createToast]
  );

  const reaction = useCallback(
    (options: Omit<Toast, 'id' | 'variant'>) => {
      return createToast({ ...options, variant: 'reaction' });
    },
    [createToast]
  );

  const follow = useCallback(
    (options: Omit<Toast, 'id' | 'variant'>) => {
      return createToast({ ...options, variant: 'follow' });
    },
    [createToast]
  );

  const repost = useCallback(
    (options: Omit<Toast, 'id' | 'variant'>) => {
      return createToast({ ...options, variant: 'repost' });
    },
    [createToast]
  );

  const message = useCallback(
    (options: Omit<Toast, 'id' | 'variant'>) => {
      return createToast({ ...options, variant: 'message' });
    },
    [createToast]
  );

  // System notification methods
  const connection = useCallback(
    (options: Omit<Toast, 'id' | 'variant'>) => {
      return createToast({ ...options, variant: 'connection' });
    },
    [createToast]
  );

  const battery = useCallback(
    (options: Omit<Toast, 'id' | 'variant'>) => {
      return createToast({ ...options, variant: 'battery' });
    },
    [createToast]
  );

  const update = useCallback(
    (options: Omit<Toast, 'id' | 'variant'>) => {
      return createToast({ ...options, variant: 'update' });
    },
    [createToast]
  );

  const maintenance = useCallback(
    (options: Omit<Toast, 'id' | 'variant'>) => {
      return createToast({ ...options, variant: 'maintenance' });
    },
    [createToast]
  );

  const contextValue = useMemo(
    () => ({
      toast,
      dismissToast,
      promise,
      loading,
      success,
      error,
      warning,
      info,
      custom,
      // Social media notification methods
      mention,
      reaction,
      follow,
      repost,
      message,
      // System notification methods
      connection,
      battery,
      update,
      maintenance,
    }),
    [
      toast, dismissToast, promise, loading, success, error, warning, info, custom,
      mention, reaction, follow, repost, message,
      connection, battery, update, maintenance
    ]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toaster toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

// Hook
export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export default ToastContext;
