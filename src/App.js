import { Component } from "react";
import { initializeApp } from "firebase/app";
import TransactionList from "./components/TransactionList";
import Login from "./components/Login";
import { getAuth } from "firebase/auth";

class App extends Component {
  constructor(props) {
    super(props);
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
    };

    initializeApp(firebaseConfig);

    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) =>
      this.setState({
        isLoggedIn: user != null,
      })
    );
  }

  onSignInSuccess(userCredential) {
    this.setState({
      isLoggedIn: userCredential != null,
    });
    alert("WELCOME K." + userCredential.user.email);
  }

  onSignInError(error) {
    this.setState({
      isLoggedIn: false,
    });
    alert(error);
  }

  async logout(e) {
    const auth = getAuth();
    await auth.signOut();
    alert("BYE BYE");
  }

  render() {
    return (
      <div className="App container is-fullheight">
        <div className="content pt-4 pl-3 pr-3">
          {this.state.isLoggedIn ? (
            <div>
              <nav className="has-text-right">
                <button className="button" onClick={e => this.logout(e)}>Logout</button>
              </nav>
              <div>
              <div className="mb-2">
                  <strong className="is-size-2">Money Tracker App</strong>
                  <div className="is-size-4">Internal purpose only.</div>
              </div>
              <div>
                <TransactionList />
              </div>
            </div>
            </div>
          ) : (
            <Login
              onSignInSuccess={this.onSignInSuccess.bind(this)}
              onSignInError={this.onSignInError.bind(this)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
