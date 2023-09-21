import { useRef, useState } from "react";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const [isEmailEntered, setIsEmailEntered] = useState(false);
  const enterdEmail = useRef();
  const enteredPassword = useRef();
  const enteredCode = useRef();

  const forgetpasshandler = async () => {
    setIsEmailEntered(true);
    try {
      const response = await fetch(
        "https://meeting.iran.liara.run/api/User/forget-password",
        {
          method: "POST",
          body: JSON.stringify({ email: enterdEmail.current.value }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      alert(data.data);
      console.log(data);
    } catch (error) {
      alert(error);
    }
  };

  const onsubmithandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://meeting.iran.liara.run/api/User/check-code-forget-password",
        {
          method: "POST",
          body: JSON.stringify({
            email: enterdEmail.current.value,
            code: enteredCode.current.value,
            newPassword: enteredPassword.current.value,
            repeatNewPassword: enteredPassword.current.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      alert(data.data);
      console.log(data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form className={classes.form} onSubmit={onsubmithandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">enter email</label>
        <input type="email" id="new-password" ref={enterdEmail} />
      </div>
      <div className={classes.action}>
        {!isEmailEntered && (
          <button onClick={forgetpasshandler}>forget password</button>
        )}
      </div>
      {isEmailEntered && (
        <div className={classes.control}>
          <label htmlFor="new-password">enter sent code</label>
          <input type="password" id="new-password" ref={enteredCode} />
          <label htmlFor="new-password">enter new password</label>
          <input type="password" id="new-password" ref={enteredPassword} />
          {isEmailEntered && <button>confirm</button>}
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
