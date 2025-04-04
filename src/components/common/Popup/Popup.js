// import { createPortal } from 'react-dom';

// import { ReactComponent as CloseIcon } from 'assets/svgs/close.svg';
// import styles from './Popup.module.scss';

// function Popup({ children, onClose }) {
//   const popupPlaceholder = document.getElementById('popupPlaceholder');
//   const handleOutsideClick = (e) => {
//     if (e.target.classList.contains(styles.backdrop)) {
//       onClose();
//     }
//   };
//   const element = (
//     <dialog className={styles.popupContainer} onClick={handleOutsideClick}>
//       <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
//         {children}
//         <CloseIcon className={styles.closeIcon} onClick={onClose} />
//       </div>
//     </dialog>
//   );

//   return createPortal(element, popupPlaceholder);
// }

// export default Popup;
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as CloseIcon } from 'assets/svgs/close.svg';
import styles from './Popup.module.scss';

function Popup({ children, onClose }) {
  const popupPlaceholder = document.getElementById('popupPlaceholder');
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }

    const handleCancel = (e) => {
      e.preventDefault(); // Prevent default behavior of closing the dialog
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);

    return () => {
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const element = (
    <dialog
      ref={dialogRef}
      className={styles.popupContainer}
      onClick={handleBackdropClick}
    >
      <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
        {children}
        <CloseIcon className={styles.closeIcon} onClick={onClose} />
      </div>
    </dialog>
  );

  return createPortal(element, popupPlaceholder);
}

export default Popup;
