import React, { useContext, useState } from "react";
import samplePhoto from "../images/bg4.jpg";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

import "./Login.css";

import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext);
  const [loading, setLoading] = useState({ status: false, message: "" });

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading({ status: true, message: "Signing in..." });
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/api/users/login`,
        { email, password }
      );
      if (response.status === 200) {
        localStorage.setItem("Token", response.data.token);
        setIsAuthenticated(true);
        toast.success("You have successfully logged in");
        history.push("/dashboard");
      }
      setLoading({ status: false, message: "" });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occured");
      }
      setEmail("");
      setPassword("");
      setLoading({ status: false, message: "" });
    }
  }

  return (
    <>
      {loading.status && <Loading message={loading.message} />}
      <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src={samplePhoto}
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Sign into your account
                </h5>

                <form onSubmit={handleSubmit}>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    id="formControlLg"
                    required
                    type="email"
                    size="lg"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="formControlLg"
                    type="password"
                    size="lg"
                    value={password}
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <div className="d-grid gap-2">
                    <Button type="submit" variant="warning" size="lg">
                      Log in
                    </Button>
                  </div>
                </form>
                <Link to="/forgot_password">
                  <a className="small text-muted">Forgot password?</a>
                </Link>
                <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                  Don't have an account?{" "}
                  <Link to="/register" style={{ color: "#393f81" }}>
                    Register here
                  </Link>
                </p>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </>
  );
}

export default App;
