import { useRef, useState } from "react";
import useFetch from "../hooks/useFetch";

export default function Todo({lists:w}) {
    const contentRef = useRef(null);

    const [isLists , setIsLists] = useState(w)
    const [checked, setChecked] = useState();

    const lists = useFetch("http://localhost:3001/lists")
    
    function toggleDone() {
        fetch(`http://localhost:3001/${lists.id}`,{
            method : 'PUT',
            headers : {
                "Content-Type" : 'application/json', 
            },
            body : JSON.stringify({
                ...lists,
                checked : !checked,
            }),
        }).then(res => {
            if(res.ok){
                setChecked(!checked)
            }
        })
    }

    function del() {
        if(window.confirm('삭제 할까요?')) {
            fetch(`http://localhost:3001/lists/${lists.id}`, {
                method: "DELETE", 
            }).then(res => {
                if(res.ok){
                    setIsLists({
                        ...lists,
                        id:0,
                    })
                }
            })
        }
    }

    if(lists.id === 0){
        return null;
    }

  

    function onSubmit(e) {
        e.preventDefault();

        fetch(`http://localhost:3001/lists/`,{
            method : 'POST',
            headers : {
                "Content-Type" : 'application/json', 
            },
            body : JSON.stringify({
                content : contentRef.current.value,
                checked : false
            }),
        }).then(res => {
            if(res.ok){
                alert('생성 되었습니다.')
            }
        })
    }

    return <>
        <h2>TodoList</h2>
        <table className="todoListBox">
            <tbody className="todoList">
            {lists.map(lists => (
                <tr key={lists.id} className={checked ? "off" : ""}>
                    <td>
                        <input type="checkbox" checked={checked} onChange={toggleDone}/>
                    </td>
                    <td>{lists.content}</td>
                    <td>
                        <button className="delete" onClick={del}>삭제</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        <form onSubmit={onSubmit}>
            <div className="input_area">
                <input type="text" placeholder="해야할것!" ref={contentRef}></input>
                <button>저장</button>
            </div>
        </form>
    </>
}