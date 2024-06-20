import React, { useEffect, useRef, useState } from 'react'
import { UserModel } from '../../utils/Interfaces/UserModel'
import { ErrorMessage, Field, FieldArray, Form, Formik, FormikProps, useFormikContext, validateYupSchema } from 'formik'
import * as Yup from 'yup';
import './AddUsers.scss';


export const AddUsers = () => {
  const nameRef = useRef(null);
  const [isEmailEntered, setisEmailEntered] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserModel>();
  const fetchUserData = async () => {
    const response = await fetch('http://localhost:3000/users');
    const data: UserModel[] = await response.json();
    data[0].contactDetails = [{
      phoneNo: '',
      emailId: ''
    }]
    setUserData(data[0]);
  }
  const FormObserver = () =>{
    const {values :{name,contactDetails}} = useFormikContext<UserModel>();
    useEffect(()=> {
      contactDetails?.forEach(element => {
        const isEmailNotNull = element.emailId === '' ? false : true;
        setisEmailEntered(isEmailNotNull);
      });
   
    },[contactDetails]) 
    return null;
  } 
  useEffect(() => {
    fetchUserData();
  }, []);


  const onSubmit = (values: UserModel) => {
    changeNameBgColor();
    console.log(values);
  }

  const isNameExists = async (value: string) => {
    const response = await fetch('http://localhost:3000/users');
    const data: UserModel[] = await response.json();
    //False shows Error, so return false if the name exists
    return data.some((user) => user.name === value) ? false : true;
  }

  const changeNameBgColor = () => {
    if(nameRef.current) {
      (nameRef.current as HTMLElement).style.backgroundColor = 'red';
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Min 3 Chars').required('Field is Required').test('Unique Name', 'Name Already Exists', (value) => isNameExists(value)),
    age: Yup.number().max(50, 'Max Value is 50').required('Field is Required'),
    gender: Yup.string().min(3, 'Min 3 Chars').required('Field is Required'),
    contactDetails: Yup.array().of(Yup.object().shape({
      phoneNo: isEmailEntered ? Yup.string() : Yup.string().required('Field is Required'),
      emailId: Yup.string().email('Enter a Valid Email')
    }))
  })

  const onGenderChange = (e: any,{setFieldValue,setFieldError,handleChange}:FormikProps<UserModel>) => {
    handleChange(e);
      if(e?.target.value == 'maless') {
      setFieldError('gender','Invalid Gender');
    }  
  }
  // const validateGender = ({values,setFieldError}:FormikProps<UserModel>) => {
 
  return (
    userData &&
    <Formik initialValues={userData} onSubmit={onSubmit} validationSchema={validationSchema}  validateOnChange={false} >
      {(formikProps) => (
        <Form>
          <FormObserver/>
          <div ref={nameRef}>
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
            <Field name='gender' type="text"  onChange={(e: any) => onGenderChange(e,formikProps)}  ></Field>
            <div className='error-msg'>
              <ErrorMessage name='gender'></ErrorMessage>
            </div>
          </div>
          <FieldArray name='contactDetails'>
            {
              (props) => (
                <>
                  {formikProps.values.contactDetails?.map((contactDetails, index) => (
                    <div key={index}>
                      <div>
                        Phone No
                        <Field name={`contactDetails.${index}.phoneNo`} type="text" ></Field>
                        <div className='error-msg'>
                          <ErrorMessage name={`contactDetails.${index}.phoneNo`}></ErrorMessage>
                        </div>
                      </div>
                      <div>
                        Email Id
                        <Field name={`contactDetails.${index}.emailId`} type="email"></Field>
                        <div className='error-msg'>
                          <ErrorMessage name={`contactDetails.${index}.emailId`}></ErrorMessage>
                        </div>
                      </div>
                      <button onClick={() => props.remove(index)}> - </button>
                    </div>

                  ))}
                  <button onClick={() => props.push({
                    phoneNo: null,
                    emailId: null
                  })}>Add</button>
                </>
              )
            }
          </FieldArray>
          <button type='submit'>Submit</button>
        </Form>
      )}
    </Formik>
  )
}

export default AddUsers