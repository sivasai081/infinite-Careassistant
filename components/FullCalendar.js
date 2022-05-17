import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react';
// import '~@fullcalendar/core/main.css';
// import '~@fullcalendar/daygrid/main.css';
// import '~@fullcalendar/timegrid/main.css';
// import '../styles/calendar.scss'

let CalendarComponent
export default function FullCalendar(props) {
  console.log("props", props)
  const [calendarLoaded, setCalendarLoaded] = useState(false)
  useEffect(() => {
    CalendarComponent = dynamic({
      modules: () => ({
        FullCalendar: import('@fullcalendar/react'),
        dayGridPlugin: import('@fullcalendar/daygrid'),
        interactionPlugin: import('@fullcalendar/interaction'),
        listPlugin: import('@fullcalendar/list'),
        timeGridPlugin: import('@fullcalendar/timegrid')
      }),
      render: (props, { FullCalendar: FullCalendar, ...plugins }) => (
        <FullCalendar {...props} plugins={Object.values(plugins)} />
      ),
      ssr: false
    })
    setCalendarLoaded(true)
  })
  let showCalendar = (props) => {
    if ( !calendarLoaded ) return <div>Loading ...</div>
    return (
      <CalendarComponent {...props}  />
    )
  }
  return (
    <React.Fragment>
      {showCalendar(props)}
    </React.Fragment>
  )
}