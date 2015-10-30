import React, {Component, PropTypes} from 'react';
import { lookupEmail, setIsArtist, setIsLabel, registerUser, confirmUser } from 'redux/modules/earlyUser';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const ENTER_EMAIL = 0; // Enter Email step
const IS_ARTIST = 1; // Answer yes or no If you are an artist
const IS_LABEL = 2; // 'Answer yes or no if you are a label';
const SHOW_CREATING_ACCOUNT_ANIMATION = 3;
const SHOW_CURRENT_POSITION = 4; // 'Show the current position';
const INVITE_FRIEND = 5; // Enter friend\'s email';
const SHOW_CONFIRMATION_LANDING = 6;
const ACCOUNT_CONFIRMATION_COMPLETED = 7;
const ACCOUNT_CONFIRMATION_FAILED = 8;
const SHOW_CURRENT_POSITION_AFTER_FRIEND_BEING_ADDED = 'after inviting a friend show position';


@connect(
  state => ({earlyUser: state.earlyUser}),
  dispatch => bindActionCreators({ lookupEmail, setIsArtist, setIsLabel, registerUser, confirmUser}, dispatch)
)
export default class BetaOnboardingForm extends Component {
  static propTypes = {
    currentState: PropTypes.string,
    step: PropTypes.string,
    earlyUser: PropTypes.shape({
      phase: PropTypes.number,
      earlyUser: PropTypes.object,
      registering: PropTypes.bool
    }),
    lookupEmail: PropTypes.func,
    setIsArtist: PropTypes.func,
    setIsLabel: PropTypes.func,
    registerUser: PropTypes.func,
    confirmUser: PropTypes.func,
    auth: PropTypes.string,
    id: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordIsValid: false,
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
    this.isAnArtistHandler = this.isAnArtistHandler.bind(this);
    this.isALabelHandler = this.isALabelHandler.bind(this);
    this.registerUserHandler = this.registerUserHandler.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    if (this.props.auth) {
      this.props.earlyUser.phase = SHOW_CONFIRMATION_LANDING;
      this.state.passwordIsValid = false;
    }
    console.log('Component did mount' + this.props.earlyUser.phase);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.earlyUser.phase === IS_LABEL) {
      // You are now in the registration email phase.
      this.registerUserHandler();
    }
  }

  submitEmail() {
    if (this.validateEmail(this.state.email)) {
      this.props.lookupEmail(this.state);
    }
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


  /*
   * Validate password length
   */
  handlePasswordChange(event) {
    console.log(event.target.value);
    this.setState({password: event.target.value,
      passwordIsValid: (event.target.value.length >= 8)});
  }

  submitPassword() {
    // Send authcode and user Id
    this.props.confirmUser(this.props.auth, this.props.id, this.state.password);
  }

  handleChangeFriendEmail(event) {
    console.log('friend: ' + event.target.value);
    this.setState({friendEmail: event.target.value,
      friendEmailIsValid: this.validateEmail(event.target.value)});
    console.log(this.validateEmail(event.target.value));
  }

  isAnArtistHandler(isArtist) {
    console.log('IS ARTIST');
    this.props.setIsArtist(isArtist);
  }
  isALabelHandler(isLabel) {
    this.props.setIsLabel(isLabel);
  }
  registerUserHandler() {
    console.log('Register user handler');
    this.props.registerUser(this.props.earlyUser.earlyUser);
  }
  inviteMoreFriendHandler() {
    this.setState({step: INVITE_FRIEND});
  }
  validateEmail(email) {
    const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }
  render() {
    const {earlyUser} = this.props;
    const activeSubmitEmailButton = 'icon' + (this.state.emailIsValid ? ' activeSubmitEmailButton' : '');
    const activeSubmitFriendEmailButton = 'icon' + (this.state.friendEmailIsValid ? ' activeSubmitEmailButton' : '');
    const activeSubmitPasswordButton = 'icon' + (this.state.passwordIsValid ? ' activeSubmitEmailButton' : '');
    console.log(earlyUser.phase + ' phase in render');
    switch (earlyUser.phase) {
      case ENTER_EMAIL:
        return (
          <div>
            <div id="registration" className="container-4">
              <div id="emailBlock">
                <input type="email" id="email" value={this.state.email} onChange={this.handleChangeEmail} ref="email" placeholder="Email" />
                <button className={activeSubmitEmailButton} id="sendButton" onClick={this.submitEmail}>
                  {!earlyUser.registering && <span id="send" className="basic-pictosimply-right"></span>}
                  {earlyUser.registering && <span id="loading" className="basic-pictoloader iconSpin"></span>}
                </button>
              </div>
            </div>
            (this.state.emailAlreadyExists && <div id="validationError"> Email already exists </div>)
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
      case SHOW_CREATING_ACCOUNT_ANIMATION:
        return (<div> </div>);
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
      case SHOW_CONFIRMATION_LANDING:
        return (
          <div>
            <div id="registration" className="container-4">
              <div id="emailBlock">
                <input type="password" id="email" value={this.state.password} onChange={this.handlePasswordChange} ref="password" placeholder="Password" />
                <button id="sendFriendButton" className={activeSubmitPasswordButton} onClick={this.submitPassword.bind(this)}>
                  {!earlyUser.registering && <span id="send" className="basic-pictosimply-right"></span>}
                  {earlyUser.registering && <span id="loading" className="basic-pictoloader iconSpin"></span>}
                </button>
              </div>
            </div>
            {!this.state.passwordIsValid && <div id="validationError"> Password has to be at least 8 characters long. </div>}
          </div>
        );
      case ACCOUNT_CONFIRMATION_COMPLETED:
        return (
          <div id="position">
            You are all set!
            <br />
            You are waiting now in queue at position <span className="highlight">1234</span>
             Want to skip the queue?
            <br /><span id="inviteFriend" onClick={this.inviteMoreFriendHandler.bind(this)}> Invite your friends! </span>
          </div>);
      case ACCOUNT_CONFIRMATION_FAILED:
        return (
            <div id="position">
            There has been an error.. WOOOPS. <br />
            {earlyUser.confirmationError.error.message}
            </div>
          );
      default:
        return ( <div></div> );
    }
  }
}
