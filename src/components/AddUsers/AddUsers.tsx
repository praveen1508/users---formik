import React, { useEffect, useState } from 'react'
import { UserModel } from '../../utils/Interfaces/UserModel'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';
import './AddUsers.scss';

export const AddUsers = () => {
  const [userData,setUserData]= useState<UserModel> ();
  const fetchUserData = async () => {
    const response = await fetch('http://localhost:3000/users');
    const data: UserModel[] = await response.json();
    setUserData(data[0]);
  }
  
  useEffect(() => {
    fetchUserData();
  },[]);

  const onSubmit = (values: UserModel) => {
    console.log(values);
  }

  const isNameExists = async (value: string) => {
    const response = await fetch('http://localhost:3000/users');
    const data: UserModel[] = await response.json();
    //False shows Error, so return false if the name exists
    console.log('sdfew'+data.some((user) => user.name === value));
    return data.some((user) => user.name === value)? false : true;
  }

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Min 3 Chars').required('Field is Required').test('Unique Name','Name Already Exists',  (value) => isNameExists(value)),
    age: Yup.number().max(50, 'Max Value is 50').required('Field is Required'),
    gender: Yup.string().min(3, 'Min 3 Chars').required('Field is Required'),
  })

  return (
    userData &&
    <Formik initialValues={userData} onSubmit={onSubmit} validationSchema={validationSchema}>
      <Form>
        <div>
          Name:
          <Field name='name' type="text"></Field>
          <div className='error-msg'>
          <ErrorMessage name='name'></ErrorMessage>
          </div>
        </div>
        <div>
          Age
          <Field name='age' type="number" max="20"></Field>
        </div>
        <div>
          Gender:
          <Field name='gender' type="text"></Field>
        </div>
        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  )
}

export default AddUsers