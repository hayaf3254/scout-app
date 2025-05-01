import { useState } from "react";
import { useRouter } from "next/router";
import styles from '@/styles/app.module.css';

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    user_id: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/v1/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          user_id: form.user_id,
          password: form.password,
        }),
      });

      if (res.ok) {
        router.push("student_register_success"); // 登録完了画面
      } else {
        const data = await res.json();
        if (data.user_id && Array.isArray(data.user_id)) {
            setError("このIDは既に使われています。別のIDを入力してください。");
          } else {
            setError("登録に失敗しました");
          }
        
      }
    } catch (err) {
      setError("サーバーエラーが発生しました");
    }
  };

  return (
        <div className={styles.container}>
          <h1 className={styles.title}>学生登録ページ</h1>
          <p>学生用のアカウントを作成します。</p>
          
     
          <form onSubmit={handleSubmit} className={styles.formWrapper}>
        
          <input name="name" placeholder="名前" onChange={handleChange} className={styles.s_input}/>

     
          <input name="user_id" placeholder="ID" onChange={handleChange} className={styles.s_input} />
          

          <input type="password" name="password" placeholder="パスワード" onChange={handleChange} className={styles.s_input}/>

            <input type="password" name="confirmPassword" placeholder="確認パスワード" onChange={handleChange} className={styles.s_input}/>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" className={styles.button}>登録</button>
</form>


        </div>
      );
      
}
