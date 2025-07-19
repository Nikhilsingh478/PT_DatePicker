'use client';

import useRecurrenceStore from '@/store/useRecurrenceStore';

const options = ['daily', 'weekly', 'monthly', 'yearly'];

export default function RecurrenceSelector() {
  const {
    recurrenceType,
    setRecurrenceType,
    setSelectedWeekDays,
  } = useRecurrenceStore();

  const handleSelect = (type) => {
    setRecurrenceType(type);
    if (type !== 'weekly') {
      // Clearing selected weekdays if switching away from 'weekly'
      setSelectedWeekDays([]);
    }
  };

  return (
    <div className="flex gap-3 flex-wrap">
      {options.map((type) => (
        <button
          key={type}
          onClick={() => handleSelect(type)}
          className={`px-4 py-2 rounded-lg capitalize font-medium transition-colors ${
            recurrenceType === type
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-blue-100'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
