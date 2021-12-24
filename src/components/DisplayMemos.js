import react,{useState,useEffect} from "react";
import axios from "axios";
import DisplayMemo from "./DisplayMemo";
function DisplayMemos(props){
    const [memoData,setMemoData] = useState([]);
    const getAllMemos = ()=>{
        axios.get("http://localhost:4000/getAllMemo").then((res)=>{
            //console.log(res.data["memoData"]);
            setMemoData(res.data["memoData"]);
            //setUpdate(true);
        }).catch(err=>{
            console.log(err);
        })
    }
    useEffect(()=>{
        getAllMemos();
    },[props.checkState])
    return <div>
        {memoData.map((data)=>{
           return (<div><DisplayMemo data = {data} userData = {props.userData} toggleCheckState = {props.toggleCheckState}/></div>)
        })}
    </div>
}
export default DisplayMemos;