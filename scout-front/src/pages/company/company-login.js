import { useState } from 'react';
import Link from 'next/link';


export default function CompanyLogin() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('企業ログインID:', id);
    console.log('企業ログインPassword:', password);
    // ここにログイン処理を書く（後で）
  };

  return (
    <div>
      <h1>企業ログインページ</h1>
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
    </div>
  );
}
