import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Label from "../../components/Label";

const Login = (props) => {
  const submitLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        props.onSignInSuccess(userCredential);
      })
      .catch((error) => {
        props.onSignInError(error);
      });
  };

  return (
    <div className="Login">
      <Label name="Login" />
      <form onSubmit={(e) => submitLogin(e)}>
        <div>
          <Label name="Email Address" />
          <Input
            type={"email"}
            name={"email"}
            placeholder={"enter your email"}
          />
        </div>
        <div>
          <Label name="Password" />
          <Input
            type={"password"}
            name={"password"}
            placeholder={"enter your password"}
          />
        </div>
        <div>
          <div className="mt-2">
            <Button name="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
