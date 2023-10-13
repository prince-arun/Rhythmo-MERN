import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const login = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "https://rhythmo-render-backend.onrender.com/api/users/login",
        user
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      dispatch(HideLoading());
      console.log(error);
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3"></Popover.Header>
      <Popover.Body>
        <p>
          <b>EMAIL : </b>steve@gmail.com
        </p>
        <p>
          <b>PASSWORD : </b>Steve@9600
        </p>
      </Popover.Body>
    </Popover>
  );
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-5 w-96 p-5">
        <h1 className="text-3xl font-bold text-secondary">Welcome Back</h1>
        <hr />
        <input
          type="text"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className="primary bg-primary" onClick={login}>
          Login
        </button>
        <Link to="/register" className="text-secondary underline">
          Not yet Registered ? Click Here To Signup
        </Link>
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
          <Button className="border bg-gray" variant="success">
            Click to View Test Credentials
          </Button>
        </OverlayTrigger>
      </div>
      <div>
        <img
          className="h-[500px]"
          src="https://img.freepik.com/premium-photo/3d-rendering-3d-illustration-red-black-music-note-icon-isolated-white-background-song-melody-tune-symbol-concept_640106-443.jpg?w=2000"
          alt=""
        />
      </div>
    </div>
  );
}

export default Login;
