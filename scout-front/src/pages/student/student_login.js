import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/app.module.css';

export default function StudentLogin() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // useRouterを呼び出す

  const handleLogin = async () => {
    console.log('学生ログインID:', id);
    console.log('学生ログインPassword:', password);

    try {
      const res = await fetch('http://localhost:3001/api/v1/students/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: id,
          password: password
        }),
      });


      const data = await res.json();
      console.log('✅ レスポンスの中身:', data);

      if (res.ok && data.success) {
        console.log('✅ ログイン成功！学生ID:', data.student_id);
        localStorage.setItem("studentId", data.student_id);
        router.push('/student/listed_companies'); // ログイン成功後に遷移するページ
      } else {
        alert('❌ ログイン失敗！IDまたはパスワードが違います');
      }
    } catch (error) {
      console.log('⚠️ 通信エラー:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>学生ログインページ</h1>
      <div className={styles.formWrapper}>
        <label>ID:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className={styles.input}
        />
      </div>
      <div>
        <label>パスワード:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
      </div>
      <div>
        <button onClick={handleLogin} className={styles.button}>ログイン</button>
      </div>

      <div>
        
          <button onClick={() => router.push('/student/student_register')} className={styles.button}>新規無料登録</button>
        
      </div>
    </div>
  );
}
