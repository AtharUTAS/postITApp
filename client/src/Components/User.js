import { useSelector } from "react-redux";
import userimg from "../Images/user.png";
import { useEffect, useState } from "react";
import axios from "axios";


const User = () => {
 const{user} = useSelector(state=> state.users)
 const [ip,setIp] = useState(null)
 const [country,setCountry] = useState(null)
 const [region,setRegion] = useState(null)

 async function getGeoLocationData(){
  try{
    const response = await  axios.get(`${process.env.REACT_APP_LOCATION_APIKEY}`)
    setIp(response.data.ip)
    setCountry(response.data.location.country)
    setRegion(response.data.location.region)
  }
  catch(error){
    console.log()
  }
 }

useEffect(()=>{
  getGeoLocationData()
},[])

  return (
    <div>
      <img src={userimg} className="userImage" alt=""/>
      <p>
        <h5>{user?.name}</h5>
        <h5>{user?.email}</h5>
        <h5>{ip}</h5>
        <h5>{country}</h5>
        <h5>{region}</h5>
      </p>
    </div>
  );
};

export default User;
