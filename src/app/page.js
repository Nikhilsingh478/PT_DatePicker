import RecurrenceSelector from "@/components/RecurrenceSelector";
import DateRangePicker from "@/components/DateRangePicker";
import CustomRecurrenceOptions from "@/components/CustomRecurrenceOptions";
import WeekdaySelector from "@/components/WeekdaySelector";
import MonthlyPatternSelector from "@/components/MonthlyPatternSelector";
import CalendarPreview from "@/components/CalendarPreview";
import { getRecurringDates } from "@/utils/recurrence";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-2 py-6 sm:px-4">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 sm:p-10 space-y-8 border border-border">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-blue-700 tracking-tight mb-2">
          Recurring Date Picker
        </h1>
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Choose Recurrence Type:
            </h2>
            <RecurrenceSelector />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Select Date Range:</h2>
            <DateRangePicker />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Customize Recurrence:</h2>
            <CustomRecurrenceOptions />
          </div>

          <WeekdaySelector />

          <MonthlyPatternSelector />

          <CalendarPreview />
        </div>
      </div>
    </div>
  );
}
