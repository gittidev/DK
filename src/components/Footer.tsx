import styles from "./Footer.module.scss";
import logo from "../assets/logo_line_white.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contactContainer}>
        <div className={styles.logo} aria-label="Site logo">
          <img src={logo} alt="Logo" width={50} height={40} />
          <h3>대광 PC</h3>
        </div>

        <div className={styles.contactWrapper}>
          <h2 className={styles.contactTitle}>CONTACT US</h2>
          <div className={styles.contactContent}>
            <div>
              <p>
                <strong>이메일:</strong> pyw4733@hanmail.net
              </p>
              <p>
                <strong>사업자 등록번호:</strong> 411-10-82273
              </p>
              <p>
                <strong>팩스:</strong> 062-961-6408
              </p>
              <p>
                <strong>주소:</strong> 광주광역시 광산구 사암로 340번길 30
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.license}>© 1994 대광PC. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
