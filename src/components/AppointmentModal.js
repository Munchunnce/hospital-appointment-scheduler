// // src/components/AppointmentModal.js
// import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import { appointmentTypes, MOCK_DOCTORS, MOCK_PATIENTS } from "../data/mockData";
// import { motion } from "framer-motion";

// export default function AppointmentModal({ isOpen, onClose, onSave, appointment }) {
//   const [formData, setFormData] = useState({
//     patientId: MOCK_PATIENTS[0]?.id || "",
//     type: "checkup",
//     doctorId: MOCK_DOCTORS[0]?.id || "",
//     startTime: "",
//     endTime: "",
//   });

//   useEffect(() => {
//     if (appointment) {
//       setFormData({ ...appointment });
//     }
//   }, [appointment]);

//   if (!isOpen) return null;

//   return ReactDOM.createPortal(
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 overflow-y-auto">
//       <motion.div
//         className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-6 w-full max-w-lg shadow-2xl mx-3 border border-blue-200"
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.8, opacity: 0 }}
//       >
//         {/* Header with gradient */}
//         <h2 className="text-2xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500">
//           {appointment ? "Edit Appointment" : "Add Appointment"}
//         </h2>

//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             const patient = MOCK_PATIENTS.find((p) => p.id === formData.patientId)?.name || "";
//             onSave({ ...formData, patientName: patient });
//             onClose();
//           }}
//           className="flex flex-col gap-4"
//         >
//           {/* Patient Dropdown */}
//           <select
//             value={formData.patientId}
//             onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
//             className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
//             required
//           >
//             {MOCK_PATIENTS.map((p) => (
//               <option key={p.id} value={p.id}>
//                 {p.name}
//               </option>
//             ))}
//           </select>

//           {/* Appointment Type Dropdown */}
//           <select
//             value={formData.type}
//             onChange={(e) => setFormData({ ...formData, type: e.target.value })}
//             className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
//           >
//             {Object.keys(appointmentTypes).map((type) => (
//               <option key={type} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>

//           {/* Doctor Dropdown */}
//           <select
//             value={formData.doctorId}
//             onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
//             className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
//           >
//             {MOCK_DOCTORS.map((doc) => (
//               <option key={doc.id} value={doc.id}>
//                 {doc.name} - {doc.specialty}
//               </option>
//             ))}
//           </select>

//           {/* Date & Time Inputs */}
//           <div className="flex flex-wrap gap-3">
//             <input
//               type="datetime-local"
//               value={formData.startTime}
//               onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
//               className="border rounded-lg px-3 py-2 flex-1 min-w-[150px] w-full sm:w-[48%] focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
//               required
//             />
//             <input
//               type="datetime-local"
//               value={formData.endTime}
//               onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
//               className="border rounded-lg px-3 py-2 flex-1 min-w-[150px] w-full sm:w-[48%] focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
//               required
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end gap-3 mt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold transition-all"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold hover:from-blue-700 hover:to-indigo-600 transition-all"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </div>,
//     document.getElementById("modal-root")
//   );
// }
