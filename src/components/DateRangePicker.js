"use client";

import useRecurrenceStore from '@/store/useRecurrenceStore';

export default function DateRangePicker() {
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  } = useRecurrenceStore();

  const handleStartChange = (e) => {
    const newStart = e.target.value;
    if (endDate && new Date(newStart) > new Date(endDate)) {
      setEndDate(''); // Reset end date if new start is after it
    }
    setStartDate(newStart);
  };

  const handleEndChange = (e) => {
    const newEnd = e.target.value;
    if (startDate && new Date(newEnd) < new Date(startDate)) {
      return; // not allowing endDate before startDate
    }
    setEndDate(newEnd);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium text-sm mb-1">Start Date:</label>
        <input
          type="date"
          value={startDate || ''}
          onChange={handleStartChange}
          className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block font-medium text-sm mb-1">End Date (Optional):</label>
        <input
          type="date"
          value={endDate || ''}
          onChange={handleEndChange}
          className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
