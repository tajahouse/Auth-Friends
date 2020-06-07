import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';


//formSchema
    const formSchema = yup.object().shape({
    userName: yup.string().required("Name is a required field."),
    password: yup.string().min(6, "Password must be 6 characters long"),
    rememberMe: yup.boolean().oneOf([true, false]),

  });


const Login = () => {

 //states   
    const [users, setUsers]= useState([]);

    const [formState, setFormState] = useState({
    userName:"",
    password:"",
    rememberMe: false
})

    const [errors, setErrors]= useState(
    {
        userName:"",
        password:"",
        rememberMe: false
    }
)

const [buttonDisabled, setButtonDisabled]= useState(true);

//Functions
    const submitForm = e =>{
        e.preventDefault();

        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                setUsers(res.data); // get just the form data from the REST api

                // reset form if successful
                setFormState({
                userName: "",
                password:"",
                rememberMe:false
                });
            })
            .catch(err => console.log(err.response));
    };


//Form Validations
const validateChange = e =>{
    // Reach will allow us to "reach" into the schema and test only one part.
yup
    .reach(formSchema, e.target.name)
    .validate(e.target.value)
    .then(valid => {
    setErrors({
        ...errors,
        [e.target.name]: ""
    });
})
.catch(err => {
    setErrors({
        ...errors,
        [e.target.name]: err.errors[0]
    });
    });
}

useEffect(()=> {
    formSchema.isValid(formState).then(valid =>{
        setButtonDisabled(!valid)
    });
}, [formState]);

const inputChange = e => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };

    validateChange(e);
    setFormState(newFormData);
  };
    
    return (
        <div className="login-form">
            <form className="form-wrapper" onSubmit={submitForm}>
                <label>
                    Username:
                      <input 
                        type="text" className="username"
                        value = {formState.userName}
                        onChange = {inputChange}
                        name= "userName"
                        data-cy="userName"            
                        />
                </label>

                <label>
                Password:
                    <input 
                        type="password" className="password"
                        value = {formState.password}
                        onChange={inputChange}
                        name="password"
                        data-cy="password"
                    />
                {errors.password.length> 0 ? (
                    <p className="error" error-cy="password">{errors.password}</p>
                ): null}
                </label>
    <pre>{JSON.stringify(users, null, 2)}</pre>
                <label>
                    <input name="rememberMe" checked={formState.rememberMe} onChange={inputChange} type="checkbox"/>
                    Remember Me
                </label>
                <button type="submit" disabled={buttonDisabled} button-cy="button">Submit</button>   

                
            </form>
        </div>
    )
}

export default Login;