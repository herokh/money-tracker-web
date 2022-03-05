import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  submitLogin(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        this.props.onSignInSuccess(userCredential);
      })
      .catch((error) => {
        this.props.onSignInError(error);
      });
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={(e) => this.submitLogin(e)}>
          <div>
            <input
              type={"email"}
              name={"email"}
              placeholder={"enter your email"}
            />
          </div>
          <div>
            <input
              type={"password"}
              name={"password"}
              placeholder={"enter your password"}
            />
          </div>
          <div>
            <button>submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
