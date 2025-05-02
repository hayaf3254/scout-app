import Link from "next/link";
import { useEffect, useState } from "react";
import styles from '@/styles/app.module.css'; 

export default function CompaniesList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
      <Link href={`/student/company_message_list`} className={styles.link}>
              企業からのメッセージ一覧
          </Link>
      </div>
      <h1 className={styles.title}>企業一覧</h1>
      <ul className={styles.list} >
        {companies.map((company) => (
          <li key={company.id} className={styles.listItem}>
            <Link href={`/student/company_publish/${company.id}`} >
              {company.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.rowLayout}>
      <Link href={`/student/student_account_delete`} className={styles.link}>
      <div>アカウント削除</div>
      </Link>

      <Link href={`/student/student_appeal`} className={styles.link}>
      <div>アピールポイントを書く</div>
      </Link>
      </div> 

    </div>
  );
}
