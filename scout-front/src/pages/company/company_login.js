import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CompanyLogin() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    console.log('企業ログインID:', id);
    console.log('企業ログインPassword:', password);
 
    try {
      const res = await fetch('http://localhost:3001/api/v1/companies/login', {
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
        console.log('✅ 企業ログイン成功！企業ID:', data.company_id);
        localStorage.setItem("companyId", data.company_id)
        router.push('/company/listed_students'); // ログイン成功後に遷移するページ
      } else {
        console.log('❌ ログイン失敗！IDまたはパスワードが違います');
      }
    } catch (error) {
      console.log('⚠️ 通信エラー:', error);
    }
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
      <div>
        
          <button onClick={() => router.push('/company/company_register')}>新規無料登録</button>
        
      </div>
    </div>
  );
}
