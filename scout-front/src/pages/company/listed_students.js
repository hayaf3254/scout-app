import Link from "next/link";
import { useEffect, useState } from "react";

export default function StudnetsList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <div>
      <h1>インターン生一覧</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            
              {student.name}
              &nbsp;
              <Link href={`/company/message/${localStorage.getItem("companyId")}_${student.id}`}>
              <button>メッセージを送る</button>
            </Link>
           
          </li>
        ))}
      </ul>
    </div>
  );
}
