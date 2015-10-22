import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'; 

const ENTER_EMAIL = 'Enter Email step';
const IS_ARTIST = 'Answer yes or no If you are an artist'
const IS_LABEL = 'Answer yes or no if you are a label'
const SHOW_CURRENT_POSITION = 'Show the current position';
const INVITE_FRIEND = 'Enter friend\'s email';
const SHOW_CURRENT_POSITION_AFTER_FRIEND = 'after inviting a friend show position';

@connect(
  state => ({email: ''})
)

export default class BetaOnboardingForm extends Component {
    static propTypes = { 
      currentState: PropTypes.string,
      email: PropTypes.string
    }

    constructor(props) {
      super(props);
      this.state = {
       step: props.step,
       email: ''
      };
      // Bind callback methods to make `this` the correct context.
      this.handleChange = this.handleChange.bind(this);
      this.submitEmail = this.submitEmail.bind(this);
    }
 
    submitEmail(event){
       this.setState({step: '2'});
       console.log(this.state)
    }

    handleChange(event) {
      console.log(event.target.value)
      console.log(this.validateEmail(event.target.value));
      this.setState({email: event.target.value});
    }

    validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }
    render() {

    const divStyle = {
      color: 'white', 
    };

    switch(this.state.step) {
      case '1':
        return (
          <div id="registration" className="container-4">
            <div id="emailBlock">
                    <input type="email" id="email" value={this.state.email} onChange={this.handleChange} ref="email" onfocus="this.placeholder = ''" 
                    onblur="this.placeholder = 'Email'" placeholder="Email" />
                    <button id="sendButton" onClick={this.submitEmail} className="icon" >
                      <span id="send" className="basic-pictosimply-right"></span>
                      <span id="loading" className="basic-pictoloader iconSpin"></span>
                    </button>
            </div>
          </div>
        );
      case '2':
        return ( <div>2</div> );
      case '3':
        return ( <div>3</div> );
      case '4':
        return ( <div>4</div> );
    }

    return ( <div> a {this.state.step} b </div> );
  }
}

