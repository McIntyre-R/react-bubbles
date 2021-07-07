import React, {useState} from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [state, setState] = useState({
    credentials: {
      username: "",
      password: ""
    }
  })

  const handleChanges = e => {
    setState({
      credentials: {
        ...state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };
  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", state.credentials)
      .then(res => {
        console.log(res)
        localStorage.setItem("token", JSON.stringify(res.data.payload));
        props.history.push("/bubblepage");
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
        <form onSubmit={login}>
          <input
            type="text"
            name="username"
            value={state.credentials.username}
            onChange={handleChanges}
          />
          <input
            type="password"
            name="password"
            value={state.credentials.password}
            onChange={handleChanges}
          />
          <button>Log in</button>
        </form>
    </div>
  );
};

export default Login;