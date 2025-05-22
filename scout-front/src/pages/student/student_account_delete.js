'use client';
import { useEffect, useState } from 'react';
import styles from '@/styles/app.module.css';

export default function DeleteAccountPage() {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('studentId');
    if (!id) return; //id（ログイン情報）が存在しない場合、データ取得処理をスキップする
    setStudentId(id); //localStorageの値はReact内で使いやすいようにstateにコピーする,あとで削除リクエストに使う。

    // 名前取得（GET /students/:id を叩く例）
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/students/${id}`)
      .then(res => res.json()) //thenは「処理が終わったら、次にこれやってね」っていう命令
      .then(data => {
        setStudentName(data.name);
      })
      .catch(err => {
        console.error("データ取得エラー:", err);
        alert("学生情報の取得に失敗しました");
      });
  }, []);

  const handleDelete = async () => { //await使ってるのでasyncが必要
    const ok = window.confirm('復元できません。本当に削除しますか？'); //確認のダイアログを出す（OK → true / キャンセル → false）
    if (!ok) return; //キャンセルされたら何もしない

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/students/${studentId}`, {
      method: 'DELETE', //DELETE メソッドでサーバーにデータを削除するリクエストを送る,constでsetされたstudentIDを削除
    });

    localStorage.removeItem('studentId'); //ローカルに保存したIDつまり、ログイン情報を削除
    alert('アカウントを削除しました');
    window.location.href = '/'; // ホームに強制的にリダイレクト,再ログインを確実に消すなどで使われる
  };

  return (
    <div className={styles.container}>
      <p className={styles.message}>学生：{studentName} </p>
      <button onClick={handleDelete} className={styles.button}>アカウントを削除</button>
    </div>
  );
}