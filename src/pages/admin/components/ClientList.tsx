// components/ClientList.tsx
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabaseClient";
import styles from "./ClientList.module.scss";

type Client = {
  id: number;
  biz_no: string;
  branch_no: string | null;
  company: string;
  ceo: string;
  address: string;
  email1?: string;
  email2?: string | null;
};

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase.from("clients").select("*");
      if (error) {
        console.error("클라이언트 불러오기 오류:", error.message);
        return;
      }
      setClients(data || []);
    };

    fetchClients();
  }, []);
  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            <th>회사명</th>
            <th>대표자</th>
            <th>사업자번호</th>
            <th>주소</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.company}</td>
              <td>{client.ceo}</td>
              <td>{client.biz_no}</td>
              <td>{client.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
