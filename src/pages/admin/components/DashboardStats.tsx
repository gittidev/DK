// components/DashboardStats.tsx
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import styles from "./DashboardStats.module.scss";

type DashboardStats = {
  total_amount: number;
  total_orders: number;
  total_clients: number;
};

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from("dashboard_stats_view")
        .select("*")
        .single();

      if (error) {
        console.error("통계 조회 실패:", error.message);
        return;
      }

      setStats(data);
    };

    fetchStats();
  }, []);

  if (!stats) return <p>불러오는 중...</p>;

  return (
    <div className={styles.statsPage}>
      <div className={styles.statBox}>
        <h3>총 매출액</h3>
        <p>₩{stats.total_amount.toLocaleString()}</p>
      </div>
      <div className={styles.statBox}>
        <h3>총 주문 수</h3>
        <p>{stats.total_orders.toLocaleString()}건</p>
      </div>
      <div className={styles.statBox}>
        <h3>고객 수</h3>
        <p>{stats.total_clients.toLocaleString()}명</p>
      </div>
    </div>
  );
}
