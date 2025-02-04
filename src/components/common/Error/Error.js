import styles from './Error.module.scss';

function Error({ message }) {
  return (
    <h1 className={styles.container}>
      {message}
    </h1>
  );
}

export default Error;