import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ open, children, close }) {
  const dialog = useRef();

  useEffect( () => {
    console.log("initial render");
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open] );

  // useImperativeHandle(ref, () => {
  //   return {
  //     open: () => {
  //       dialog.current.showModal();
  //     },
  //     close: () => {
  //       dialog.current.close();
  //     },
  //   };
  // });

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={close}>
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
