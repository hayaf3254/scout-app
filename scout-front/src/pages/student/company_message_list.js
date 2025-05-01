import { useEffect, useState } from "react";
import Link from "next/link";

export default function MessageSenders() {
  const [companyList, setCompanyList] = useState([]);
  const studentId = parseInt(localStorage.getItem("studentId")); // ← 学生ログイン時に保存してること前提

  useEffect(() => {
    if (!studentId) return;

    // ① メッセージ取得
    fetch("http://localhost:3001/api/v1/messages")
      .then(res => res.json())
      .then(async (messages) => {
        // ② 自分宛てのメッセージを絞り込み（receiver_id が自分）
        const myMessages = messages.filter(
          (msg) => msg.receiver_id === studentId
        );

        // ③ 送信企業IDを取り出し（重複削除）
        const uniqueCompanyIds = [...new Set(myMessages.map(msg => msg.sender_id))];

        // ④ 各企業の情報を取得
        const companyFetches = await Promise.all(
          uniqueCompanyIds.map((id) =>
            fetch(`http://localhost:3001/api/v1/companies/${id}`).then(res => res.json())
          )
        );

        setCompanyList(companyFetches);
      })
      .catch(err => console.error("エラー:", err));
  }, [studentId]);

  return (
    <div>
      <h1>メッセージを送ってきた企業一覧</h1>
      <ul>
        {companyList.map((company) => (
          <li key={company.id}>
            {/* 企業の詳細またはメッセージページへ遷移 */}
            <Link href={`/student/message/${company.id}_${studentId}`}>
              {company.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}