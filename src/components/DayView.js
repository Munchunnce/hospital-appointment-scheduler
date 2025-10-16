// src/components/DayView.js
import React, { useState } from "react";
import { format, addMinutes } from "date-fns";
import { appointmentTypes } from "../data/mockData";

export default function DayView({ appointments, selectedDoctorData }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const startTime = new Date(selectedDate);
  startTime.setHours(8, 0, 0, 0);
  const endTime = new Date(selectedDate);
  endTime.setHours(18, 0, 0, 0);

  const timeSlots = [];
  let current = new Date(startTime);
  while (current <= endTime) {
    timeSlots.push(new Date(current));
    current = addMinutes(current, 30);
  }

  // Compare local dates instead of ISO strings
  const todaysAppointments = appointments.filter(
    (a) =>
      a.startTime.toDateString() === selectedDate.toDateString()
  );

  const getAppointmentAtTime = (time) =>
    todaysAppointments.find(
      (a) => a.startTime <= time && a.endTime > time
    );

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-2xl p-6 max-w-5xl mx-auto border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-2xl font-bold text-blue-800">
          {selectedDoctorData
            ? `${selectedDoctorData.name} - ${selectedDoctorData.specialty}`
            : "All Doctors"}{" "}
          │ Day View
        </h2>

        <input
          type="date"
          value={format(selectedDate, "yyyy-MM-dd")}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 shadow-sm hover:border-blue-400 focus:outline-none focus:ring focus:ring-blue-200 cursor-pointer"
        />
      </div>

      {todaysAppointments.length === 0 && (
        <div className="text-center text-gray-500 italic py-10">
          No appointments scheduled for today.
        </div>
      )}

      <div className="overflow-hidden rounded-xl bg-white shadow-md border border-gray-200">
        <div className="divide-y divide-gray-100">
          {timeSlots.map((slot, i) => {
            const appointment = getAppointmentAtTime(slot);
            const formattedTime = format(slot, "HH:mm");

            return (
              <div
                key={i}
                className="grid grid-cols-[90px_1fr] items-center hover:bg-blue-50 transition-all duration-150"
              >
                <div className="py-3 px-2 text-gray-700 font-semibold text-center border-r border-gray-200 bg-gray-50 text-sm sm:text-base">
                  {formattedTime}
                </div>
                <div className="relative py-3 px-4 min-h-[65px] flex items-center">
                  {appointment ? (
                    <div
                      className="w-full rounded-xl border px-4 py-3 shadow-sm"
                      style={{
                        backgroundColor:
                          appointmentTypes[appointment.type.toLowerCase()] + "22",
                        borderColor:
                          appointmentTypes[appointment.type.toLowerCase()],
                      }}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-blue-900 text-sm sm:text-base">
                          {appointment.patientName}
                        </h3>
                        <span
                          className="text-xs px-2 py-[2px] rounded-full font-semibold text-white"
                          style={{
                            backgroundColor:
                              appointmentTypes[appointment.type.toLowerCase()],
                          }}
                        >
                          {appointment.type}
                        </span>
                      </div>
                      <p className="text-gray-700 text-xs sm:text-sm font-medium">
                        ⏰ {format(appointment.startTime, "hh:mm a")} -{" "}
                        {format(appointment.endTime, "hh:mm a")}
                      </p>
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm italic tracking-wide">
                      — Available —
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
