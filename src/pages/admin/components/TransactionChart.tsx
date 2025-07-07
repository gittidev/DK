import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import styles from "./TransactionChart.module.scss";

type MonthlyTrend = {
  month: string;
  total: number;
};

export default function TransactionChart() {
  const [data, setData] = useState<MonthlyTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrend = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("monthly_trend_view")
        .select("*");

      if (error) {
        setError(error.message);
      } else {
        setData(data.reverse());
      }
      setLoading(false);
    };

    fetchTrend();
  }, []);

  if (loading) return <p className={styles.statusText}>📊 로딩 중...</p>;
  if (error) return <p className={styles.statusText}>❌ 에러: {error}</p>;

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.chartContainer}>
        <h3 className={styles.title}>최근 6개월 매출액</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4dabf7" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#4dabf7" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#cbd5e1" />
            <YAxis
              stroke="#cbd5e1"
              tickFormatter={(value: number) =>
                `${(value / 1_000_000).toFixed(0)}M`
              }
            />

            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
              labelStyle={{ color: "#f1f5f9" }}
              formatter={(v: number) => `₩${v.toLocaleString()}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="total"
              stroke="url(#colorTotal)"
              strokeWidth={3}
              dot={{ r: 4, stroke: "#4dabf7", strokeWidth: 2, fill: "#fff" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
