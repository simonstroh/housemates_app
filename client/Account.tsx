import * as React from 'react'
import * as ReactDOM from 'react-dom'

export default class Account extends React.Component<any, any> {
  state: any
  props: any
  constructor(props: any) {
    super(props)
    this.state = {

    }
  }
  handleSubmit() {

  }
  render() {
    return(
      <div id="account-dropdown" onMouseLeave={this.props.displaySettings}>
        <form id="login" onSubmit={this.handleSubmit}>
          Email Address
          <input type="text" />
          Password
          <input type="password" />
        </form>
        <a href="#">Create an Account</a>
        <a href="#">Sign-in</a>
      </div>
    )
  }
}
