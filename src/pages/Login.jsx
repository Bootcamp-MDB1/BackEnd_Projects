import React, { useState, useEffect } from "react";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import firebaseApp from "../config/firebaseConfig";
import Header from "../components/Header";
import { Form, Button, Row, Col, Alert, Container } from 'react-bootstrap'
import { useNavigate, Link } from "react-router-dom";
import { GoogleButton } from "react-google-button";

const Login = () => {
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate()
  const errorDict = {
    "auth/wrong-password": "Password anda salah!",
    "auth/internal-error": "Password harus diisi!",
    "auth/invalid-email": "Email harus diisi!",
    "auth/user-not-found": "User tidak ditemukan!"
  };


  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle, userGoogle, , ] = useSignInWithGoogle(auth);

  useEffect(() => {
      if(user || userGoogle !== undefined)
      navigate('/home', { replace: true });
  }, [user, userGoogle, navigate])

  const loginHandler = () => {
    signInWithEmailAndPassword(credentials.email, credentials.password);
    console.log(auth.currentUser);
  };


  return (
    <div>
      <Header/>
      <Container className="d-flex justify-content-center align-items-center mt-5" style={{height: 'auto', width: '30vw'}}>
        <Row style={{ width: '30vw'}}>
          <Col className={"d-flex justify-content-center flex-column  rounded p-5 bg-secondary"} style={{ height: "auto" }}>
            <h1 className="mb-3 ">Login</h1>

            <Form>
              <Form.Group className="mb-3 fs-5" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email address"
                  onKeyDown={(e) => e.key === "Enter" && loginHandler()}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} 
                  value={credentials.email}/>
              </Form.Group>
              
              <Form.Group className="mb-3 fs-5" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                  onKeyDown={(e) => e.key === "Enter" && loginHandler()}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  value={credentials.password}/>
              </Form.Group>

              <div className="d-flex justify-content-center ml-2 mt-4 mb-3">
                <Button disabled={loading} variant="primary" type="button" onClick={loginHandler}>
                  {loading ? "Loading..." : "Login"}
                </Button>
                <Button className="mx-2" variant="danger" type="button" onClick={() => signInWithGoogle()}>
                  Sign in with Google</Button>
              </div>
              {/* <GoogleButton  className="justify-content-start mb-3 rounded" onClick={() => signInWithGoogle()}/> */}
            </Form>
          </Col>
          {error && (
                <Alert variant="danger">{error && errorDict[error.code]}</Alert>
              )}
        </Row>
      </Container>

    </div>
  )
}

export default Login

