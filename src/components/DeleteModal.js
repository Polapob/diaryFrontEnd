import axios from "axios";
const DeleteModal = (props) => {
  props.setIsClick(false);
  const deleteData = (docId) => {
    axios
      .delete(`/deleteMeMo/${docId}`, {
        data: props.userData,
      })
      .then((res) => {
        console.log(res);
        props.toggleCheckState();
        // props.setIsClick(false);
        props.setIsDelete(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex  fixed inset-0 overflow-x-auto overflow-y-auto justify-center items-center z-50 bg-blue-300 bg-opacity-20" onClick={()=>{
        props.setIsDelete(false);
    }}>
      <div className="box-border border-2 border-teal-500 py-8 px-4 bg-yellow-200 "onClick={(e) => {
          // do not close modal if anything inside modal content is clicked
          e.stopPropagation();
        }}>
        <div className="sm:text-2xl px-2 py-2">
          Are you sure to delete the post?
        </div>
        <div className="flex flex-row justify-between  mx-4 items-center py-4">
          <button
            className="box-border border-2 bg-green-400 px-5 py-2 rounded-2xl"
            onClick={() => {
              deleteData(props.documentID);
            }}
          >
            Yes
          </button>
          <button
            className="box-border border-2 bg-red-400 px-5 py-2 rounded-2xl"
            onClick={() => {
              props.setIsDelete(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
