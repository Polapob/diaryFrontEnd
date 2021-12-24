import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import MemoModal from "./components/MemoModal";
import DisplayMemos from "./components/DisplayMemos";
function MainPage(props) {
  const [userData, setUserData] = useState({});
  const [isLogin, setLogin] = useState(false);
  const [openNewModel, setOpenNewModel] = useState(false);
  const [checkState, setCheckState] = useState(false);
  const [counter,setCounter] = useState(0);
  const [isAdd,setAdd] = useState(false);
  const [isDelete ,setDelete] = useState(true);

  const toggleAdd = () =>{
    setAdd(!isAdd);
  }
  const toggleDelete = () =>{
    setDelete(!isDelete);
  }
  const timer = () => {
    if (isLogin){
      setInterval(() => {
        axios.post("http://localhost:4000/refreshToken",{},{withCredentials:true}).then(res=>{
          console.log(res.status)
        }).catch((err)=>{
          console.log(err);
        })
      }, 30000);
      return () => clearInterval(timer);
    }
    
  };
  const toggleCheckState = () => {
    setCheckState(!checkState);
  };
  const postNewMemoHandler = () => {
    axios
      .post("http://localhost:4000/checkLogin", {}, { withCredentials: true })
      .then((res) => {
        //console.log(res.status);
        setOpenNewModel(true);
      })
      .catch((err) => {
        console.log(err);
        setOpenNewModel(false);
        alert("Please Login First!");
      });
  };
  const onClickHandler = () => {
    axios
      .post("http://localhost:4000/logout", {}, { withCredentials: true })
      .then((res) => {
        //console.log(res);
        setUserData({});
        setLogin(false);
      })
      .catch((err) => {
        console.log(err.toJSON());
      });
  };
  const checkAuth = async () => {
    console.log(userData);
    axios
      .post("http://localhost:4000/checkLogin", {}, { withCredentials: true })
      .then((res) => {
        setUserData(res.data);
        setLogin(true);
      })
      .catch((err) => {
        //console.log(err);
        setLogin(false);
        console.log("access token is expired");
        setUserData({});
        console.clear();
      });
  };
  useEffect(() => {
    checkAuth();
  }, [isLogin]);

  useEffect(() => {
    return timer();
  }, [isLogin]);
  return (
    <div className="bg-sky-100">
      <div className="flex flex-col justify-between items-center">
        <div className="box-border border-2 border-teal-500 w-full mb-2">
          <div className="flex flex-row justify-between items-center">
            <div>
              <div className="sm:mx-20 flex flex-row text-xl items-center px-2">
                <div className="sm:text-3xl sm:px-2 sm:py-2 text-[18px] py-2">
                  Welcome
                </div>
                <div className="text-[18px] px-[1px]">:</div>
                <div className="sm:text-3xl sm:px-2 px-1 text-[18px]">
                  {typeof userData["userName"] === "undefined"
                    ? "anonymous"
                    : userData["userName"]}
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center sm:space-x-4 space-x-[0.5rem] px-2">
              <button onClick={onClickHandler} className = {`${isLogin ? "visible" : "invisible" }`}>Logout</button>
              {<Link to="/Login">
                <div className={`sm:mr-20 ${!isLogin ? "visible" : "invisible" }`} >Login</div>
              </Link>}
            </div>
          </div>
        </div>
        <button
          className="box-border border-2 sm:px-[10rem] md:px-[15rem] lg:text-3xl lg:px-[20rem] px-[5rem] py-1 my-2 bg-teal-500 font-Bubblegum text-2xl text-teal-800 2xl:px-[30rem]"
          onClick={postNewMemoHandler}
        >
          Post new memo
        </button>
        {openNewModel && (
          <MemoModal
            toggleCheckState={toggleCheckState}
            toggleAdd ={toggleAdd}
            checkState={checkState}
            setCheckState={setCheckState}
            userData={userData}
            setClose={setOpenNewModel}
            isClose={openNewModel}
            initialTopic = ""
            initialText = ""
            close={() => {
              setOpenNewModel(false);
            }}
          />
        )}
        <DisplayMemos
          userData={userData}
          toggleCheckState={() => {
            toggleCheckState();
          }}
          checkState={checkState}
          setCheckState={setCheckState}
        />
        {console.log(checkState)}
      </div>
    </div>
  );
}
export default MainPage;
