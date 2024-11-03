import WeekdayDatePicker from './components/WeekdayDatePicker'

function App() {
  const handleDateChange = (range: [string, string], weekends: string[]) => {
    console.log('Selected Range:', range);
    console.log('Weekend Dates:', weekends);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <div>
        <WeekdayDatePicker onChange={handleDateChange} />
      </div>
    </div>
  )
}

export default App
