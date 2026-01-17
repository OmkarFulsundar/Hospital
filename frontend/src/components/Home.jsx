import { useEffect, useState } from "react";
import React from 'react'

const Home = () => {
  
     const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    pid: "",
    name: "",
    age: "",
    disease: ""
  });

  const fetchPatients = async () => {
    const res = await fetch("http://localhost:5000/patients");
    const data = await res.json();
    setPatients(data);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPatient = async () => {
    await fetch("http://localhost:5000/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({ pid: "", name: "", age: "", disease: "" });
    fetchPatients();
  };

  const deletePatient = async (pid) => {
    await fetch(`http://localhost:5000/patients/${pid}`, {
      method: "DELETE"
    });
    fetchPatients();
  };

  return (
    <div className="container">
      <h1>🏥 Hospital Management System</h1>

      <div className="form">
        <input name="pid" placeholder="Patient ID" value={form.pid} onChange={handleChange} />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />
        <input name="disease" placeholder="Disease" value={form.disease} onChange={handleChange} />
        <button onClick={addPatient}>Add Patient</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Age</th><th>Disease</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.pid}>
              <td>{p.pid}</td>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.disease}</td>
              <td>
                <button className="del" onClick={() => deletePatient(p.pid)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home
