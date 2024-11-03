import React, { useState } from 'react';
import '../WeekdayDatePicker.css';

interface WeekdayDateRangePickerProps {
    onChange: (range: [string, string], weekends: string[]) => void;
  }
  
  const WeekdayDateRangePicker: React.FC<WeekdayDateRangePickerProps> = ({ onChange }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedRange, setSelectedRange] = useState<{ start: Date | null; end: Date | null }>({
      start: null,
      end: null,
    });
  
    const handlePrevMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };
  
    const handleNextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };
  
    const getDaysInMonth = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const days = [];
  
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
      }
  
      for (let day = 1; day <= totalDaysInMonth; day++) {
        days.push(new Date(year, month, day));
      }
  
      return days;
    };
  
    const daysInMonth = getDaysInMonth(currentMonth);
  
    const isWeekend = (date: Date) => date.getDay() === 0 || date.getDay() === 6;
  
    const handleDateClick = (date: Date | null) => {
      if (!date || isWeekend(date)) return;
  
      if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
        setSelectedRange({ start: date, end: null });
      } else if (selectedRange.start && !selectedRange.end) {
        if (date >= selectedRange.start) {
          const endDate = date;
          setSelectedRange({ start: selectedRange.start, end: endDate });
  
          // Find all weekends in the range and format the dates
          const weekendsInRange = [];
          let current = new Date(selectedRange.start);
          while (current <= endDate) {
            if (isWeekend(current)) {
              weekendsInRange.push(current.toISOString().split('T')[0]);
            }
            current.setDate(current.getDate() + 1);
          }
  
          onChange(
            [selectedRange.start.toISOString().split('T')[0], endDate.toISOString().split('T')[0]],
            weekendsInRange
          );
        } else {
          setSelectedRange({ start: date, end: null });
        }
      }
    };
  
    const isDateSelected = (date: Date) => {
      if (!selectedRange.start) return false;
      if (selectedRange.start && !selectedRange.end) {
        return date.getTime() === selectedRange.start.getTime();
      }
      if (selectedRange.start && selectedRange.end) {
        return (
          date >= selectedRange.start &&
          date <= selectedRange.end &&
          !isWeekend(date)
        );
      }
      return false;
    };
  
    return (
      <div className="date-picker">
        <h1>Weekday Date Range Picker</h1>
        <div className="controls">
          <button onClick={handlePrevMonth}>Previous Month</button>
          <span>
            {currentMonth.toLocaleString('default', { month: 'long' })}{' '}
            {currentMonth.getFullYear()}
          </span>
          <button onClick={handleNextMonth}>Next Month</button>
        </div>
  
        <div className="calendar">
          {['S', 'M', 'T', 'W', 'Th', 'F', 'S'].map((day, index) => (
            <div key={index} className="day-label">
              {day}
            </div>
          ))}
  
          {daysInMonth.map((date, index) => (
            <div
              key={index}
              className={`day ${date && isWeekend(date) ? 'weekend' : ''} ${date && isDateSelected(date) ? 'selected' : ''}`}
              onClick={() => handleDateClick(date)}
            >
              {date ? date.getDate() : ''}
            </div>
          ))}
        </div>
  
        <div className="debug-info">
          <p>Selected Start Date: {selectedRange.start ? selectedRange.start.toDateString() : 'None'}</p>
          <p>Selected End Date: {selectedRange.end ? selectedRange.end.toDateString() : 'None'}</p>
        </div>
      </div>
    );
  };
  
  export default WeekdayDateRangePicker;