"use client";
import Link from "next/link";
import styles from '@/styles/app.module.css';

import { useEffect, useState } from 'react';

export default function EditStudentPage() {
  const [student, setStudent] = useState({ name: '', appeal_point: '' });
  const [studentId, setStudentId] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('studentId'); //// ログイン時に localStorage に保存された studentId を取得して id に代入
    if (!id) return; //id（ログイン情報）が存在しない場合、データ取得処理をスキップする
    setStudentId(id); //localStorageの値はReact内で使いやすいようにstateにコピーする

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/students/${id}`)
      .then((res) => res.json()) //json形式に変換
      .then((data) => {
        setStudent({ name: data.name, //setStudentで取得した値を更新
            appeal_point: data.appeal_point });
      });
  }, []); //[]は最初の1回だけ実行するという意味

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value }); //<textarea name="appeal_point" ... />でappeal_pointがnameになっているのが原因
  };

  const handleSubmit = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/students/${studentId}`, {
      method: 'PATCH', //PATCH メソッドでサーバーに部分的にデータを送る
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student }),
    });

    alert('アピールポイントを更新しました');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>アピールポイントの編集</h1>

      <div className={styles.rowLayout}>
      <label className={styles.label}>名前:</label>
      <p>{student.name}</p>
      </div>
        <br />
      <label className={styles.label}>アピール内容</label>
      <textarea
        name="appeal_point"
        value={student.appeal_point}
        onChange={handleChange}
        rows={5}
        cols={40}
        className={styles.textarea}
        
      />
      <br />
      <button onClick={handleSubmit} className={styles.button}>保存する</button>
      <br />
      <Link href="/student/listed_companies" >
          <p className={styles.link}>←企業一覧に戻る</p>
      </Link>
    </div>
  );
}
