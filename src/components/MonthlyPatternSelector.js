'use client';

import { useState, useEffect } from 'react';
import useRecurrenceStore from '@/store/useRecurrenceStore';

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const positions = ['First', 'Second', 'Third', 'Fourth', 'Last'];

export default function MonthlyPatternSelector() {
  const {
    recurrenceType,
    customPattern,
    setCustomPattern,
  } = useRecurrenceStore();

  const [position, setPosition] = useState(customPattern.week || 'First');
  const [weekday, setWeekday] = useState(customPattern.weekday || 'Monday');

  // Sync to global store on changes
  useEffect(() => {
    setCustomPattern({
      week: position.toLowerCase(),
      weekday,
    });
  }, [position, weekday, setCustomPattern]);

  // Reset whole when type changes
  useEffect(() => {
    if (recurrenceType !== 'monthly' && recurrenceType !== 'yearly') {
      setPosition('First');
      setWeekday('Monday');
      setCustomPattern({
        week: 'first',
        weekday: 'Monday',
      });
    }
  }, [recurrenceType, setCustomPattern]);

  if (recurrenceType !== 'monthly' && recurrenceType !== 'yearly') return null;

  return (
    <div className="space-y-3">
      <label className="block font-medium">Repeat on:</label>
      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
        >
          {positions.map((pos) => (
            <option key={pos} value={pos}>
              {pos}
            </option>
          ))}
        </select>

        <select
          value={weekday}
          onChange={(e) => setWeekday(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
        >
          {weekdays.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
