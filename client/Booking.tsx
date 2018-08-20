import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface BookingInterface {

}

interface BookingState {
  isSubmitted?: boolean;
  startDay: string;
  startMonth: string;
  startYear: string;
  endDay: string;
  endMonth: string;
  endYear: string;
  diffDays: number;
  roomsAvailable: any[];
  hasAdditionalResults: boolean;
  additionalResults: any[];
}

export default class Booking extends React.Component<BookingInterface, BookingState> {
  constructor(props: BookingInterface) {
    super(props)
    this.state = {
      isSubmitted: false,
      startDay: '',
      startMonth: '',
      startYear: '',
      endDay: '',
      endMonth: '',
      endYear: '',
      roomsAvailable: [],
      hasAdditionalResults: false,
      additionalResults: [],
      diffDays: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.startEndDaysDifference = this.startEndDaysDifference.bind(this)
  }
  componentDidMount() {
    const date: Date = new Date()
    const year: string = date.toString().split(' ')[3]
    this.setState({startDay: '1', startMonth: '1', startYear: year, endDay: '1', endMonth: '1', endYear: year})
  }
  startEndDaysDifference() {
    const startDate: string = `${this.state.startMonth}-${this.state.startDay}-${this.state.startYear}`
    const endDate: string = `${this.state.endMonth}-${this.state.endDay}-${this.state.endYear}`
    let date1: any = new Date(startDate);
    let date2: any = new Date(endDate);
    let timeDiff: number = Math.abs(date2.getTime() - date1.getTime());
    let diffDays: number = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays
  }
  handleSelectChange(event: any): void {
    if (event.target.id === "day-start") this.setState({startDay: event.target.value})
    else if (event.target.id === "month-start") this.setState({startMonth: event.target.value})
    else if (event.target.id === "year-start") this.setState({startYear: event.target.value})
    else if (event.target.id === "day-end") this.setState({endDay: event.target.value})
    else if (event.target.id === "month-end") this.setState({endMonth: event.target.value})
    else if (event.target.id === "year-end") this.setState({endYear: event.target.value})
  }
  checkRooms(startDate: string, diffDays: number, body): void {
    body.forEach((result: any): void => {
      console.log(result)
      let dateReceived: string[] = result.start_date.split('-')
      dateReceived.shift()
      let dateReversed: string = [...dateReceived, result.start_date.split('-')[0]].join('-')
      let date: Date = new Date(dateReversed)
      let newDate: Date = new Date(date.valueOf())
      newDate.setDate(newDate.getDate() + result.total_nights)
      let day: any = newDate.getDate()
      let month: any = newDate.getMonth() + 1
      let year: any = newDate.getFullYear()
      let formattedDate: string = month + '-' + day + '-' + year
      fetch(`http://localhost:2004/rooms_available/${formattedDate}/${diffDays - result.total_nights}`)
        .then((res: any): void => res.json()
          .then((body: any): void => {
            if (body.length > 0) {
              this.setState({hasAdditionalResults: true})
              this.setState({additionalResults: [...this.state.additionalResults, ...body]})
            }
            this.checkRooms(formattedDate, diffDays - result.total_nights, body)
          }))
    })
  }
  handleSubmit(): void {
    this.setState({isSubmitted: true})
    this.setState({additionalResults: []})
    this.setState({hasAdditionalResults: false})
    const startDate: string = `${this.state.startMonth}-${this.state.startDay}-${this.state.startYear}`
    const endDate: string = `${this.state.endMonth}-${this.state.endDay}-${this.state.endYear}`
    let diffDays: number = this.startEndDaysDifference()
    fetch(`http://localhost:2004/rooms_available/${startDate}/${diffDays}`)
      .then((res: any): void => {
        res.json()
        .then((body: any) => {
          console.log(body)
          console.log(typeof body)
          this.setState({roomsAvailable: body})
          this.checkRooms(startDate, diffDays, body)
        })
      })
  }
  render() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    const persons = [1, 2, 3, 4, 5, 6, 7, 8]
    const years = []
    for (let i: number = 2018; i < 2050; i++) {
      years.push(i)
    }
    return(
      <div id="booking">
        <span>Arrival</span>
        <div id="start">
          <select className="safari_only" id="month-start" onChange={this.handleSelectChange}>
            {months.map((month: string, index: number): any => (
              <option key={month.toLowerCase()} value={index + 1}>{month}</option>
            ))}
          </select>
          <select className="safari_only" id="day-start" onChange={this.handleSelectChange}>
            {days.map((day: number, index: number): any => (
              <option key={day.toString()} value={index + 1}>{day}</option>
            ))}
          </select>
          <select className="safari_only" id="year-start" onChange={this.handleSelectChange}>
            {years.map((year: number, index: number): any => (
              <option key={year.toString()} value={year.toString()}>{year}</option>
            ))}
          </select>
          <select className="safari_only" id="persons" onChange={this.handleSelectChange}>
            {persons.map((person: number): any => (
              <option key={person.toString()} value={person.toString()}>{person}</option>
            ))}
          </select>
        </div>
        <span>Departure</span>
        <div id="end">
          <select className="safari_only" id="month-end" onChange={this.handleSelectChange}>
            {months.map((month: string, index: number): any => (
              <option key={month.toLowerCase()} value={index + 1}>{month}</option>
            ))}
          </select>
          <select className="safari_only" id="day-end" onChange={this.handleSelectChange}>
            {days.map((day: number, index: number) => (
              <option key={day.toString()} value={index + 1}>{day}</option>
            ))}
          </select>
          <select className="safari_only" id="year-end" onChange={this.handleSelectChange}>
            {years.map((year: number): any => (
              <option key={year.toString()} value={year.toString()}>{year}</option>
            ))}
          </select>
        </div>
        <img id="submit-button" onClick={this.handleSubmit} src="https://www.dropbox.com/s/mowwiz0k3s7dkco/arrow.png?raw=1" width="60px" height="60px" />
        {
          this.state.isSubmitted &&
            <div className="booking-options">
              {
                this.state.roomsAvailable.map((room: any, index: number): any => (
                  <div key={index}>
                    <span>{room.start_date}</span>
                    <span>{room.total_nights}</span>
                    <div className="room-available">
                      <img src={room.images} width="300px" height="200px" />
                      <span style={{fontStyle: 'italic', color: '#414141', padding: '15px 13px'}}>{room.address}</span>
                    </div>
                  </div>
                ))
              }
            </div>
        }
        {
          this.state.hasAdditionalResults &&
          <div id="additional-options">
            {
              this.state.additionalResults.map((room: any, index: number): any => (
                <div key={index}>
                  <span>{room.start_date}</span>
                  <span>{room.total_nights}</span>
                  <div className="room-available">
                    <img src={room.images} width="300px" height="200px" />
                    <span style={{fontStyle: 'italic', color: '#414141', padding: '15px 13px'}}>{room.address}</span>
                  </div>
                </div>
              ))
            }
          </div>
        }
      </div>
    )
  }
}
