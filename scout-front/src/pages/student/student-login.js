import { useState } from 'react';
import Link from 'next/link';

export default function StudentLogin() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

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

      if (res.ok && data.success) {
        console.log('✅ ログイン成功！学生ID:', data.student_id);
      } else {
        console.log('❌ ログイン失敗！IDまたはパスワードが違います');
      }
    } catch (error) {
      console.log('⚠️ 通信エラー:', error);
    }
  };

  return (
    <div>
      <h1>学生ログインページ</h1>
      <div>
        <label>ID:</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div>
        <label>パスワード:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleLogin}>ログイン</button>
      </div>

      <div>
        <Link href="/student/student-register">
          <button>新規無料登録</button>
        </Link>
      </div>
    </div>
  );
}
