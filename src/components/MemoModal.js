import react, { useState, useEffect, useMemo } from "react";
import bold from "./bold.png";
import italic from "./italic-text.png";
import underline from "./underline.png";
import picIcon from "./pictureIcon.png";
import axios from "axios";
import "./useCss.css";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function MemoModal(props) {
  const [text, setText] = useState(props.initialText);
  //const [isSend, setIsSend] = useState("");
  const [topic, setTopic] = useState(props.initialTopic);
  //console.log(props.oldData["text"]);

  const [pictureUrl, setPictureUrl] = useState("");

  const handleTopic = (event) => {
    setTopic(event.target.value);
  };
  const handleOnClick = () => {
    const date = new Date();
    var data = {};
    console.log(props.editing);
    if (props.editing === undefined) {
      console.log(1);
      data = {
        userName: props.userData["userName"],
        text: text,
        topic: topic,
        pictureUrl: pictureUrl,
        date: date,
        email: props.userData["email"]
      };
      axios
        .post("/addMemo", data)
        .then((res) => {
          // console.log("addmemo");
          // console.log(res.status);
          props.close();
          setTimeout(() => {
            props.toggleCheckState();
          }, 250);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (props.editing === true) {
      console.log(2);
      data = {
        userName: props.userData["userName"],
        text: text,
        topic: topic,
        pictureUrl: pictureUrl,
        date: props.oldData["date"],
        editDate: date,
        email: props.userData["email"]
      };

      axios
        .post(`/editMemo/${props.documentID}`,data)
        .then((res) => {
          props.close();
          setTimeout(() => {
            props.toggleCheckState();
          }, 250);
        }).catch((err)=>{
          console.log(err);
        });
    }
  };
  return (
    <div
      className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-blue-400 bg-opacity-50"
      onClick={() => {
        props.close();
      }}
    >
      <div
        className="box-border border-2 border-teal-600 sm:px-12 bg-emerald-300 px-5"
        onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}
      >
        <div className="flex flex-row justify-end items-center py-3">
          <button
            className="box-border border-2 rounded-2xl bg-teal-300"
            onClick={() => {
              props.setClose(!props.isClose);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="sm:px-12 py-6 text-3xl font-Bubblegum text-center">
          Add your memo
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="my-2 text-2xl font-Bubblegum text-center">Title</div>
          <input
            className="bg-transparent text-black text-lg outline-none box-border border-[1px] border-black my-3 sm:w-[30rem] sm:px-2 text-center placeholder:text-black"
            placeholder="Add your title..."
            value = {topic}
            onChange={handleTopic}
          />
        </div>
        <div className = "flex flex-row justify-center items-center mt-4">
        <CKEditor
          className="editor"
          editor={ClassicEditor}
          data={text}
          onChange={(event, editor) => {
            const data = editor.getData();
            setText(data);
          }}
        />
        </div>
        
        {/*
        <textarea
          className="bg-transparent pt-4 w-full text-black text-lg outline-none box-border border-[1px] border-black border-opacity-20 px-3"
          placeholder="Write a memo"
          rows="12"
          cols="50"
          onChange={handleChange}
          /> */}

        <button
          className="text-center sm:px-2 py-2 box-border border-2 bg-blue-300 w-full text-bold font-Bubblegum text-2xl my-6"
          onClick={handleOnClick}
        >
          PostNewMemo
        </button>
      </div>
    </div>
  );
}
export default MemoModal;
