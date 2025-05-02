import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@/styles/app.module.css";

export default function StudnetsList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>インターン生一覧</h1>
      <ul >
        {students.map((student) => (
          <li key={student.id} className={styles.message}>
            
              {student.name}
              &nbsp;
              <Link href={`/company/message/${localStorage.getItem("companyId")}_${student.id}`}>
              <button className={styles.button}>メッセージを送る</button>
            </Link>
           
          </li>
        ))}
      </ul>

      <Link href="/company/company_account_delete" className={styles.link}>
              <p >アカウント削除</p>
            </Link>

    </div>
  );
}
