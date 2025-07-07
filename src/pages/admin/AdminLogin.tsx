import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminLogin.module.scss";
import { supabase } from "../../utils/supabaseClient";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.");
      return;
    }

    navigate("/admin");
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h2 className={styles.heading}>관리자 로그인</h2>
        <form onSubmit={handleLogin} className={styles.loginForm}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.inputField}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
          />
          <button type="submit" className={styles.loginButton}>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
