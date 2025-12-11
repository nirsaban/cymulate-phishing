import { useEffect, useState, useContext } from "react";
import { getAttempts, createAttempt, sendAttempt } from "../api/phishingApi";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const [attempts, setAttempts] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { logout } = useContext(AuthContext);

  const load = async () => {
  try {
    const res = await getAttempts();
    setAttempts(res.data);
  } catch (err) {

  }
};
  const submit = async (e: any) => {
  e.preventDefault();
  try {
    const res = await createAttempt(email, message);
    await sendAttempt(res.data._id);
    alert("Phishing email sent!");
    load();
  } catch (err) {
   
  }
};

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <div style={{
        background: "#4a6cf7",
        padding: "15px",
        color: "white",
        display: "flex",
        justifyContent: "space-between"
      }}>
        <h3>Phishing Dashboard</h3>
        <button style={{ width: 100, background: "#ff4d4d" }} onClick={logout}>Logout</button>
      </div>

      <div style={{ padding: 20 }}>
        <h3>Create Phishing Attempt</h3>
        <form onSubmit={submit}>
          <input placeholder="Target Email" onChange={(e) => setEmail(e.target.value)} />
          <textarea placeholder="Message" onChange={(e) => setMessage(e.target.value)} />
          <button>Send Email</button>
        </form>

        <h3 style={{ marginTop: 40 }}>All Attempts</h3>

        <table style={{
          width: "100%",
          background: "white",
          borderCollapse: "collapse",
          marginTop: 20
        }}>
          <thead>
            <tr style={{ background: "#e8e8e8" }}>
              <th>Email</th>
              <th>Message</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((a) => (
              <tr key={a._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td>{a.email}</td>
                <td>{a.message}</td>
                <td>
                  <span style={{
                    padding: "4px 8px",
                    borderRadius: 4,
                    background:
                      a.status === "CLICKED" ? "#4caf50" :
                      a.status === "SENT" ? "#2196f3" :
                      "#b0bec5",
                    color: "white"
                  }}>
                    {a.status}
                  </span>
                </td>
                <td>{new Date(a.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
