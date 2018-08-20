import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Account from './Account.jsx'

interface HeaderState {
  account: boolean;
  bookings: boolean;
  search: boolean;
  searchstring: string;
}

export default class Header extends React.Component<any, HeaderState> {
  constructor(props: any) {
    super(props)
    this.state = {
      account: false,
      bookings: false,
      search: false,
      searchstring: 'Search'
    }
    this.handleMouseOver = this.handleMouseOver.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    this.setState({searchstring: e.target.value})
  }
  handleMouseOver() {
    this.setState({account: true})
  }
  handleMouseLeave() {
    this.setState({account: false})
  }
  render() {
    return(
      <div id="header">
        <div id="logo">Housemates</div>
        <div>
          <ul className="header-items">
            <li onClick={this.handleMouseOver} style={{display: 'flex', justifyContent: 'center'}}>
              Account
              {
                this.state.account && <Account displaySettings={this.handleMouseLeave}/>
              }
            </li>
            <li>Bookings</li>
            <li>
              <div id="search">
                <img src="search.svg" width="20px" height="20px" />
                <input onChange={this.handleChange} type="text" placeholder="City, State, or ZIP Code" value={this.state.searchstring}>
                </input>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
