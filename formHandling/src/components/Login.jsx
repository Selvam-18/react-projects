import { useRef, useState } from "react";

export default function Login() {

  const [emailInvalid, setEmailInvalid] = useState(false);
  const email = useRef();
  const password = useRef();


  function handleSubmit(event) {
    event.preventDefault();
    console.log("working")
    const inputEmail = email.current.value;
    const inputPassword = password.current.value;

    const validEmail = inputEmail && inputEmail.includes('@')
    if(!validEmail) {
      setEmailInvalid(true)
      return;
    }

    setEmailInvalid(false)
    console.log(inputEmail, inputPassword)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            // type="email" 
            name="email" 
            ref={email}
          />
          <div className="control-error">
            {emailInvalid && <p>Enter valid email</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            type="password" 
            name="password" 
            ref={password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
