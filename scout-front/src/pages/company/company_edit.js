'use client';
import Link from "next/link";
import styles from '@/styles/app.module.css';

import { useEffect, useState } from 'react';

export default function EditCompanyPage() {
  const [company, setCompany] = useState({ name: '', publish: '' });
  const [companyId, setCompanyId] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('companyId');
    if (!id) return;
    setCompanyId(id);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCompany({ name: data.name, publish: data.publish });
      });
  }, []);

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/companies/${companyId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company }),
    });

    alert('掲載内容を更新しました');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>会社情報の編集</h1>
      <label className={styles.label}>会社名</label>
      <input
        type="text"
        name="name"
        value={company.name}
        onChange={handleChange}
        className={styles.textarea}
      />
        <br />
      <label className={styles.label}>掲載内容</label>
      <textarea
        name="publish"
        value={company.publish}
        onChange={handleChange}
        rows={5}
        cols={40}
        className={styles.textarea}
        
      />
      <br />
      <button onClick={handleSubmit} className={styles.button}>保存する</button>
      <br />
      <Link href="/company/listed_students" >
          <p className={styles.link}>←インターン生一覧に戻る</p>
      </Link>
    </div>
  );
}
