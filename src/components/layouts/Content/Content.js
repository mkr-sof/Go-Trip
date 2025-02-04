import styles from "./Content.module.scss";

function Content({ children, className }) {
    return (
        <div className={className}>{children}</div>
    );
}

export default Content;