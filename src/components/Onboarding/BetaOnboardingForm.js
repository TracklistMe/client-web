import React, {Component, PropTypes} from 'react';
// const ENTER_EMAIL = 'Enter Email step';
const IS_ARTIST = 'Answer yes or no If you are an artist';
const IS_LABEL = 'Answer yes or no if you are a label';
const SHOW_CURRENT_POSITION = 'Show the current position';
const INVITE_FRIEND = 'Enter friend\'s email';
const SHOW_CURRENT_POSITION_AFTER_FRIEND_BEING_ADDED = 'after inviting a friend show position';

export default class BetaOnboardingForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    currentState: PropTypes.string,
    step: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      step: props.step,
      email: '',
      emailIsValid: false,
      friendEmail: '',
      friendEmailIsValid: false,
      isArtist: false,
      isLabel: false
    };
    // Bind callback methods to make `this` the correct context.
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.submitFriendEmail = this.submitFriendEmail.bind(this);
    this.handleChangeFriendEmail = this.handleChangeFriendEmail.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
  }

  submitEmail(event) {
    if (this.validateEmail(this.state.email)) {
      this.setState({step: IS_ARTIST});
    }
    console.log(this.props.onSubmit(this.state));
    console.log(event);
  }

  submitFriendEmail(event) {
    if (this.validateEmail(this.state.friendEmail)) {
      this.setState({step: SHOW_CURRENT_POSITION_AFTER_FRIEND_BEING_ADDED});
    }
    // SUBMIT REDUX
    this.state.friendEmail = '';
    this.state.friendEmailIsValid = false;
    console.log(event);
  }

  handleChangeEmail(event) {
    console.log(event.target.value);
    this.setState({email: event.target.value,
      emailIsValid: this.validateEmail(event.target.value)});
    console.log(this.validateEmail(event.target.value));
  }

  handleChangeFriendEmail(event) {
    console.log('friend: ' + event.target.value);
    this.setState({friendEmail: event.target.value,
      friendEmailIsValid: this.validateEmail(event.target.value)});
    console.log(this.validateEmail(event.target.value));
  }

  isAnArtistHandler(isArtist) {
    this.setState({isArtist: isArtist, step: IS_LABEL});
  }
  isALabelHandler(isLabel) {
    this.setState({isLabel: isLabel, step: SHOW_CURRENT_POSITION});
    console.log(this.state);
  }

  inviteMoreFriendHandler() {
    this.setState({step: INVITE_FRIEND});
  }
  validateEmail(email) {
    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }
  render() {
    const activeSubmitEmailButton = 'icon' + (this.state.emailIsValid ? ' activeSubmitEmailButton' : '');
    const activeSubmitFriendEmailButton = 'icon' + (this.state.friendEmailIsValid ? ' activeSubmitEmailButton' : '');
    switch (this.state.step) {
      case '1':
        return (
          <div id="registration" className="container-4">
            <div id="emailBlock">
              <input type="email" id="email" value={this.state.email} onChange={this.handleChangeEmail} ref="email" placeholder="Email" />
              <button className={activeSubmitEmailButton} id="sendButton" onClick={this.submitEmail}>
                <span id="send" className="basic-pictosimply-right"></span>
                <span id="loading" className="basic-pictoloader iconSpin"></span>
              </button>
            </div>
          </div>
        );
      case IS_ARTIST:
        return (
          <div id="registration" className="container-4">
            <div id="artistBlock">
              <span className="question"> Are you an Artist? </span>
              <button id="yesArtist" onClick={this.isAnArtistHandler.bind(this, true)} className="icon">
                <span id="send" className="basic-pictocheck"></span>
              </button>
              <button id="noArtist" onClick={this.isAnArtistHandler.bind(this, false)} className="icon">
                <span id="send" className=" basic-pictocross"></span>
              </button>
            </div>
          </div>
        );
      case IS_LABEL:
        return (
          <div id="registration" className="container-4">
            <div id="labelBlock">
              <span className="question"> Are you a Label? </span>
              <button id="yesLabel" onClick={this.isALabelHandler.bind(this, true)} className="icon">
                <span id="send" className="basic-pictocheck"></span>
              </button>
              <button id="noLabel" onClick={this.isALabelHandler.bind(this, false)} className="icon">
                <span id="send" className=" basic-pictocross"></span>
              </button>
            </div>
          </div>
        );
      case SHOW_CURRENT_POSITION_AFTER_FRIEND_BEING_ADDED:
        return (
          <div id="positionFriend">An email has been sent to your friend.
            <br />Once confirmed, your beta access will be closer!
            <br />For now you are still in position <span className="highlight">1234</span>.
            <br /><span id="inviteMoreFriend" onClick={this.inviteMoreFriendHandler.bind(this)}> Invite more friends! </span>
          </div>
        );
      case SHOW_CURRENT_POSITION:
        return (
          <div id="position">You ve been added in queue at position <span className="highlight">1234</span>.
            <br />Thank you, an email has been sent. Please confirm it.
            <br /> Want to skip the queue?
            <br /><span id="inviteFriend" onClick={this.inviteMoreFriendHandler.bind(this)}> Invite your friends! </span>
          </div>);
      case INVITE_FRIEND:
        return (
          <div id="registration" className="container-4">
            <div id="inviteFriendBlock">
              <input type="email" id="friendEmail" value={this.state.friendEmail} onChange={this.handleChangeFriendEmail} ref="friendEmail" placeholder="Friend's Email" />
              <button id="sendFriendButton" className={activeSubmitFriendEmailButton} onClick={this.submitFriendEmail.bind(this)}>
                <span id="sendFriend" className="basic-pictosimply-right"></span>
                <span id="loadingFriend" className="basic-pictoloader iconSpin"></span>
              </button>
            </div>
          </div>);

      default:
    }
    return ( <div> a {this.state.step} b </div> );
  }
}
