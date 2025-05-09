import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@/styles/app.module.css";

export default function StudentsList() { //コンポーネント定義
  const [students, setStudents] = useState([]); //左が学生のリストが入る変数、右がそれを更新するときに使う関数

  useEffect(() => { //useEffectはページが表示されたときに何かしたい時に使う
    fetch("http://localhost:3001/api/v1/students") //APIから学生のリストを取得する
      .then((res) => res.json()) //返事（レスポンス）をJSON形式に変換する
      .then((data) => setStudents(data)) //取得したデータをsetで更新し,studentsに書く脳
      .catch((err) => console.error("API error:", err)); //エラーがあった場合はキャッチしてコンソールにエラーを表示する
  }, []); //この処理は、最初の1回だけ実行されるという意味

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>インターン生一覧</h1>
      <ul >
        {students.map((student) => ( //mapでstudentsの中身をひとつづつ取り出している
          <li key={student.id} className={styles.message}> {/* リストを扱うときはキーが必要、またここのstudentsはconstで定義したもの */}
            <Link href={`/company/student_appeal/${student.id}`} className={styles.link}>
              {student.name} {/* studentsテーブルのnameカラムを表示 */}
              </Link>
              &nbsp; {/* &nbsp;はスペースを入れるためのもの */}
              <Link href={`/company/message/${localStorage.getItem("companyId")}_${student.id}`}>
              <button className={styles.button}>メッセージを送る</button>
            </Link>
           
          </li>
        ))}
      </ul>
      
      <footer className={styles.rowLayout}>  {/* フッターにしたかったのでこのタグを使用*/}
        <Link href="/company/company_account_delete" >
          <p className={styles.link}>アカウント削除</p>
        </Link>

        <Link href="/company/company_edit" >
          <p className={styles.link}>掲載内容編集</p>
        </Link>
      </footer>

    </div>
  );
}
