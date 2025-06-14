import Input from './Input.jsx';
import { isEmail, isNotEmpty, hasMinLength} from '../util/validation.js'
import { useInput } from '../hooks/useInput.js'

export default function Login() {

  // const [userEmail, setUserEmail] = useState('')
  // const [] = useState('')

  function handleSubmit(event) {
    event.preventDefault();
    console.log("working")

    if(hasEmailError, hasPasswordError) {
      return
    }

    console.log(emailValue, passwordValue)
    // event.target.reset()
    // setEmailValue('')
    handleEmailReset()
    handlePasswordReset()
  }

  // function handleEmail(event) {
  //   setUserEmail(event.target.value);
  // }

  // const [inputValues, setInputValues] = useState({
  //   email: '',
  //   password: ''
  // });

  // const [editedInput, setEditedInput] = useState({
  //   email: false,
  //   password: false
  // })

  // const isEmailInvalid = editedInput.email && !isEmail(inputValues.email);
  // const passwordInvalid = editedInput.password && !hasMinLength(inputValues.password, 6);

  // function handleInput(identifier, value) {
  //   setInputValues( (prev) =>({
  //      ...prev,
  //      [identifier]: value
  //   }))

  //   setEditedInput( prev => ({
  //     ...prev,
  //     [identifier]: false
  //   }))
  // }

  // function handleBlur(identifier) {
  //   setEditedInput(prev =>({
  //     ...prev,
  //     [identifier]: true
  //   }))
  // }


  const { 
    inputValue: emailValue, 
    handleInput: handleEmail,
    handleBlur: handleEmailBlur, 
    hasError: hasEmailError,
    handleReset: handleEmailReset
   } = useInput('', (emailValue) => isNotEmpty(emailValue) && isEmail(emailValue))

   const {
    inputValue: passwordValue,
    handleInput: handlePassword,
    handleBlur: handlePasswordBlur,
    hasError: hasPasswordError,
    handleReset: handlePasswordReset
   } = useInput('', (passwordValue) => hasMinLength(passwordValue, 6))

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        {/* <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            name="email" 
            onBlur={() =>handleBlur('email')}
            value={inputValues.email} 
            onChange={(event)=> handleInput('email', event.target.value)}
          />
          <div className="control-error">
            {isEmailInvalid && <p>Enter valid email</p>}
          </div>
        </div> */}

        <Input 
          label="email"
          id="email"
          type="email"
          name="email"
          onBlur={handleEmailBlur}
          value={emailValue} 
          onChange={handleEmail}
          error={hasEmailError && 'Enter a valid email'}
        />

        {/* <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            type="password" 
            name="password" 
            value={inputValues.password}
            onChange={(event)=> handleInput('password', event.target.value)}
          />
        </div> */}

        <Input 
          label="password"
          id="password"
          type="password"
          name="password"
          onBlur={handlePasswordBlur}
          value={passwordValue} 
          onChange={handlePassword}
          error={hasPasswordError && 'Enter valid Password'}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat" type='reset'>Reset</button>
        <button className="button" type='submit' >Login</button>
      </p>
    </form>
  );
}
