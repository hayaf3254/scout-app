import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/app.module.css"; 

export default function StudentAppeal() {
  const router = useRouter();
  const { id } = router.query;
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/students/${id}`) 
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((err) => console.error("API error:", err));
  }, [id]);

  if (!student) return <div>読み込み中...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{student.name}</h1>
      <p className={styles.message}>アピールポイント</p>
      <p className={styles.message}>{student.appeal_point}</p>
      <br />
      <Link href="/company/listed_students">← インターン生一覧に戻る</Link>
    </div>
  );
}