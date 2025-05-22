import styles from '@/styles/app.module.css';
import Link from 'next/link';

export default function StudentRegisterSuccess() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>登録完了</h1>
        <p className={styles.message}>学生アカウントが正常に登録されました！</p>
        <Link href="/student/student_login/">
          ログイン画面へ
        </Link>
      </div>
    );
  }
  