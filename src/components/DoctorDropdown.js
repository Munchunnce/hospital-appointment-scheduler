// src/components/DoctorDropdown.js
import React from "react";

export default function DoctorDropdown({ doctors, selected, onChange }) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-lg px-4 py-2 bg-white shadow focus:ring-2 focus:ring-blue-400"
    >
      <option value="">All Doctors</option>
      {doctors.map((doc) => (
        <option key={doc.id} value={doc.id}>
          {doc.name} - {doc.specialty}
        </option>
      ))}
    </select>
  );
}
