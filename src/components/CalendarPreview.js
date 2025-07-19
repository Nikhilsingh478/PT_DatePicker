"use client";

import { useEffect } from "react";
import useRecurrenceStore from "@/store/useRecurrenceStore";
import { getRecurringDates } from "@/utils/recurrence";

export default function CalendarPreview() {
  const {
    recurrenceType,
    startDate,
    endDate,
    interval,
    selectedWeekDays,
    customPattern,
    previewDates,
    setPreviewDates,
  } = useRecurrenceStore();

  useEffect(() => {
    if (
      !startDate ||
      !interval ||
      (recurrenceType === "weekly" && selectedWeekDays.length === 0)
    ) {
      setPreviewDates([]);
      return;
    }

    const dates = getRecurringDates({
      recurrenceType,
      startDate,
      endDate,
      interval,
      selectedWeekDays,
      pattern: customPattern,
    });

    setPreviewDates(dates);
  }, [
    recurrenceType,
    startDate,
    endDate,
    interval,
    selectedWeekDays,
    customPattern,
    setPreviewDates,
  ]);

  return (
    <div>
      <h2 className="text-lg font-medium mb-2">Preview Dates:</h2>
      {previewDates.length > 0 ? (
        <ul className="list-disc list-inside space-y-1">
          {previewDates.map((date) => (
            <li key={date}>{date}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No preview available yet.</p>
      )}
    </div>
  );
}
