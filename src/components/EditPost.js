import react, { useState, useEffect, useRef } from "react";
import MemoModal from "./MemoModal";
import axios from "axios";
import DeleteModal from "./DeleteModal";
function EditPost(props) {
  const [isClick, setIsClick] = useState(false);
  const [isModal, setModal] = useState(false);
  const [prevData, setPrevData] = useState({});
  const [isDelete,setIsDelete] = useState(false);
  const handleOnDelete = ()=>{
    setIsDelete(true);
  }
  const handleOnClick = () => {
    setIsClick(true);
  };
  const ref = useRef();
  const documentID = props.documentID;
  const getOldData = (docId) => {
    axios.get(`/getMemo/${docId}`).then((res) => {
      setPrevData(res.data.data);
      setModal(true);
    });
  };
  const deleteData = (docId) => {
    axios
      .delete(`/deleteMeMo/${docId}`,{ data: props.userData })
      .then((res) => {
        console.log(res);
        props.toggleCheckState();
        setIsClick(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isClick && ref.current && !ref.current.contains(e.target)) {
        setIsClick(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isClick]);
  return (
    <div className="relative" ref={ref}>
      {!isClick && (
        <button onClick={handleOnClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute h-6 w-6 top-0 right-0"
            fill="None"
            viewBox="0 0 24 24"
            stroke="#006D77"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              fill="#006D77"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </button>
      )}
      {isClick && (
        <div className="">
          <div className="absolute right-0 top-0 flex-col justify-center items-center">
            <button
              className="box-border border-[3px] w-[100px] text-center border-teal-600"
              onClick={() => {
                getOldData(documentID);
                setIsClick(false);
                //deleteData(documentID);
              }}
            >
              Edit
            </button>
            <button
              className="box-border border-[3px] w-[100px] text-center border-teal-600 border-t-0"
              onClick={() => {
                //deleteData(documentID);
                handleOnDelete();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
      {isModal && (
        <MemoModal
          editing={true}
          initialTopic = {prevData.topic}
          initialText = {prevData.text}
          oldData={prevData}
          documentID = {documentID}
          userData={props.userData}
          toggleCheckState={props.toggleCheckState}
          setClose={setModal}
          isClose={isModal}
          close={() => {
            setModal(false);
          }}
        />
      )}
      {isDelete && <DeleteModal documentID = {documentID} userData = {props.userData} toggleCheckState = {props.toggleCheckState} setIsClick = {setIsClick} setIsDelete = {setIsDelete}/>}
    </div>
  );
}
export default EditPost;
