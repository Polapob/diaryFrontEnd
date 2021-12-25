import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function SignUp(props) {
  const [getUserName, setUserName] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getConfirmPassword, setConfirmPassword] = useState("");
  const register_url = "/register";
  const [getError, setError] = useState("");
  const navigate = useNavigate();
  const postData = (url) => {
    axios
      .post(url, {
        userName: getUserName,
        email: getEmail,
        password: getPassword,
      })
      .then((res) => {
        console.log(res);
        //console.log()
        navigate("/Login");
      })
      .catch((err) => {
        // console.log(err);
        //console.log(err.response.data);
        setError(err.response.data);
      });
  };
  const onClickHandler = () => {
    postData(register_url);
  };
  return (
    <div>
      <div className="bg-sky-100 pb-[120px]">
        <div className="flex flex-col justify-center sm:py-10 pb-80">
          <div className="flex flex-col justify-center items-center">
            <div className="box-border border-2 border-teal-500 w-full">
              <div className="flex flex-col justify-center items-center">
                <div className="sm:box-border sm:border-2 sm:border-teal-500">
                  <div className="sm:text-8xl my-12 text-center text-6xl">
                    Sign Up
                  </div>
                  <div className="text-center sm:text-2xl text-white bg-red-600 my-4 text-[18px] sm:mx-0 mx-4">
                    {getError}
                  </div>
                  <div className="flex flex-row box-border border-2 border-red-500 justify-center items-center space-x-2 sm:px-[4rem]">
                    <div className="flex flex-col justify-start text-center py-1 sm:text-2xl">
                      <div className="my-1">Username</div>
                      <div className="my-1">Email</div>
                      <div className="my-1">Password</div>
                      <div className="my-1"> Confirm Password</div>
                    </div>
                    <div className="flex flex-col justify-center items-center py-1 sm:text-2xl">
                      <div className="my-1">:</div>
                      <div className="my-1">:</div>
                      <div className="my-1">:</div>
                      <div className="my-1">:</div>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-[8px] sm:space-y-[14px]">
                      <input
                        className="box-border border-[1px] border-black"
                        onChange={(event) => {
                          setUserName(event.target.value);
                        }}
                      />
                      <input
                        className="box-border border-[1px] border-black"
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                      />
                      <input
                        className="box-border border-[1px] border-black "
                        type="password"
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                      />
                      <input
                        className="box-border  border-[1px] border-black"
                        type="password"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row justify-center items-center">
                    <div className=" my-4">
                      <div className="flex flex-row justify-center items-center space-x-12">
                        <button
                          className="box-border border-2 border-black bg-teal-500 rounded-xl my-2 w-28 h-12 text-lg text-center py-2"
                          onClick={onClickHandler}
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-center items-center space-x-6 sm:space-x-12">
                    <div className="my-4 sm:text-[20px]">
                      Already have any account?
                    </div>
                    <Link to="/Login">
                      <div className="box-border border-2 border-black bg-teal-500 rounded-xl my-2 w-28 h-12 text-center text-lg py-2 sm:text-[20px]">
                        Login
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
    </div>
  );
}
export default SignUp;
