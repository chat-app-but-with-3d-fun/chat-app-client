import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
//import { createSlice } from "@reduxjs/toolkit";


// export default function () {
const Register = (props) => {

   const { register, handleSubmit, formState: { errors } } = useForm();
   const onSubmit = data => console.log(data);
   //props.updateAction(data);
  //  console.log(data);
   console.log(errors);


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="First name" {...register("First name", {required: true, maxLength: 80})} />
      <input type="text" placeholder="Last name" {...register("Last name", {required: true, maxLength: 100})} />
      <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
      <input type="text" placeholder="Password" {...register("Password", {})} />
      <input type="text" placeholder="Confirm password" {...register("Confirm password", {})} />

      <input type="submit" />
    </form>
  );
}

export default Register;

// Connect your component with redux
// connect(({ firstName, lastName }) => ({ firstName, lastName }), updateAction)(Register);