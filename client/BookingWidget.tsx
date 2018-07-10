import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface WidgetInterface {
  handleSelect: any;
}

interface WidgetState {
  isSelected: boolean;
}

export default class BookingWidget extends React.Component<WidgetInterface, WidgetState> {
  constructor(props) {
    super(props)
    this.state = {
      isSelected: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }
  handleClick() {
    this.setState({isSelected: true})
  }
  handleMouseLeave() {
    this.setState({isSelected: false})
  }
  render() {
    return(
      <div id="widget">
        <img onClick={this.handleClick} src="widget.svg" width="auto" height="28px" />
        {
          this.state.isSelected &&
            <ul className="widget-dropdown" onMouseLeave={this.handleMouseLeave}>
              <li id="become-host" onClick={this.props.handleSelect}>Become a Host</li>
              <li id="remove-listing" onClick={this.props.handleSelect}>Remove a Listing</li>
            </ul>
        }
      </div>
    )
  }
}
