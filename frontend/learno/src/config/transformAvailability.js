function formatDate(date) {
  // Use local time methods to avoid timezone issues
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const generateTimeSlots = (startTime, endTime) => {
  const slots = [];
  let [startHour, startMinute] = startTime.split(':').map(Number);
  let [endHour, endMinute] = endTime.split(':').map(Number);
  
  let currentHour = startHour;
  let currentMinute = startMinute;

  while (
    currentHour < endHour ||
    (currentHour === endHour && currentMinute < endMinute)
  ) {
    slots.push(
      `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`
    );
    // Increment by 1 hour (adjust if you want different slot intervals)
    currentHour++;
  }
  return slots;
};

export default function transformAvailability(availabilityData, bookedDates = {}) {
  const result = {};
  const today = new Date();
  const endDate = new Date();
  endDate.setMonth(today.getMonth() + 2); // Show availability for next 2 months

  // Helper to convert day name to day number (0-6)
  const dayNameToNumber = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6
  };

  // First mark all available dates
  for (const entry of availabilityData) {
    entry.days.forEach(dayName => {
      const dayNumber = dayNameToNumber[dayName.toLowerCase()];
      let currentDate = new Date(today);
      while (currentDate <= endDate) {
        if (currentDate.getDay() === dayNumber) {
          const dateKey = formatDate(currentDate);
          if (!result[dateKey]) {
            result[dateKey] = {
              status: "available",
              slots: generateTimeSlots(entry.startTime, entry.endTime),
              bookedTimes: []
            };
          }
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
  }

  // Now apply bookings
  for (const [dateKey, times] of Object.entries(bookedDates)) {
    if (result[dateKey]) {
      // Mark specific slots as booked, keep others available
      result[dateKey].bookedTimes = times;
      // If all slots are booked, mark as "booked"
      if (
        times.length === result[dateKey].slots.length &&
        times.every((t) => result[dateKey].slots.includes(t))
      ) {
        result[dateKey].status = "booked";
      } else {
        result[dateKey].status = "partiallyBooked";
      }
    } else {
      // If the date is not available at all, still mark as fully booked
      result[dateKey] = {
        status: "booked",
        slots: [],
        bookedTimes: times
      };
    }
  }

  return result;
}