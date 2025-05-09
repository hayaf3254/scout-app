import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/app.module.css"; 

export default function CompanyDetail() {
  const router = useRouter();
  const { id } = router.query; //URLから企業IDを取得
  const [company, setCompany] = useState(null); //企業情報を保存するための状態変数→最初は null（まだ取得前）、取得後にオブジェクトを入れる

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3001/api/v1/companies/${id}`) 
      .then((res) => res.json())
      .then((data) => setCompany(data))
      .catch((err) => console.error("API error:", err));
  }, [id]); // idが変わった時だけ実行（例：別の企業をクリックしたとき）

  if (!company) return <div>読み込み中...</div>; //データがまだ取得されていない状態をカバー（ローディング中）

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{company.name}</h1>
      <p className={styles.message}>掲載内容</p>
      <p className={styles.message}>{company.publish || "未登録"}</p> 
      {/*企業の掲載内容を表示,なかったら未登録と表示される*/}
      <br />
      <Link href="/student/listed_companies">← 企業一覧に戻る</Link>
    </div>
  );
}