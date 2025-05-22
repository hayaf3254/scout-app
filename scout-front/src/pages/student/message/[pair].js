import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/app.module.css"; 

export default function MessagePage() {
  const router = useRouter();
  const { pair } = router.query; //URL のクエリパラメータpairを取得

  const [company, setCompany] = useState(null); //	表示用の企業情報
  const [student, setStudent] = useState(null); //  表示用の学生情報
  const [messages, setMessages] = useState([]); //  メッセージ一覧
  const [content, setContent] = useState(""); //  今入力中のメッセージ内容

  const [companyId, studentId] = pair?.split("_") || []; //pair を _ で分解して、companyId, studentIdに分ける→ 片方でも undefined なら空配列になる（エラー防止）

  // データ取得
  useEffect(() => {
    if (!companyId || !studentId) return; //companyIdとstudentIdがどっちも必要で、なかった時は何もしない

    // 企業データ取得
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/${companyId}`)
      .then(res => res.json())
      .then(data => setCompany(data));

    // 学生データ取得
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/students/${studentId}`)
      .then(res => res.json())
      .then(data => setStudent(data));

    // メッセージ一覧取得
    fetch("${process.env.NEXT_PUBLIC_API_URL}/api/v1/messages")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(m =>
            m.sender_id === parseInt(companyId) && m.receiver_id === parseInt(studentId) //＝が３つで型もチェックしてる
          );
          
        setMessages(filtered);
      });
  }, [companyId, studentId]); //companyIdとstudentIdが変わったときだけuseEffectを再実行

  // メッセージ送信
  const handleSubmit = async (e) => {
    e.preventDefault(); //HTMLフォームが「勝手にリロードされる」のを止める命令
    await fetch("http://localhost:3001/api/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ // 送信するデータをJSON形式に変換
        message: {
          sender_id: parseInt(companyId),
          receiver_id: parseInt(studentId),
          content: content,
        },
      }),
    });
    setContent(""); //メッセージを送信した後、入力欄をリセットして空白にするため
    router.reload(); // // 新しく送ったメッセージが一覧にすぐ反映されるように、ページを強制再読み込みしている（初心者向けで簡単）
  };

  return (
    <div className={styles.container}>


      <h1 className={styles.title}>企業のメッセージ一覧</h1>
      <p>企業：{company?.name}</p>
      {/* ?はオプショナルチェーン,company が null や undefined じゃなかったら → company.name を取り出す.null や undefined だったら → エラー出さずに undefined を返す */}
      <p >学生：{student?.name}</p>
      <ul >
        {messages.map((msg) => (
          <li key={msg.id} className={styles.message}>{msg.content}</li>
        ))}
      </ul>


    </div>
  );
}
