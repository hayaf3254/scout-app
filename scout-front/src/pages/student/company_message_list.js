import { useEffect, useState } from "react";
import Link from "next/link";
import styles from '@/styles/app.module.css';

export default function MessageSenders() {
  const [companyList, setCompanyList] = useState([]);
  const [studentId, setStudentId] = useState(null); // ← stateに入れる！

  useEffect(() => {
    const storedId = localStorage.getItem("studentId");
    if (!storedId) return;

    const parsedId = parseInt(storedId);
    setStudentId(parsedId);

    // メッセージ取得
    fetch("http://localhost:3001/api/v1/messages")
      .then(res => res.json())
      .then(async (messages) => {
        const myMessages = messages.filter(
          (msg) => msg.receiver_id === parsedId
        );

        const uniqueCompanyIds = [...new Set(myMessages.map(msg => msg.sender_id))];

        const companyFetches = await Promise.all(
          uniqueCompanyIds.map((id) =>
            fetch(`http://localhost:3001/api/v1/companies/${id}`).then(res => res.json())
          )
        );

        setCompanyList(companyFetches);
      })
      .catch(err => console.error("エラー:", err));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>メッセージを送ってきた企業一覧</h1>
      <ul className={styles.list}>
        {companyList.map((company) => (
          <li key={company.id} className={styles.listItem}>
            <Link href={`/student/message/${company.id}_${studentId}`} className={styles.link}>
              {company.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
