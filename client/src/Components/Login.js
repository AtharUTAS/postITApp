import {
  Container,
  Row,
  Col,
} from "reactstrap";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {user,msg,isLogin} = useSelector(state => state.users)
  useEffect(()=>{
     if(isLogin)
      navigate("/")
    else
      navigate("/login")
  },[isLogin])

  //Retrieve the current value of the state and assign it to a variable.
  //Create the state variables
  
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch(); //every time we want to call an action, make an action happen
  //declares a constant variable named navigate and assigns it the value returned by the useNavigate() hook
  // Handle form submission
  const loginHandler = () => {
    const userData = {email,password}
    dispatch(login(userData))
  };

 

  return (
    <Container fluid>
      <Row>
        <Col lg="6">
          {/* Execute first the submitForm function and if validation is good execute the handleSubmit function */}
          <form className="div-form">
            <div className="appTitle"></div>
            <section>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email..."
                 onChange ={(e) => setemail(e.target.value)}
               
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password..."
                  onChange ={(e) => setpassword(e.target.value)}
                />
              </div>
             
              <button type='button' onClick={()=>loginHandler()}  color="primary" className="button">
                Sign In
              </button>
            </section>
          </form>
        </Col>
        <Col className="columndiv2" lg="6"></Col>
      </Row>
      <Row>
        <div>
          <h3>Server Response: {msg} </h3>
          
        </div>
      </Row>
    
    </Container>
  );
};

export default Login;
