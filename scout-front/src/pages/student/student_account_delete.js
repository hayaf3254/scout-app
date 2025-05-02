'use client';
import { useEffect, useState } from 'react';
import styles from '@/styles/app.module.css';

export default function DeleteAccountPage() {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('studentId');
    if (!id) return;
    setStudentId(id);

    // 名前取得（GET /students/:id を叩く例）
    fetch(`http://localhost:3001/api/v1/students/${id}`)
      .then(res => res.json())
      .then(data => {
        setStudentName(data.name);
      });
  }, []);

  const handleDelete = async () => {
    const ok = window.confirm('復元できません。本当に削除しますか？');
    if (!ok) return;

    await fetch(`http://localhost:3001/api/v1/students/${studentId}`, {
      method: 'DELETE',
    });

    localStorage.removeItem('studentId');
    alert('アカウントを削除しました');
    window.location.href = '/'; // ホームにリダイレクト
  };

  return (
    <div className={styles.container}>
      <p className={styles.message}>学生：{studentName} </p>
      <button onClick={handleDelete} className={styles.button}>アカウントを削除</button>
    </div>
  );
}