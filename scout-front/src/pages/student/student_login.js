import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/app.module.css';

export default function StudentLogin() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // router.push("URL") でページ遷移できるようにするための変数(useRouter)

  const handleLogin = async () => { // ログイン処理
    console.log('学生ログインID:', id);
    console.log('学生ログインPassword:', password);

    try {
      const res = await fetch('http://localhost:3001/api/v1/students/login', { // 学生データをAPIに送信（ログイン）
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', //// Content-Type: サーバーに「これはJSON形式ですよ」と伝えるための設定
        },
        body: JSON.stringify({ // APIに送信するデータ
          // ここで受け取ったデータをJSON形式に変換している
          user_id: id,
          password: password
        }),
      });


      const data = await res.json(); // サーバーから返ってきたデータを JSON として読み取る
      console.log('✅ レスポンスの中身:', data);

      if (res.ok && data.success) { // レスポンスが正常かつ中身の判定も成功してたら
        console.log('✅ ログイン成功！学生ID:', data.student_id);
        localStorage.setItem("studentId", data.student_id); // ログイン成功した学生のIDをローカルストレージに保存
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
          onChange={(e) => setPassword(e.target.value)} //入力された文字をリアルタイムでstate（password）に保存する
          className={styles.input}
        />
      </div>
      <div>
        <button onClick={handleLogin} className={styles.button}>ログイン</button> {/* onClickはボタンが押されたときの処理 */}
      </div>

      <div>
        
          <button onClick={() => router.push('/student/student_register')} className={styles.button}>新規無料登録</button> 
          {/* () => を使って無名関数で包むことで「クリックされたときだけ」実行されるようにしている。ないと即に実行になるので必要,onChangeも同様 */}
        
      </div>
    </div>
  );
}
