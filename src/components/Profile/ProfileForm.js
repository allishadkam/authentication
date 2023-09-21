import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">enter email</label>
        <input type="password" id="new-password" />
      </div>
      <div className={classes.action}>
        <button>forget password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
