'use client';
import { useEffect, useState } from 'react';

export default function DeleteAccountPage() {
  const [companyName, setCompanyName] = useState('');
  const [companyId, setCompanyId] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('companyId');
    if (!id) return;
    setCompanyId(id);

    
    fetch(`http://localhost:3001/api/v1/companies/${id}`)
      .then(res => res.json())
      .then(data => {
        setCompanyName(data.name);
      });
    }, []);

    const handleDelete = async () => {
        const ok = window.confirm('復元できません。本当に削除しますか？');
        if (!ok) return;

        await fetch(`http://localhost:3001/api/v1/companies/${companyId}`, {
        method: 'DELETE',
        
    });
    localStorage.removeItem('studentId');
    alert('アカウントを削除しました');
    window.location.href = '/'; // ホームにリダイレクト



};
return(
    <div>
      <p>会社名：{companyName}</p>
      <button onClick={handleDelete}>アカウントを削除</button>
    </div>
  );

}
