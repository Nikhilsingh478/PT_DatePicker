import { create } from 'zustand';

const useRecurrenceStore = create((set) => ({
  // Recurrence types as given : 'daily', 'weekly', 'monthly', 'yearly'
  recurrenceType: 'daily',
  setRecurrenceType: (type) => set({ recurrenceType: type }),

  // Interval: by default 
  interval: 1,
  setInterval: (val) => set({ interval: val }),

  // Specific days of the week for 'weekly'
  selectedWeekDays: [], // ['Mon', 'Tue' ...]
  toggleDay: (day) =>
    set((state) => {
      const isSelected = state.selectedWeekDays.includes(day);
      return {
        selectedWeekDays: isSelected
          ? state.selectedWeekDays.filter((d) => d !== day)
          : [...state.selectedWeekDays, day],
      };
    }),
  setSelectedWeekDays: (days) => set({ selectedWeekDays: days }),

  // Monthly/Yearly custom pattern
  customPattern: {
    week: 'first',
    weekday: 'Monday',
  },
  setCustomPattern: (pattern) => set({ customPattern: pattern }),

  // Date range (from - to)
  startDate: null,
  endDate: null,
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),

  // Preview dates
  previewDates: [],
  setPreviewDates: (dates) => set({ previewDates: dates }),
}));

export default useRecurrenceStore;
