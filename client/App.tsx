import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Booking from './Booking.jsx'
import Header from './Header.jsx'
import BookingWidget from './BookingWidget.jsx'
import AddListing from './AddListing.jsx'
import RemoveListing from './RemoveListing.jsx'

interface AppInterface {

}

interface AppState {
  booking: boolean;
  removing: boolean;
  adding: boolean;
}

class App extends React.Component<AppInterface, AppState> {
  constructor(props: AppInterface) {
    super(props)
    this.state = {
      booking: true,
      removing: false,
      adding: false
    }
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect(event: any): void {
    if (event.target.id === "become-host") {

    } else if (event.target.id === "remove-listing") {

    }
  }
  render() {
    return (
      <div>
        <Header />
        <BookingWidget handleSelect={this.handleSelect}/>
        { this.state.booking && <Booking /> }
        { this.state.adding && <AddListing /> }
        { this.state.removing && <RemoveListing /> }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
