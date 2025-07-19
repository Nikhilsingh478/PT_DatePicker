import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import MonthlyPatternSelector from './MonthlyPatternSelector.jsx';
import useRecurrenceStore from '@/store/useRecurrenceStore';
import React from 'react';

// Helper to reset Zustand store between tests
const resetStore = () => {
  const { setCustomPattern, setRecurrenceType } = useRecurrenceStore.getState();
  setCustomPattern({ week: 'first', weekday: 'Monday' });
  setRecurrenceType('monthly');
};

describe('MonthlyPatternSelector', () => {
  beforeEach(() => {
    resetStore();
  });

  it('renders correctly for monthly recurrence', () => {
    useRecurrenceStore.getState().setRecurrenceType('monthly');
    render(<MonthlyPatternSelector />);
    expect(screen.getByLabelText(/Repeat on/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Repeat on:' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Weekday' })).toBeInTheDocument();
    expect(screen.getAllByRole('combobox').length).toBe(2);
  });

  it('does not render for non-monthly/yearly recurrence', () => {
    useRecurrenceStore.getState().setRecurrenceType('weekly');
    render(<MonthlyPatternSelector />);
    expect(screen.queryByLabelText(/Repeat on/i)).toBeNull();
  });

  it('updates the store when position is changed', () => {
    render(<MonthlyPatternSelector />);
    const positionSelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(positionSelect, { target: { value: 'Second' } });
    expect(useRecurrenceStore.getState().customPattern.week).toBe('second');
  });

  it('updates the store when weekday is changed', () => {
    render(<MonthlyPatternSelector />);
    const weekdaySelect = screen.getAllByRole('combobox')[1];
    fireEvent.change(weekdaySelect, { target: { value: 'Friday' } });
    expect(useRecurrenceStore.getState().customPattern.weekday).toBe('Friday');
  });

  it('renders and works for yearly recurrence', () => {
    useRecurrenceStore.getState().setRecurrenceType('yearly');
    render(<MonthlyPatternSelector />);
    expect(screen.getByLabelText(/Repeat on/i)).toBeInTheDocument();
    const weekdaySelect = screen.getAllByRole('combobox')[1];
    fireEvent.change(weekdaySelect, { target: { value: 'Sunday' } });
    expect(useRecurrenceStore.getState().customPattern.weekday).toBe('Sunday');
  });
}); 