import React from "react";
import { appointmentTypes } from "../data/mockData";

export default function AppointmentCard({ appointment, onClick }) {
  const color = appointmentTypes[appointment.type] || "#3b82f6";
  return (
    <div
      className="rounded-lg p-2 text-sm text-white shadow-md mb-2 cursor-pointer hover:scale-105 transition"
      style={{ backgroundColor: color }}
      onClick={() => onClick?.(appointment)}
    >
      <div className="font-semibold">{appointment.patientName}</div>
        <div className="text-xs">
          {appointment.type} |{" "}
          {new Date(appointment.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          {" - "}
          {new Date(appointment.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
    </div>
  );
}
