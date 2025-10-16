// src/hooks/useAppointments.js
import { useState, useEffect } from "react";
import { MOCK_APPOINTMENTS } from "../data/mockData";

export const useAppointments = (selectedDoctorId) => {
  // Safe localStorage parse
  let savedAppointments = [];
  try {
    savedAppointments = JSON.parse(localStorage.getItem("appointments")) || MOCK_APPOINTMENTS;
  } catch (e) {
    savedAppointments = MOCK_APPOINTMENTS;
  }

  const [appointments, setAppointments] = useState(savedAppointments);

  // Persist to localStorage whenever appointments change
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  // Add or update an appointment
  const addOrUpdateAppointment = (appointment) => {
    setAppointments((prev) => {
      const exists = prev.find(a => a.id === appointment.id);
      if (exists) {
        return prev.map(a => (a.id === appointment.id ? appointment : a));
      } else {
        return [...prev, { ...appointment, id: `apt-${Date.now()}` }];
      }
    });
  };

  // Filter by selected doctor
  const filteredAppointments = selectedDoctorId
    ? appointments.filter(a => a.doctorId === selectedDoctorId)
    : appointments;

  return { appointments: filteredAppointments, addOrUpdateAppointment };
};
