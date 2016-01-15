import React, {Component, PropTypes} from 'react';
import { lookupEmail, setIsArtist, setIsLabel, registerUser, confirmUser, requestConfirmationEmail, inviteMoreFriend, inviteFriendEmail, loginWithPassword} from 'redux/modules/earlyUser';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const ENTER_EMAIL = 0; // Enter Email step
const IS_ARTIST = 1; // Answer yes or no If you are an artist
const IS_LABEL = 2; // 'Answer yes or no if you are a label';
const SHOW_CREATING_ACCOUNT_ANIMATION = 3;
const SHOW_CURRENT_POSITION = 4; // 'Show the current position';
const INVITE_FRIEND = 5; // Enter friend\'s email';
const SHOW_CONFIRMATION_LANDING = 6;  // when the user open the email link
const ACCOUNT_CONFIRMATION_COMPLETED = 7; // after entering the password
const ACCOUNT_CONFIRMATION_FAILED = 8; // if something went wrong when sending the confirmation email
const EMAIL_ALREADY_EXIST = 9; // When trying to register an already existing email
const CONFIRMATION_EMAIL_REQUESTED_SUCCESSFULLY = 10; // when re requesting an auth code.
const FRIEND_INVITATION_SENT = 11; // when re requesting an auth code.
const LOGIN_WITH_PASSWORD = 12; // show login with password field.
const SOMETHING_WENT_WRONG = -1; // a really big error happend.
const SHOW_CURRENT_POSITION_AFTER_FRIEND_BEING_ADDED = 'after inviting a friend show position';


@connect(
  state => ({earlyUser: state.earlyUser}),
  dispatch => bindActionCreators({ lookupEmail, setIsArtist, setIsLabel, registerUser, confirmUser, requestConfirmationEmail,
    loginWithPassword, inviteMoreFriend, inviteFriendEmail}, dispatch)
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
    requestConfirmationEmail: PropTypes.func,
    inviteFriendEmail: PropTypes.func,
    confirmUser: PropTypes.func,
    inviteMoreFriend: PropTypes.func,
    loginWithPassword: PropTypes.func,
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
    this.inviteMoreFriendHandler = this.inviteMoreFriendHandler.bind(this);
    this.loginWithPasswordHandler = this.loginWithPasswordHandler.bind(this);
  }

  componentWillMount() {
    if (this.props.auth) {
      this.props.earlyUser.phase = SHOW_CONFIRMATION_LANDING;
      this.state.passwordIsValid = false;
    } else {
      this.props.earlyUser.phase = ENTER_EMAIL;
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.earlyUser.phase === IS_LABEL) {
      // You are now in the registration email phase.
      this.registerUserHandler();
    }
  }

  requestConfirmationEmailHandler() {
    this.props.requestConfirmationEmail(this.state.email);
  }

  submitEmail() {
    if (this.validateEmail(this.state.email)) {
      this.props.lookupEmail(this.state);
    }
  }

  submitFriendEmail() {
    if (this.validateEmail(this.state.friendEmail)) {
      this.props.inviteFriendEmail(this.props.earlyUser.earlyUser.id, this.state.friendEmail);
    }
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value,
      emailIsValid: this.validateEmail(event.target.value)});
  }

  /*
   * Validate password length
   */
  handlePasswordChange(event) {
    this.setState({password: event.target.value,
      passwordIsValid: (event.target.value.length >= 6)});
  }

  submitPassword() {
    // Send authcode and user Id
    this.props.confirmUser(this.props.auth, this.props.id, this.state.password);
  }

  handleChangeFriendEmail(event) {
    this.setState({friendEmail: event.target.value,
      friendEmailIsValid: this.validateEmail(event.target.value)});
  }

  loginWithPasswordHandler() {
    this.props.loginWithPassword();
  }

  isAnArtistHandler(isArtist) {
    this.props.setIsArtist(isArtist);
  }
  isALabelHandler(isLabel) {
    this.props.setIsLabel(isLabel);
  }
  registerUserHandler() {
    this.props.registerUser(this.props.earlyUser.earlyUser);
  }
  inviteMoreFriendHandler() {
    this.setState({friendEmail: '',
      friendEmailIsValid: false});
    this.props.inviteMoreFriend();
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
            {this.state.emailAlreadyExists && <div id="validationError"> Email already exists </div>}
          </div>
        );
      case EMAIL_ALREADY_EXIST:
        return (
          <div id="position">
            We already have this email! <br /> You can <a className="smallHighlightedText" onClick={this.requestConfirmationEmailHandler.bind(this)}>Request the confirmation email again</a>
              <br />or <a className="smallHighlightedText" onClick={this.loginWithPasswordHandler.bind(this)}>Login with your password</a>
          </div>);
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
            <br />For now you are still in position <span className="highlight">254</span>.
            <br /><a className="smallHighlightedText" onClick={this.inviteMoreFriendHandler.bind(this)}> Invite your friends!</a>
          </div>
        );
      case SHOW_CURRENT_POSITION:
        return (
          <div id="position">You ve been added in queue at position <span className="highlight">254</span>.
            <br />Thank you, an email has been sent. Please confirm it.
            <br /> Want to skip the queue?
            <br /><a className="smallHighlightedText" onClick={this.inviteMoreFriendHandler.bind(this)}> Invite your friends! </a>
          </div>);
      case INVITE_FRIEND:
        return (
          <div>
            <div id="registration" className="container-4">
              <div id="inviteFriendBlock">
                <input type="email" id="friendEmail" value={this.state.friendEmail} onChange={this.handleChangeFriendEmail} ref="friendEmail" placeholder="Friend's Email" />
                <button id="sendFriendButton" className={activeSubmitFriendEmailButton} onClick={this.submitFriendEmail.bind(this)}>
                    {!earlyUser.registering && <span id="send" className="basic-pictosimply-right"></span>}
                    {earlyUser.registering && <span id="loading" className="basic-pictoloader iconSpin"></span>}
                </button>
              </div>
            </div>
            <div>
              {earlyUser.confirmationError && <div id="validationError"> {earlyUser.confirmationError.error.message} </div>}
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
            {!this.state.passwordIsValid && <div id="validationError"> Password has to be at least 6 characters long. </div>}
          </div>
        );
      case ACCOUNT_CONFIRMATION_COMPLETED:
        return (
          <div id="position">
            You are all set!
            <br />
            You are waiting now in queue at position <span className="highlight">254</span>
            <br />Want to skip the queue?
            <br /><span id="inviteFriend" onClick={this.inviteMoreFriendHandler.bind(this)}> Invite your friends! </span>
          </div>);
      case ACCOUNT_CONFIRMATION_FAILED:
        return (
            <div id="position">
            There has been an error.. WOOOPS. <br />
            {earlyUser.confirmationError.error.message}
            </div>
          );
      case CONFIRMATION_EMAIL_REQUESTED_SUCCESSFULLY:
        return (
            <div id="position">
            <br />We just sent the confirmation email. <br />
            You are currently in queue at position <span className="highlight">254</span>.
            <br /> Want to skip the queue?
            <br /><span id="inviteFriend" onClick={this.inviteMoreFriendHandler.bind(this)}> Invite your friends! </span>
            </div>
          );
      case FRIEND_INVITATION_SENT:
        return (
            <div id="position">
            <br />We just sent the invite to your friend.<br />
            You are currently in queue at position <span className="highlight">254</span>.
            <br /> Want to get in faster?
            <br /><span id="inviteFriend" onClick={this.inviteMoreFriendHandler.bind(this)}> Invite more friends! </span>
            </div>
          );
      case SOMETHING_WENT_WRONG:
        return (
            <div id="position">
            Something went wrong, please email us.<br />
            </div>
        );
      case LOGIN_WITH_PASSWORD:
        return (
          <div>
            <div id="registration">
              <div className="container-4">
                <div id="emailBlock">
                  <input type="email" id="email" value={this.state.email} onChange={this.handleChangeEmail} ref="email" placeholder="Email" />
                </div>
              </div>
              <div className="container-4 container-5">
                <div id="emailBlock">
                  <input type="password" id="email" value={this.state.password} onChange={this.handlePasswordChange} ref="password" placeholder="Password" />
                  <button className={activeSubmitEmailButton} id="sendButton" onClick={this.submitEmail}>
                    {!earlyUser.registering && <span id="send" className="basic-pictosimply-right"></span>}
                    {earlyUser.registering && <span id="loading" className="basic-pictoloader iconSpin"></span>}
                  </button>
                </div>
              </div>
            </div>
            {this.state.emailAlreadyExists && <div id="validationError"> Email already exists </div>}
          </div>
          );
      default:
        return ( <div></div> );
    }
  }
}
