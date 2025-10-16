import { appointments, doctors } from "../data/mockData";

export const getAppointments = async (doctorId) => {
  // Simulate API fetch
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        doctorId
          ? appointments.filter((a) => a.doctorId === doctorId)
          : appointments
      );
    }, 500);
  });
};

export const getDoctors = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(doctors), 200);
  });
};
