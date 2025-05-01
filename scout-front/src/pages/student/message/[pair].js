import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    fetch(`http://localhost:3001/api/v1/companies/${companyId}`)
      .then(res => res.json())
      .then(data => setCompany(data));

    // 学生データ取得
    fetch(`http://localhost:3001/api/v1/students/${studentId}`)
      .then(res => res.json())
      .then(data => setStudent(data));

    // メッセージ一覧取得
    fetch("http://localhost:3001/api/v1/messages")
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
    await fetch("http://localhost:3001/api/v1/messages", {
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
    <div>
      <h1>企業：{company?.name}</h1>

      <h2>学生：{student?.name}</h2>

      <h3>企業のメッセージ一覧</h3>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>{msg.content}</li>
        ))}
      </ul>


    </div>
  );
}
