import React, { useState, useEffect } from "react";
import LocalizedStrings from "react-localization";
import { string } from "yup";

import "./Form.scss";
const Form = () => {
  let strings = new LocalizedStrings({
    en: {
      email: "Email is invalid",
      password: "Password is invalid",
    },
    it: {
      email: "vuoi il tuo uovo oggi?",
      password: "Uovo sodo",
    },
  });
  strings.setLanguage("it");
  const intialValues = { email: "", password: "" };

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    console.log(formValues);
  };

  //input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  //form validation handler
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (values.email == "") {
      errors.email = strings.email;
    }
    if (!values.email) {
      errors.email = strings.email;
    } else if (!regex.test(values.email)) {
      errors.email = strings.email;
    }

    if (!values.password) {
      errors.password = strings.password;
    } else if (values.password.length < 4) {
      errors.password = strings.password;
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);

  return (
    <div className="container">
      <h1>Sign in to continue</h1>
      {Object.keys(formErrors).length === 0 && isSubmitting && (
        <span className="success-msg">Form submitted successfully</span>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleChange}
            className={formErrors.email && "input-error"}
          />
          {formErrors.email && (
            <span className="error">{formErrors.email}</span>
          )}
        </div>

        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleChange}
            className={formErrors.password && "input-error"}
          />
          {formErrors.password && (
            <span className="error">{formErrors.password}</span>
          )}
        </div>

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Form;
