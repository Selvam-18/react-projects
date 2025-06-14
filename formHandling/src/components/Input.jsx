export default function Input({label, id, error, ...props}) {
    return(
    <div className="control no-margin">
        <label htmlFor={id}>{label}</label>
        <input 
            id={id} 
            {...props}
            // type="email" 
            // name="email" 
            // onBlur={() =>handleBlur('email')}
            // value={inputValues.email} 
            // onChange={(event)=> handleInput('email', event.target.value)}
        />
        <div className="control-error"> {<p>{error}</p>} </div>
    </div>
    )
}