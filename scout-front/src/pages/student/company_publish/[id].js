import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/app.module.css"; 

export default function CompanyDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [company, setCompany] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3001/api/v1/companies/${id}`) 
      .then((res) => res.json())
      .then((data) => setCompany(data))
      .catch((err) => console.error("API error:", err));
  }, [id]);

  if (!company) return <div>読み込み中...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{company.name}</h1>
      <p className={styles.message}>掲載内容</p>
      <p className={styles.message}>{company.publish}</p>
      <br />
      <Link href="/student/listed_companies">← 企業一覧に戻る</Link>
    </div>
  );
}