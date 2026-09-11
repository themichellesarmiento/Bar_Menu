'use client'

import { useToastContext } from '@/contexts/UI/ToastContext';
import { ToastContextType } from '@/types/toast';

const ToastContainer = () => {
  const { toasts, dismissToast } = useToastContext() as ToastContextType

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center">
      {toasts.map(t => (
        <div key={t.id}
          className="bg-accent-three font-medium text-background px-4 py-2 rounded-lg shadow-lg text-sm md:text-base flex items-center gap-3 animate-[fadeSlideUp_0.2s_ease-out]">
          <span>{t.message}</span>
          <button onClick={() => dismissToast(t.id)}
            className="text-background/70 hover:text-background"> ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;