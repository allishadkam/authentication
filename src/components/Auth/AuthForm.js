import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/Auth-contecxt";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const AuthCTX = useContext(AuthContext);

  const enterdEmail = useRef();
  const enterdPassword = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const Email = enterdEmail.current.value;
    const password = enterdPassword.current.value;

    setIsLoading(true);
    if (isLogin) {
      try {
        const response = await fetch(
          "https://meeting.iran.liara.run/api/User/login",
          {
            method: "POST",
            body: JSON.stringify({
              email: Email,
              password: password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setIsLoading(false);

        const data = await response.json();

        if (response.ok) {
          alert(data.Message || "welcome");
          //console.log(data.data.token);
          AuthCTX.login(data.data.token);
        } else {
          throw new Error(data.Message);
        }
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        const response = await fetch(
          "https://meeting.iran.liara.run/api/User/logUp",
          {
            method: "POST",
            body: JSON.stringify({
              email: Email,
              password: password,
              repeatPassword: password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setIsLoading(false);

        const data = await response.json();

        if (response.ok) {
          alert(data.Message);
        } else {
          throw new Error(data.Message);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={enterdEmail} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={enterdPassword} />
        </div>
        <div className={classes.actions}>
          {isLoading ? (
            <p>loading ...</p>
          ) : (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
