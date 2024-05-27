import React from 'react'
import { UserModel } from '../../utils/Interfaces/UserModel'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';
import './AddUsers.scss';

export const AddUsers = () => {
  const intialValues: UserModel = {
    name: 'Ram',
    age: 20,
    gender: 'Male'
  }

  const onSubmit = (values: UserModel) => {
    console.log(values);
  }

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Min 3 Chars').required('Field is Required'),
    age: Yup.number().max(50, 'Max Value is 50').required('Field is Required'),
    gender: Yup.string().min(3, 'Min 3 Chars').required('Field is Required'),
  })

  return (
    <Formik initialValues={intialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
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