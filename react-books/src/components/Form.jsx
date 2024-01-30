import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Form.css'; 

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [alerts, setAlerts] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [FocusState, setFocusState] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFocus = (name) => {
    setFocusState((prevfocusState) => ({ ...prevfocusState, [name]: true }));
  };

  const onFormSubmit = (data) => {
    setRegistrationSuccess(true);
    reset();
  };

  const renderFormField = (labelText, name, rules) => {
    return (
      <div>
        <label htmlFor={name} className="input-label" style={{ textAlign: 'left' }}>
          {labelText}
        </label>
        <br />
        <input
          type={name.includes('password') ? 'password' : 'text'}
          placeholder={labelText}
          id={name}
          className="input-field"
          {...register(name, { ...rules, type: name.includes('password') ? 'password' : 'text' })}
        />
        {errors[name] && errors[name].type === 'required' && (
          <p className="error-message">{`${labelText} is required*`}</p>
        )}
        {errors[name] && errors[name].type === 'minLength' && (
          <p className="error-message">{`${labelText} should have a minimum 3 letters and 1 special character`}</p>
        )}
        {errors[name] && errors[name].type === 'maxLength' && (
          <p className="error-message">{`${labelText} can only have a maximum of 30 characters`}</p>
        )}
        {errors[name] && errors[name].type === 'pattern' && (
          <p className="error-message">{`Enter a valid ${labelText.toLowerCase()}`}</p>
        )}
        {errors[name] && errors[name].type === 'validate' && (
          <p className="error-message">Both Passwords Should match</p>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="registration-container">
        <div className="header-container">
          <img src="https://camo.githubusercontent.com/7798ac9816844b12782b0a86e183dd4029f2070daf2dc3fcd77a1c1138d2ffd7/68747470733a2f2f73332e61702d736f7574682d312e616d617a6f6e6177732e636f6d2f6b616c76692d656475636174696f6e2e6769746875622e696f2f66726f6e742d656e642d7765622d646576656c6f706d656e742f4b616c7669756d2d4c6f676f2e706e67" alt="" />
        </div>
        <div className="main-content">
          {/* <p className="heading">Sign Up now! </p> */}
          {registrationSuccess ? (
            <div className="registration-message">
              <h2 className="registration-success">Registration Successful!</h2>
              <NavLink to="/" className="logo-link">
                <button className='back'> Home</button>
              </NavLink>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onFormSubmit)} className="form-container">
              {renderFormField('Name', 'firstName', {
                required: true,
                minLength: 3,
                maxLength: 30,
              })}
              {renderFormField('Email', 'email', {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
              {renderFormField('Password', 'password', {
                required: true,
                minLength: 10,
                pattern: /.*[\W]+.*/i,
              })}
              {renderFormField('Confirm password', 'password', { 
                validate: (value) => value === watch('password'),
                pattern: /.*[\W]+.*/i,
                required: true,
    
              })}
              <button type="submit" className="submit-button" disabled={false}>
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
