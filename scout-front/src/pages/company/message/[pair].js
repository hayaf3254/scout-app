import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/app.module.css"; 
import Link from "next/link";

export default function MessagePage() {
  const router = useRouter();
  const { pair } = router.query;

  const [company, setCompany] = useState(null);
  const [student, setStudent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  const [companyId, studentId] = pair?.split("_") || [];

  // データ取得
  useEffect(() => {
    if (!companyId || !studentId) return;

    // 企業データ取得
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/${companyId}`)
      .then(res => res.json())
      .then(data => setCompany(data));

    // 学生データ取得
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/students/${studentId}`)
      .then(res => res.json())
      .then(data => setStudent(data));

    // メッセージ一覧取得
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/messages`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(m =>
          m.sender_id === parseInt(companyId) && m.receiver_id === parseInt(studentId)
        );
        setMessages(filtered);
      });
  }, [companyId, studentId]);

  // メッセージ送信
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: {
          sender_id: parseInt(companyId),
          receiver_id: parseInt(studentId),
          content: content,
        },
      }),
    });
    setContent("");
    router.reload(); // リロードで反映（初心者向けで簡単）
  };

  return (
    <div className={styles.container}>
      <p >企業：{company?.name}</p>

      <p>学生：{student?.name}</p>

      <h1 className={styles.title}>メッセージ一覧</h1>
      <ul className={styles.list}>
        {messages.map((msg) => (
          <li key={msg.id}  className={styles.listItem}>{msg.content}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} >
        <textarea
          rows="4"
          cols="50"
          placeholder="メッセージを書く"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <button type="submit" className={styles.button}>送信</button>
      </form>
      <br />
      <div>
      <Link href="/company/listed_students" className={styles.link}>← インターン生一覧に戻る</Link>
      </div>
    </div>
  );
}
