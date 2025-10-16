// src/App.js
import React, { useState, useEffect } from "react";
import DoctorDropdown from "./components/DoctorDropdown";
import DayView from "./components/DayView";
import WeekView from "./components/WeekView";
import { MOCK_DOCTORS, MOCK_PATIENTS, MOCK_APPOINTMENTS } from "./data/mockData";

export default function App() {
  const [view, setView] = useState("day");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDoctors(MOCK_DOCTORS);

    // Enrich appointments with patientName
    const enrichedAppointments = MOCK_APPOINTMENTS.map((a) => {
      const patient = MOCK_PATIENTS.find((p) => p.id === a.patientId);
      return { ...a, patientName: patient?.name || "Unknown" };
    });
    setAppointments(enrichedAppointments);

    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const selectedDoctorData = doctors.find((d) => d.id === selectedDoctor);

  const filteredAppointments = selectedDoctor
    ? appointments.filter((a) => a.doctorId === selectedDoctor)
    : appointments;

  return (
    <div className="p-6 min-h-screen bg-blue-50">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        🏥 Hospital Appointment Scheduler
      </h1>

      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        <DoctorDropdown
          doctors={doctors}
          selected={selectedDoctor}
          onChange={setSelectedDoctor}
        />
        <div className="flex gap-2">
          <button
            onClick={() => setView("day")}
            className={`px-4 py-2 rounded font-medium cursor-pointer ${
              view === "day"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Day View
          </button>
          <button
            onClick={() => setView("week")}
            className={`px-4 py-2 rounded font-medium cursor-pointer ${
              view === "week"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Week View
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500 animate-pulse">
          Loading appointments...
        </div>
      ) : view === "day" ? (
        <DayView
          appointments={filteredAppointments}
          selectedDoctorData={selectedDoctorData}
        />
      ) : (
        <WeekView
          appointments={filteredAppointments}
          selectedDoctorData={selectedDoctorData}
        />
      )}
    </div>
  );
}
