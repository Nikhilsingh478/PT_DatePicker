"use client";

import { useEffect } from 'react';
import useRecurrenceStore from '@/store/useRecurrenceStore';

export default function CustomRecurrenceOptions() {
  const {
    recurrenceType,
    interval,
    setInterval,
  } = useRecurrenceStore();

  useEffect(() => {
    // we reset the interval to 1 when the recurrence type changes
    setInterval(1);
  }, [recurrenceType, setInterval]);

  const unitMap = {
    daily: 'day(s)',
    weekly: 'week(s)',
    monthly: 'month(s)',
    yearly: 'year(s)',
  };

  return (
    <div className="space-y-3">
      <label className="block font-medium">Repeat every:</label>
      <div className="flex items-center gap-3">
        <input
          type="number"
          min={1}
          value={interval}
          onChange={(e) => setInterval(parseInt(e.target.value) || 1)}
          className="w-20 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">
          {unitMap[recurrenceType] || ''}
        </span>
      </div>
    </div>
  );
}
