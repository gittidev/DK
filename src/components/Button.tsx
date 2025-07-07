import classNames from "classnames";
import styles from "./Button.module.scss";

type ButtonProps = {
  size?: "small" | "medium" | "large";
  variant?:
    | "primary"
    | "secondary"
    | "alert"
    | "success"
    | "ghost"
    | "default-white"
    | "carousel-button";
  disabled?: boolean;
  loading?: boolean;
  direction?: "left" | "right";
  onClick?: () => void;
  children?: React.ReactNode;
};

const Button = ({
  size = "medium",
  variant = "primary",
  disabled = false,
  loading = false,
  direction,
  onClick,
  children,
}: ButtonProps) => {
  const buttonClass = classNames(styles.button, styles[variant], styles[size], {
    [styles.disabled]: disabled || loading,
    [styles["carousel-button"]]: direction,
    [styles.left]: direction === "left",
    [styles.right]: direction === "right",
  });

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
    >
      {loading ? <span className={styles.loader}></span> : children}
    </button>
  );
};

export default Button;
