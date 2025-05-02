import Link from 'next/link';
import styles from '../styles/app.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>インターンマッチングサービス</h1>
      <div className={styles.buttonWrapper}>

        <Link href="/company/company_login">
          <button className={styles.button}>企業用ログイン</button>
        </Link>
      </div>

      <div className={styles.buttonWrapper}>
        <Link href="/student/student_login">
          <button className={styles.button}>学生用ログイン</button>
        </Link>
      </div>
      <br />
      <img src="/scout_img1_byChatGPT.png" alt="サービスロゴ" className={styles.homeImage} />
    </div>
  );
}
