import { useState } from "react"; //状態管理のuseStateをインポート
import { useRouter } from "next/router";
import styles from '@/styles/app.module.css';

export default function Register() {
  const [form, setForm] = useState({
    name: "",   //これらの名前は受け取るテーブルのカラム名と一緒にする必要がある
    user_id: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(""); //htmlのエラー表示用の変数,エラージの制御用（handleSubmitで使う）
  const router = useRouter(); //router.push("URL") でページ遷移できるようにするための変数(useRouter)

  const handleChange = (e) => { //e＝event eventが起きたときに呼ばれる関数
    setForm({ ...form, [e.target.name]: e.target.value }); //いまの入力データ（form）を丸ごとコピーして、いま変わった項目（nameとかuser_idとか）だけ書きかえる
    /*...forで前のformを丸ごとコピー、そして[e.target.name]: e.target.value }は「name:htmlの入力」となっておりここだけ変わる */
  };

  const handleSubmit = async (e) => { //
    e.preventDefault(); //リロード阻止、フォーム内容を保持するために必要
    if (form.password !== form.confirmPassword) { //パスワードと確認パスワードが一致しない場合
      setError("パスワードが一致しません"); //表示ではない、error変数に入れてhtmlに表示するため
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/students`, { // 学生データをAPIに送信（新規登録）
        method: "POST", //POSTでデータを送信
        headers: { "Content-Type": "application/json" }, //サーバーに送るデータの形式を教えるため
        //"Content-Type"（コンテントタイプ）＝データの種類,"application/json"＝「これはJSON形式ですよ」って意味
        body: JSON.stringify({ //「文字列のJSON形式に変換する」って意味
          //ここで受け取ったデータをJSON形式に変換している
          name: form.name,
          user_id: form.user_id,
          password: form.password,
        }),
      });

      if (res.ok) {
        router.push("student_register_success"); // 登録完了画面 に遷移
      } else {
        const data = await res.json(); //、APIから返ってきたレスポンス（返事）を、JSONという形式で読み取る
        if (data.user_id && Array.isArray(data.user_id)) { //Array.isArray()は配列かどうかを調べる関数
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
            {error && <p style={{ color: "red" }}>{error}</p>} {/*error &&はエラーに何か入ったら表示しろという意味*/}
            {/*ボタンを押されhandleChange関数が作動。ミスがあるとsetErrorに文字列が入り上のエラー文が表示される*/}
            <button type="submit" className={styles.button}>登録</button>
</form>


        </div>
      );
      
}
