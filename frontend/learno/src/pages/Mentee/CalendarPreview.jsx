import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../assets/css/calendar.css";
import transformAvailability from "../../config/transformAvailability";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config/config";

const bookedAppointments = {
  "2025-06-05": ["13:00", "14:00"],
  "2025-06-13": ["14:00"],
  "2025-06-10": ["12:00"],
};

const CalendarPreview = () => {
  const [view, setView] = useState("month");
  const [date, setDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const navigate = useNavigate();
  const [availability, setAvailability] = useState(null);
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(null);
  const [transformedAvailability, setTransformedAvailability] = useState({});
  const [bookedAppointments, setBookedAppointments] = useState({});


  useEffect(() => {
     const fetchData = async () => {
      try {
        // Fetch availability
        const availabilityResponse = await axios.get(`${API_URL}/mentee/getAvailability/4`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        // Fetch booked appointments
        const bookingsResponse = await axios.get(`${API_URL}/mentee/getBookingDetails/1`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });

        // Transform bookings data into the required format
        const transformedBookings = bookingsResponse.data.reduce((acc, booking) => {
          const date = booking.bookingDate;
          const time = booking.timeSlot.slice(0, 5); // Get HH:MM format
          
          if (!acc[date]) {
            acc[date] = [];
          }
          
          if (!acc[date].includes(time)) {
            acc[date].push(time);
          }
          
          return acc;
        }, {});

        setBookedAppointments(transformedBookings);
        setAvailability(availabilityResponse.data);

        // Transform availability data
        if (availabilityResponse.data) {
          const dbAvailability = [{
            days: availabilityResponse.data.days.map(day => day.toLowerCase()),
            startTime: availabilityResponse.data.startTime.slice(0, 5), 
            endTime: availabilityResponse.data.endTime.slice(0, 5),    
          }];
          setTransformedAvailability(transformAvailability(dbAvailability, transformedBookings));
        }

        setLoading(false);
      } catch (err) {
        setError(err.message || 'Something went wrong');
        setLoading(false);
      }
    };

    fetchData();
  },[])

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const selectedDayKey = formatDate(date);
  const dateSlots = transformedAvailability[selectedDayKey]?.slots || [];

  const slotStatus = (slot) => {
    const dayInfo =  transformedAvailability[selectedDayKey];
    if (!dayInfo || !dayInfo.slots.includes(slot)) return "unavailable";
    if (dayInfo.bookedTimes?.includes(slot)) return "booked";
    return "available";
  };

  const handleTimeSlotClick = (slot) => {
    if (slotStatus(slot) === "available") {
      setSelectedTimeSlot(slot);
    }
  };

  const handleNextClick = () => {
    if (selectedTimeSlot) {
      navigate("/mentee/booking-request/1", {
        state: {
          selectedDate: date,
          selectedTime: selectedTimeSlot,
        },
      });
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 font-sans bg-gray-50">
      <div className="bg-white w-full max-w-6xl rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] overflow-hidden">
        <div className="bg-[var(--primary-color)] px-8 py-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-1">Schedule a Session</h2>
              <p className="text-[var(--primary-lightest)] text-sm">
                Pick a date and time to continue with booking
              </p>
            </div>
            <div className="flex gap-4 bg-[var(--primary-dark)]/20 px-4 py-2 rounded-[var(--radius)]">
              {["Available", "Booked", "Unavailable"].map((label, idx) => {
                const color = ["bg-green-400", "bg-yellow-400", "bg-gray-400"][idx];
                return (
                  <div key={label} className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${color}`}></span>
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <Calendar
            onChange={setDate}
            value={date}
            view={view}
            onViewChange={({ view }) => setView(view)}
            className="!border-0"
            tileContent={({ date: tileDate }) => {
              const key = formatDate(tileDate);
              const status = transformedAvailability[key]?.status;
              const colorClass = {
                available: "bg-green-500",
                partiallyBooked: "bg-yellow-400",
                booked: "bg-yellow-600",
              }[status];
              return colorClass ? (
                <span className={`block absolute mt-7 mx-auto w-2 h-2 rounded-full ${colorClass}`} />
              ) : null;
            }}
            tileClassName={({ date: tileDate }) => {
              const key = formatDate(tileDate);
              const status = transformedAvailability[key]?.status
              return {
                available: "calendar-available",
                partiallyBooked: "calendar-booked",
                booked: "calendar-booked",
              }[status] || "";
            }}
          />

          <div className="mt-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <div>
                <h3 className="text-xl font-semibold text-[var(--gray-800)]">Available Time Slots</h3>
                <p className="text-sm text-[var(--gray-500)]">
                  {date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="bg-[var(--gray-100)] px-4 py-2 rounded-full text-sm text-[var(--gray-600)]">
                {dateSlots.length} slot(s) available
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {dateSlots.length === 0 ? (
                <div className="col-span-full text-center bg-[var(--gray-50)] border border-[var(--gray-200)] py-8 rounded-[var(--radius)]">
                  <p className="text-[var(--gray-500)] font-medium">No available slots</p>
                  <p className="text-sm text-[var(--gray-400)]">Please try another date</p>
                </div>
              ) : (
                dateSlots.map((slot) => {
                  const status = slotStatus(slot);
                  const styleMap = {
                    available: selectedTimeSlot === slot
                      ? "bg-[var(--primary-lightest)] border-[var(--primary-color)] text-[var(--primary-dark)] ring-2 ring-[var(--primary-color)]"
                      : "bg-white border-[var(--gray-200)] text-[var(--gray-700)] hover:bg-[var(--gray-50)]",
                    booked: "bg-yellow-50 border-yellow-200 text-yellow-600 cursor-not-allowed",
                    unavailable: "bg-[var(--gray-100)] border-[var(--gray-300)] text-[var(--gray-400)] cursor-not-allowed",
                  };

                  return (
                    <button
                      key={slot}
                      onClick={() => handleTimeSlotClick(slot)}
                      disabled={status !== "available"}
                      className={`h-20 rounded-[var(--radius)] border flex flex-col items-center justify-center transition-all duration-200 ${styleMap[status]}`}
                    >
                      <span className="font-semibold text-lg">{slot}</span>
                      <span className="text-xs mt-1 capitalize">{status}</span>
                    </button>
                  );
                })
              )}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNextClick}
                disabled={!selectedTimeSlot}
                className={`px-8 py-3 rounded-[var(--radius)] font-medium text-white text-base transition-all duration-200
                  ${
                    selectedTimeSlot
                      ? "bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] shadow-md"
                      : "bg-[var(--gray-300)] cursor-not-allowed"
                  }
                `}
              >
                {selectedTimeSlot ? "Continue to Booking" : "Select a Time Slot"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPreview;
