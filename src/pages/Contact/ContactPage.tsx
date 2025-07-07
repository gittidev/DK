import styles from "./ContactPage.module.scss";
import ContactForm from "../../components/ContactForm";
export default function ContactPage() {
  return (
    <div className={styles.container}>
      <ContactForm />
    </div>
  );
}
