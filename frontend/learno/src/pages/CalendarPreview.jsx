import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; 
import '../assets/css/calendar.css';
import transformAvailability from "../config/transformAvailability";

const bookedAppointments = {
  "2025-06-05": ["13:00", "14:00"], // Specific times booked
  "2025-06-13": ["14:00"],
  "2025-06-10": ["12:00"]  
};

const CalendarPreview = () => {
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());

  const dbAvailability = [
    {
      "days": ["monday", "wednesday", "thursday", "friday", "tuesday"],
      "startTime": "12:00",
      "endTime": "17:00"
    }
  ];
  const AVAILABILITY = transformAvailability(dbAvailability, bookedAppointments);
 
   function formatDate(date) {
    // Use local time methods!
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Get the slots for the selected date from availability
  const selectedDayKey = formatDate(date);
  const dateSlots = AVAILABILITY[selectedDayKey]?.slots || [];

  // Compute status for each slot
  const slotStatus = (slot) => {
    const dayKey = selectedDayKey;
    const dayInfo = AVAILABILITY[dayKey];

    if (!dayInfo || !dayInfo.slots.includes(slot)) return "unavailable";
    if (dayInfo.bookedTimes?.includes(slot)) return "booked";
    return "available";
  };

  return (
    <div className="max-w-3xl mx-auto font-inter">
      <div className="flex justify-between items-center mt-4 mb-2">
        <div />
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${view === "month" ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-900"}`}
            onClick={() => setView("month")}
          >
            Month
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${view === "month" ? "bg-gray-200 text-gray-900" : "bg-teal-600 text-white"}`}
            onClick={() => setView("week")}
          >
            week
          </button>
        </div>
      </div>

      <div className="flex gap-7 items-center my-4 text-base">
        <div className="flex items-center"><span className="inline-block w-4 h-4 rounded bg-green-200 mr-2" /> Available</div>
        <div className="flex items-center"><span className="inline-block w-4 h-4 rounded bg-yellow-200 mr-2" /> Booked</div>
        <div className="flex items-center"><span className="inline-block w-4 h-4 rounded bg-gray-200 border border-gray-400 mr-2" /> Unavailable</div>
      </div>

      <div className="border-2 border-blue-400 rounded-md p-2 bg-white shadow-md">
        <Calendar
          onChange={setDate}
          value={date}
          view={view}
          onViewChange={({ view }) => setView(view)}
          tileContent={({ date: tileDate }) => {
            const key = formatDate(tileDate);
            if (AVAILABILITY[key]) {
              return (
                <span
                  className={`block absolute mt-7 mx-auto w-2.5 h-2.5 rounded-full ${
                    AVAILABILITY[key].status === "available"
                      ? "bg-green-500"
                      : AVAILABILITY[key].status === "partiallyBooked"
                      ? "bg-yellow-400"
                      : AVAILABILITY[key].status === "booked"
                      ? "bg-yellow-600"
                      : ""
                  }`}
                />
              );
            }
            return null;
          }}
          tileClassName={({ date: tileDate }) => {
            const key = formatDate(tileDate);
            if (AVAILABILITY[key]) {
              return AVAILABILITY[key].status === "available"
                ? "calendar-available"
                : AVAILABILITY[key].status === "partiallyBooked"
                ? "calendar-booked"
                : AVAILABILITY[key].status === "booked"
                ? "calendar-booked"
                : "";
            }
            return "";
          }}
        />
      </div>
      <div className="mt-6">
        <div className="font-semibold mb-2 text-lg">
          Available Times for {date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </div>
        <div className="flex flex-wrap gap-3 mb-3">
          {dateSlots.length === 0 ? (
            <div className="text-gray-500">No available times</div>
          ) : (
            dateSlots.map((slot) => (
              <div
                key={slot}
                className={`
                  min-w-[90px] h-16 rounded-lg flex flex-col items-center justify-center border text-base
                  ${slotStatus(slot) === "available"
                    ? "bg-green-50 border-green-200 text-green-700"
                    : slotStatus(slot) === "booked"
                    ? "bg-yellow-50 border-yellow-300 text-yellow-700"
                    : "bg-gray-100 border-gray-200 text-gray-400"
                  }
                `}
              >
                <span className="font-medium">{slot}</span>
                <span className="text-xs">
                  {slotStatus(slot) === "available"
                    ? "Available"
                    : slotStatus(slot) === "booked"
                    ? "Booked"
                    : "Unavailable"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPreview;