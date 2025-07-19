"use client";

import useRecurrenceStore from "@/store/useRecurrenceStore";

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function WeekdaySelector() {
  const {
    recurrenceType,
    selectedWeekDays,
    toggleDay,
  } = useRecurrenceStore();

  if (recurrenceType !== 'weekly') return null;

  return (
    <div className="space-y-3">
      <label className="block font-medium mb-1">Repeat on:</label>
      <div className="flex flex-wrap gap-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => toggleDay(day)}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
              selectedWeekDays.includes(day)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-blue-100'
            }`}
          >
            {day.slice(0, 3)}
          </button>
        ))}
      </div>
    </div>
  );
}
