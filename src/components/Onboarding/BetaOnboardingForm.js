import React, {Component, PropTypes} from 'react';


import {connect} from 'react-redux'; 

@connect(
  state => ({value: ''})
)

export default class BetaOnboardingForm extends Component {
    static propTypes = { 
      currentState: PropTypes.string,
      value: PropTypes.string
    }

     constructor(props) {
      super(props);
      this.state = {
       value: 'Hello!'
      };

      // Bind callback methods to make `this` the correct context.
      this.handleChange = this.handleChange.bind(this);
    }


    getInitialState() {
      return {value: 'Hello!'};
    }

    handleChange(event) {
      console.log(event.target.value);
      this.setState({value: event.target.value});
    }

    render() {
    const {
      currentState
    } = this.props; 

    var value = this.state.value;
    const divStyle = {
      color: 'white', 
    };

    switch(currentState) {
      case '1':
        return (
          <div id="registration" className="container-4">
            <div id="emailBlock">
                    <input type="input" id="email" value={this.state.value} onChange={this.handleChange} ref="email" onfocus="this.placeholder = ''" 
                    onblur="this.placeholder = 'Email'" placeholder="Email" />
                    <button id="sendButton"  className="icon" >
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

    return ( <div> a {currentState} b </div> );
  }
}

