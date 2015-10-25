import React, {Component, PropTypes} from 'react';
import { lookupEmail, setIsArtist, setIsLabel, registerUser } from 'redux/modules/earlyUser';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const ENTER_EMAIL = 0; // Enter Email step
const IS_ARTIST = 1; // Answer yes or no If you are an artist
const IS_LABEL = 2; // 'Answer yes or no if you are a label';
const SHOW_CURRENT_POSITION = 3; // 'Show the current position';
const INVITE_FRIEND = 4; // Enter friend\'s email';
const SHOW_CURRENT_POSITION_AFTER_FRIEND_BEING_ADDED = 'after inviting a friend show position';


@connect(
  state => ({earlyUser: state.earlyUser}),
  dispatch => bindActionCreators({ lookupEmail, setIsArtist, setIsLabel, registerUser }, dispatch)
)
export default class BetaOnboardingForm extends Component {
  static propTypes = {
    currentState: PropTypes.string,
    step: PropTypes.string,
    earlyUser: React.PropTypes.shape({
      phase: React.PropTypes.number,
      earlyUser: React.PropTypes.object,
      registering: React.PropTypes.bool
    }),
    lookupEmail: React.PropTypes.func,
    setIsArtist: React.PropTypes.func,
    setIsLabel: React.PropTypes.func,
    registerUser: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
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
    // todo(bortignon@): the update of the state is async
    // the value of earlyUser.isLabel will not be up to date when hitting the
    // next line.
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
    switch (earlyUser.phase) {
      case ENTER_EMAIL:
        return (
          <div id="registration" className="container-4">
            <div id="emailBlock">
              <input type="email" id="email" value={this.state.email} onChange={this.handleChangeEmail} ref="email" placeholder="Email" />
              <button className={activeSubmitEmailButton} id="sendButton" onClick={this.submitEmail}>
                {!earlyUser.registering && <span id="send" className="basic-pictosimply-right"></span>}
                {earlyUser.registering && <span id="loading" className="basic-pictoloader iconSpin"></span>}
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
    return ( <div></div> );
  }
}
