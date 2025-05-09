import { useEffect, useState } from "react"; //useEffect: ページが読み込まれたタイミングでデータを取りに行くため
import Link from "next/link";
import styles from '@/styles/app.module.css';

export default function MessageSenders() {
  const [companyList, setCompanyList] = useState([]); //複数の企業オブジェクト（会社情報）を格納する配列（初期値は空の配列）
  const [studentId, setStudentId] = useState(null); // ← stateに入れる！

  useEffect(() => { //Reactのコンポーネントが表示された時（マウント時）に1回だけ実行する関数,つまりページが表示された時にうごく関数
    const storedId = localStorage.getItem("studentId");
    if (!storedId) return;

    const parsedId = parseInt(storedId); //整数（number型）に変換する関数！
    setStudentId(parsedId);

    // メッセージ取得
    fetch("http://localhost:3001/api/v1/messages")
      .then(res => res.json())
      .then(async (messages) => { //messages はメッセージテーブルの全データが配列で入っている
        const myMessages = messages.filter( //filterは条件に合うやつものだけ残す関数
          (msg) => msg.receiver_id === parsedId //受信者IDが自分のIDと一致するものだけを抽出
        );

        const uniqueCompanyIds = [...new Set(myMessages.map(msg => msg.sender_id))]; //Set を使って重複を排除→setで抽出されたdataを...new（スプレッド構文）で新しい配列を作っている

        const companyFetches = await Promise.all( //「複数のfetchを同時に一気に実行して、全部終わるまで待つ関数
          uniqueCompanyIds.map((id) => //mapでIDごとにfetchを実行
            fetch(`http://localhost:3001/api/v1/companies/${id}`).then(res => res.json()) //fetch(...) → 該当するcompaniesのID(複数)にアクセスして、企業情報を取得
          )
        );

        setCompanyList(companyFetches); //取得した企業一覧を state に保存
      })
      .catch(err => console.error("エラー:", err));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>メッセージを送ってきた企業一覧</h1>
      <ul className={styles.list}>
        {companyList.map((company) => ( //companyListにある企業オブジェクト1件ずつをcompanyという名前で受け取って処理（変数名は自由）
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
