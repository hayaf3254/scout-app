import styles from '@/styles/app.module.css';

export default function CompanyRegisterSuccess() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>登録完了</h1>
        <p className={styles.message}>企業アカウントが正常に登録されました！</p>
        <a href="/company/company_login" className={styles.link}>ログインページへ</a>
      </div>
    );
  }
  