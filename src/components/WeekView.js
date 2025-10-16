// src/components/WeekView.js
import React from "react";
import { appointmentTypes } from "../data/mockData";

export default function WeekView({ appointments, selectedDoctorData }) {
  const start = new Date();
  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() - start.getDay() + i + 1); // Mon-Sun
    return date;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-blue-700">
        {selectedDoctorData
          ? `${selectedDoctorData.name} - ${selectedDoctorData.specialty} │ Week View`
          : "All Doctors │ Week View"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {days.map((day, i) => {
          const dayApps = appointments.filter(
            (a) =>
              new Date(a.startTime).toDateString() === day.toDateString()
          );

          return (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg flex flex-col border border-gray-200 min-h-[220px] overflow-hidden"
            >
              {/* Day header */}
              <div className="bg-blue-50 text-blue-700 font-semibold text-center py-2 rounded-t-2xl text-sm sm:text-base">
                {day.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}
              </div>

              {/* Appointments container */}
              <div className="flex-1 p-2 overflow-y-auto space-y-2">
                {dayApps.length === 0 ? (
                  <div className="text-gray-400 text-xs sm:text-sm text-center italic mt-2">
                    No appointments
                  </div>
                ) : (
                  dayApps.map((a) => (
                    <div
                      key={a.id}
                      className="rounded-xl border px-3 py-2 shadow-sm break-words"
                      style={{
                        backgroundColor: appointmentTypes[a.type.toLowerCase()] + "22",
                        borderColor: appointmentTypes[a.type.toLowerCase()],
                      }}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-blue-900 font-semibold text-xs sm:text-sm truncate">
                          {a.patientName}
                        </h3>
                        <span
                          className="text-[10px] sm:text-xs text-white px-2 py-[1px] rounded-full font-semibold"
                          style={{
                            backgroundColor: appointmentTypes[a.type.toLowerCase()],
                          }}
                        >
                          {a.type}
                        </span>
                      </div>
                      <p className="text-gray-700 text-[11px] sm:text-xs">
                        ⏰ {new Date(a.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                        {new Date(a.endTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
