import { useState, Suspense, lazy } from "react";
import { useAdminGuard } from "../../hooks/useAdminGuard";
import TransactionChart from "./components/TransactionChart";
import styles from "./AdminDashboard.module.scss";
import DashboardStats from "./components/DashboardStats";
import ClientList from "./components/ClientList";

const ProjectList = lazy(() => import("./components/ProjectList"));

const AdminDashboard = () => {
  useAdminGuard();
  const [view, setView] = useState<"clients" | "projects">("clients");

  return (
    <div className={styles.dashboard}>
      <DashboardStats />
      <TransactionChart />

      <div className={styles.buttonGroup}>
        <button
          className={`${styles.viewButton} ${
            view === "clients" ? styles.active : ""
          }`}
          onClick={() => setView("clients")}
        >
          📋 고객사 목록
        </button>
        <button
          className={`${styles.viewButton} ${
            view === "projects" ? styles.active : ""
          }`}
          onClick={() => setView("projects")}
        >
          🏗️ 작업 현황
        </button>
      </div>

      {view === "clients" && (
        <div className={styles.listSection}>
          <h2>고객사 목록</h2>
          <ClientList />
        </div>
      )}

      {view === "projects" && (
        <div className={styles.listSection}>
          <h2>작업 현황</h2>
          <Suspense fallback={<div>불러오는 중...</div>}>
            <ProjectList />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
