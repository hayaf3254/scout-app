'use client';
import Link from "next/link";
import styles from '@/styles/app.module.css';

import { useEffect, useState } from 'react';

export default function EditStudentPage() {
  const [student, setStudent] = useState({ name: '', appeal_point: '' });
  const [studentId, setStudentId] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('studentId');
    if (!id) return;
    setStudentId(id);

    fetch(`http://localhost:3001/api/v1/students/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStudent({ name: data.name, 
            appeal_point: data.appeal_point });
      });
  }, []);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch(`http://localhost:3001/api/v1/students/${studentId}`, {
      method: 'PATCH',
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
      <p1>{student.name}</p1>
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
