import react from "react";
import DisplayMemos from "./DisplayMemos";
import parse from "html-react-parser";
import EditPost from "./EditPost";

function DisplayMemo(props) {

  const writtenMemoUser = props.data.userName;
  const loginUser = props.userData["userName"];
  const documentID = props.data.documentID;
  const editable = loginUser === writtenMemoUser ? true : false;
  const haveEditDate = props.data.editDate === undefined? false : true;
  const findDate = new Date(haveEditDate? props.data["editDate"] : props.data["date"]).toString();
  //const year = new Date(props.data["date"]).getFullYear().toString();
  const wantDate = findDate.split(" ").slice(1, 4).join(" ");
  console.log("haveEditDate = ",haveEditDate);
  return (
    <div className="container box-border border-2 border-teal-600 lg:w-[60rem] sm:my-4 md:[45rem] sm:[30rem] px-4 py-4 my-6 w-screen xl:w-[80rem]">
      <div className="flex flex-col sm:justify-start items-start sm:space-y-4 sm:px-6 sm:py-2 justify-center sm:h-auto space-y-2 h-auto">
        <div className="flex flex-row justify-between w-full">
          <div> {wantDate}</div>
          {editable && <EditPost postDat userData = {props.userData} documentID = {documentID} writtenMemoUser = {writtenMemoUser} toggleCheckState = {props.toggleCheckState}/>}
          
        </div>
        <div className="">Topic : {props.data.topic}</div>
        <p className="break-all">{parse(props.data.text)}</p>
        {/*<div>Written By {props.data["userName"]}</div>*/}
        <div>Written By {writtenMemoUser}</div>
      </div>
    </div>
  );
}
export default DisplayMemo;
