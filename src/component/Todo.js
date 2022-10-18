import { useState } from "react";
// import useFetch from "../hooks/useFetch";

export default function Todo({lists: w}) {
    const [lists , setLists] = useState(w)
    const [checked, setChecked] = useState(lists.checked);

    // const lists = useFetch("http://localhost:3001/lists")
    
    function toggleDone() {
        fetch(`http://localhost:3001/${lists.id}`,{
            method : 'PUT',
            headers : {
                "Content-Type" : 'application/json', 
            },
            body : JSON.stringify({
                ...lists,
                checked : !checked
            }),
        })
        .then(res => {
            if(res.ok){
                setChecked(!checked)
            }
        })
    }

    function del() {
        if(window.confirm('삭제 할까요?')) {
            fetch(`http://localhost:3001/lists/${lists.id}`, {
                method: 'DELETE', 
            }).then(res => {
                if(res.ok){
                    setLists({id:0})
                }
            })
        }
    }

    if(lists.id === 0){
        return null;
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
    </>
}