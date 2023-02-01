import React, { useState, useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../config/firebaseConfig";
import Header from "../components/Header";
import { Form, Button, Row, Col, Spinner, Container, Alert } from 'react-bootstrap'
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const auth = getAuth(firebaseApp);
  const navigate = useNavigate()
  const errorDict = {
    "auth/wrong-password": "Password anda salah!",
    "auth/internal-error": "Password harus diisi!",
    "auth/invalid-email": "Email harus diisi!",
    "auth/user-not-found": "User tidak ditemukan!"
  };
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
      if(user !== undefined)
      navigate('/login', { replace: true });
        signOut(auth)
  }, [user, auth, navigate]);

  const registerHandler =  async () => {
    await createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    ) 
  }

  return (
    <div>
      <Header/>
      <Container className="d-flex justify-content-center align-items-center mt-4" style={{height: 'auto', width: '30vw'}}>
        <Row style={{ width: '50vw'}}>
          <Col className="d-flex justify-content-center flex-column rounded p-4 bg-secondary" style={{ height: "auto" }}>
            <h1 className="mb-3">Register</h1>

            <Form>
              <Form.Group className="mb-3 fs-5" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control className="form-control" type="username" placeholder="Enter username"
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && registerHandler()}
                  value={credentials.username}/>
              </Form.Group>

              <Form.Group className="mb-3 fs-5" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control className="form-control" type="email" placeholder="Enter email address"
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && registerHandler()}
                  value={credentials.email}/>
              </Form.Group>

              <Form.Group className="mb-3 fs-5" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control className="form-control" type="password" placeholder="Password"
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && registerHandler()}
                  value={credentials.password}/>
              </Form.Group>

              <div className="d-flex justify-content-end mb-3">
                <Button disabled={loading} className="" variant="primary" type="button" onClick={registerHandler}>
                  {/* {loading && 
                  (<Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>)
                  } */}
                  {loading ? "Loading..." : "Register"}
                </Button>
              </div>
           
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

export default Register

