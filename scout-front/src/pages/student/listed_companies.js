import Link from "next/link";
import { useEffect, useState } from "react";

export default function CompaniesList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <div>
      <div>
      <Link href={`/student/company_message_list`}>
              企業からのメッセージ一覧
          </Link>
      </div>
      <h1>企業一覧</h1>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            <Link href={`/student/company_publish/${company.id}`}>
              {company.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
