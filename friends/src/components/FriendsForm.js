import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

//formSchema
    const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field."),
    email: yup.string().email(),
    age: yup.number(),

  });


const FriendsForm = () => {

 //states   
    const [users, setUsers]= useState([]);

    const [isLoading, setIsLoading] = useState({
            loading:true,
});

    const [formState, setFormState] = useState({
    name:'',
    age:'',
    email:'',
    id:''
})

    const [errors, setErrors]= useState(
    {
        name:'',
        age:'',
        email:'',
        id:''
    }
)

const [buttonDisabled, setButtonDisabled]= useState(true);

//Functions
    const submitForm = e =>{
        e.preventDefault();

        localStorage.setItem('name', formState.name);
        localStorage.setItem('email', formState.email);
        localStorage.setItem('age', formState.age);
        localStorage.setItem('id', formState.id);

        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                setUsers(res.data); // get just the form data from the REST api

              // reset form if successful
                setFormState({
                    name:'',
                    age:'',
                    email:'',
                    id:''
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
                    Name:
                      <input 
                        type="text" className="input name"
                        value = {formState.name}
                        onChange = {inputChange}
                        name= "name"
                        data-cy="name"            
                        />
                    
                </label>
                <label>
                    Age:
                      <input 
                        type="text" className="input age" id='age'
                        value = {formState.age}
                        onChange = {inputChange}
                        name= "age"
                        data-cy="age"            
                        />
                </label>

                <label>
                Email:
                    <input 
                        type="email" className="input email"
                        value = {formState.email}
                        onChange={inputChange}
                        name="email"
                        data-cy="email"
                    />

                </label>
    <pre>{JSON.stringify(users, null, 2)}</pre>

                <button type="submit" disabled={buttonDisabled} button-cy="button">Submit</button>   
                
            </form>
        </div>
    )
}
export default FriendsForm;