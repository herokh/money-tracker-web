import { useEffect, useState } from "react";
import Login from "./modules/auth/Login";
import { getAuth } from "firebase/auth";
import TransactionContainer from "./modules/transactions/TransactionContainer";
import useFirebase from "./hooks/useFirebase";
import Button from "./components/Button";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useFirebase();
  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user != null);
      setLoading(false);
    });
  }, [isLoggedIn, setIsLoggedIn]);

  const onSignInSuccess = (userCredential) => {
    setIsLoggedIn(userCredential != null);
    alert("WELCOME K." + userCredential.user.email);
  };

  const onSignInError = (error) => {
    setIsLoggedIn(false);
    alert(error);
  };

  const logout = async (e) => {
    const auth = getAuth();
    await auth.signOut();
    alert("BYE BYE");
  };

  const appStyled = {
    nav: {
      backgroundColor: "#000",
      color: "#fff",
    },
    innerNav: {
      display: "flex",
      alignItems: "center",
      height: "42px",
    },
  };

  return (
    <div>
      <div className="mb-2" style={appStyled.nav}>
        <div className="container" style={appStyled.innerNav}>
          <img src="/logo.jpg" alt="logo" style={{ width: "35px" }} />
          {isLoggedIn && (
            <div className="ml-auto">
              <Button name="Logout" onClick={logout} />
            </div>
          )}
        </div>
      </div>
      <div className="App container">
        <div className="content p-4">
          {loading && <div>Loading...</div>}
          {!loading &&
            (isLoggedIn ? (
              <div>
                <TransactionContainer />
              </div>
            ) : (
              <Login
                onSignInSuccess={onSignInSuccess}
                onSignInError={onSignInError}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
