import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";
import { useAdminGuard } from "../../hooks/useAdminGuard";
import styles from "./AdminLayout.module.scss";

export default function AdminLayout() {
  useAdminGuard();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className={styles.adminLayout}>
      <div className={styles.header}>
        <h2>관리자 페이지</h2>
        <button className={styles.logoutButton} onClick={handleLogout}>
          로그아웃
        </button>
      </div>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
