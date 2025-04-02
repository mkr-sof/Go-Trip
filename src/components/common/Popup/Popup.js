import { createPortal } from 'react-dom';

import { ReactComponent as CloseIcon } from 'assets/svgs/close.svg';
import styles from './Popup.module.scss';

function Popup({ children, onClose }) {
  const popupPlaceholder = document.getElementById('popupPlaceholder');

  const element = (
    <dialog className={styles.container}>
      <div className={styles.content}>
        {children}
        <CloseIcon className={styles.closeIcon} onClick={onClose} />
      </div>
    </dialog>
  );

  return createPortal(element, popupPlaceholder);
}

export default Popup;
