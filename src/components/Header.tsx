import styles from "./Header.module.scss";
import logo from "../assets/logo_line_white.svg";

const Header = () => {
  return (
    <header className={styles.header} aria-label="Site header">
      <div className={styles.logo} aria-label="Site logo">
        <img src={logo} alt="Logo" width={50} height={40} />
        <h3>대광 PC</h3>
      </div>
      <nav aria-label="Main navigation">
        <a className={styles.a} href="/">
          About
        </a>
        <a className={styles.a} href="works">
          Services
        </a>
        <a className={styles.a} href="contact">
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Header;
