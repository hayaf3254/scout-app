import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>インターンマッチングサービス</h1>
      <div>

        <Link href="/company/company-login">
          <button>企業用ログイン</button>
        </Link>
      </div>

      <div>
        <Link href="/student/student-login">
          <button>学生用ログイン</button>
        </Link>
      </div>
      
    </div>
  );
}
