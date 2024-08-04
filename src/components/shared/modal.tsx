'use client';
import { X } from 'lucide-react';
import {
  cloneElement,
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';

import { createPortal } from 'react-dom';
import { Button } from '../ui/button';
import { useOutsideClick } from '@/hooks/ui/useOutsideClick';

interface ModalContext {
  openName: string;
  close: () => void;
  open: (name: string) => void;
}

interface ModalProps {
  children: ReactNode;
}

export const ModalContext = createContext<ModalContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export default function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>('');

  const close = () => setOpenName('');
  const open = (name: string) => setOpenName(name);

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

interface OpenProps {
  children: ReactNode;
  opens: string;
}

function Open({ children, opens }: OpenProps) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('Header must be used within a Table');
  }

  const { open } = context;

  return cloneElement(children as React.ReactElement, {
    onClick: () => open(opens),
  });
}

interface WindowProps {
  children: React.ReactElement;
  name: string;
  showCloseButton?: boolean;
  onCloseCallback?: () => void;
}

function Window({
  children,
  name,
  showCloseButton = true,
  onCloseCallback,
}: WindowProps) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('Window must be used within a Modal.Provider');
  }

  const { close, openName } = context;
  
  const onCloseModal = () => {
    close();
    if (onCloseCallback) onCloseCallback();
  };

  const ref = useOutsideClick({ handler: onCloseModal });

  if (name !== openName) return null;

  return createPortal(
    // Overlay
    <div className='fixed top-0 left-0 w-screen h-full backdrop-blur-sm transition-all z-50 isolate '>
      {/* Modal  */}
      <div
        ref={ref}
        className='w-screen h-screen rounded-none sm:rounded-[16px] sm:w-auto sm:h-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700  py-10 px-[43px] transition-all pointer-events-auto '
      >
        {showCloseButton && (
          <Button
            variant='link'
            className='absolute top-8 right-1'
            onClick={onCloseModal}
          >
            <X aria-hidden='true' size={30} />
          </Button>
        )}
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Window = Window;
Modal.Open = Open;
