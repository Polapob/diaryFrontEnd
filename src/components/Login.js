import react, { useState } from "react";
import { render } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
//import { useHistory } from 'react-router-dom';
function Login(props) {
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const url = "/login";
  const [isClick, setIsClick] = useState(false);
  const navigate = useNavigate();

  const postData = async (url) => {
    axios
      .post(
        url,
        { email: getEmail.toLowerCase(), password: getPassword },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setIsClick(true);
        console.log("finish");
        navigate("/");
      })
      .catch((err) => {
        // console.log(err.toJSON());
        console.log(err);
        if (err.response) {
          setIsClick(true);
          console.log(err.response.data);
          setMessage(err.response.data);
        } else {
          setMessage("");
        }
      });
  };
  const loginHandler = () => {
    postData(url);
  };

  return (
    <div className="bg-sky-100">
      <div className="flex flex-col justify-center h-1/2 py-10 mb-80">
        <div className="flex flex-col justify-center items-center">
          <div className="box-border border-2 border-teal-500 w-full">
            <div className="flex flex-col justify-center items-center">
              <div className="box-border border-2 border-teal-500 sm:px-[6rem]">
                <div className="text-6xl sm:text-8xl my-12 text-center">
                  Login
                </div>
                <div className="text-xl my-4 text-center box-border bg-red-600 text-white sm:mx-16">
                  {message}
                </div>
                <div className="flex flex-row justify-center items-center box-border border-2">
                  <div className="flex flex-col space-y-2 items-center md:text-[20px]">
                    <div>Email</div>
                    <div>Password</div>
                  </div>
                  <div className="flex flex-col space-y-2 items-center md:text-[20px] md:justify-start  md:px-1">
                    <div>:</div>
                    <div>:</div>
                  </div>
                  <div className="flex flex-col space-y-2 items-center my-2 px-2 md:my-3 sm:py-2 md:py-3">
                    <input
                      className="box-border border-[1px] border-black md:my-1"
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    ></input>
                    <input type="password"
                      className="box-border border-[1px] border-black"
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    ></input>
                  </div>
                </div>

                <div className="flex flex-row justify-center items-center">
                  <div className="box-border border-2 w-auto my-4">
                    <div className="flex flex-row justify-center items-center space-x-12">
                      <button
                        className="box-border border-2 border-black bg-teal-500 rounded-xl my-2 w-32 h-12 text-lg text-center py-2"
                        onClick={loginHandler}
                      >
                        Login
                      </button>
                      <div className="box-border border-2 border-black bg-teal-500 rounded-xl my-2 py-3 px-4 text-sm text-center">
                        Forgot Password?
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center space-x-6  px-2">
                  <div className="my-4 px-2">Don't have any account?</div>
                  <Link to="/signUp">
                    <div className="box-border border-2 border-black bg-teal-500 rounded-xl my-2 w-28 h-12 text-center text-lg py-2">
                      Sign Up
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-40"></div>
    </div>
  );
}
export default Login;
