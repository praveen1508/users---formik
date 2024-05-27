import { useEffect, useState } from 'react'
import { UserModel } from '../../utils/Interfaces/UserModel'

const AddUsers = () => {
  const [userdetails,setUserDetails] = useState<UserModel>();


  const [name,setName] = useState<string>();
  const [age,setAge] = useState<number>();
  const [gender,setGender] = useState<string>();

  useEffect(() => {
    console.log(userdetails);
  },[userdetails])

  const addUserDetails = () => {
    // setUserDetails({name,age,gender});
    // console.log(userdetails);The value won't reflecting immediately instead it will reflect in next render ,
    //To reflect immediately we need to use useEffect.
  }

  return (
    <>
        <div>Add User Details</div>
        <div>
          Name : 
          <input type='text' value={name}  onChange={(event) => setName(event.target.value)}/>
        </div>
        <div>
          Age: 
          <input type='text' value={age} onChange={(event) => setAge(Number(event.target.value))}/>
        </div>
        <div>
          Gender:
          <input type='text' value={gender} onChange={(event) => setGender(event.target.value)}/>
        </div>
        <button onClick={() => addUserDetails()}> Submit</button>
    </>
  )
}

export default AddUsers;
