import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  startOfMonth,
  lastDayOfMonth,
} from "date-fns";

const WEEKDAY_MAP = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const WEEK_POSITION_MAP = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  last: -1,
};

// Calculating Nth weekday of a given month/year
function getNthWeekdayOfMonth(year, month, targetDay, weekPosition) {
  const firstOfMonth = new Date(year, month, 1);
  const firstDay = firstOfMonth.getDay();

  let dayOffset = targetDay - firstDay;
  if (dayOffset < 0) dayOffset += 7;

  if (weekPosition === -1) {
    // Last occurrence of weekday in the month
    const lastOfMonth = new Date(year, month + 1, 0); // last day of month
    let date = lastOfMonth.getDate();
    while (new Date(year, month, date).getDay() !== targetDay) {
      date--;
    }
    return new Date(year, month, date);
  } else {
    const date = 1 + dayOffset + 7 * (weekPosition - 1);
    const result = new Date(year, month, date);
    // Checking if it overflows to next month
    if (result.getMonth() !== month) return null;
    return result;
  }
}

//to format date as YYYY-MM-DD in local time
function formatDateLocal(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getRecurringDates({
  recurrenceType,
  startDate,
  endDate,
  interval,
  selectedWeekDays = [],
  pattern,
}) {
  const recurringDates = [];
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date(startDate);
  let current = new Date(start);

  switch (recurrenceType) {
    case "daily":
      while (current <= end) {
        recurringDates.push(formatDateLocal(current));
        current = addDays(current, interval);
      }
      break;

    case "weekly":
      while (current <= end) {
        for (const day of selectedWeekDays) {
          const weekdayIndex = WEEKDAY_MAP[day];
          const nextDate = new Date(current);
          nextDate.setDate(
            current.getDate() + ((7 + weekdayIndex - current.getDay()) % 7)
          );
          if (nextDate >= start && nextDate <= end) {
            recurringDates.push(formatDateLocal(nextDate));
          }
        }
        current = addWeeks(current, interval);
      }
      break;

    case "monthly":
      while (current <= end) {
        const weekdayIndex = WEEKDAY_MAP[pattern.weekday];
        const weekPosition = WEEK_POSITION_MAP[pattern.week.toLowerCase()];
        const nthDate = getNthWeekdayOfMonth(
          current.getFullYear(),
          current.getMonth(),
          weekdayIndex,
          weekPosition
        );
        if (nthDate && nthDate >= start && nthDate <= end) {
          recurringDates.push(formatDateLocal(nthDate));
        }
        current = addMonths(current, interval);
      }
      break;

    case "yearly":
      while (current <= end) {
        const weekdayIndex = WEEKDAY_MAP[pattern.weekday];
        const weekPosition = WEEK_POSITION_MAP[pattern.week.toLowerCase()];
        const nthDate = getNthWeekdayOfMonth(
          current.getFullYear(),
          start.getMonth(),
          weekdayIndex,
          weekPosition
        );
        if (nthDate && nthDate >= start && nthDate <= end) {
          recurringDates.push(formatDateLocal(nthDate));
        }
        current = addYears(current, interval);
      }
      break;
  }

  return Array.from(new Set(recurringDates)).sort();
}
