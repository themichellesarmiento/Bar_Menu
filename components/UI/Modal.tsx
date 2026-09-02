'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalPropsObj {
  children: ReactNode;
  open: boolean;
  onClose?: () => void;
}

const Modal = ({ children, open, onClose }: ModalPropsObj) => {
  const dialog = useRef<HTMLDialogElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const modal = dialog.current;
    if (!modal) return;
    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [open, mounted]);

  if (!mounted) return null;

  const modalRoot = document.querySelector('#modal');
  if (!modalRoot) return null;

  return createPortal(
    <dialog
      className='rounded-2xl border-none shadow-2xl max-w-2xl w-[80%] p-8 fixed inset-0 m-auto backdrop:bg-black/55 animate-[fadeSlideUp_0.3s_ease-out_forwards]'
      ref={dialog} onClose={onClose}>
      {children}
    </dialog>,
    modalRoot
  );
};

export default Modal;