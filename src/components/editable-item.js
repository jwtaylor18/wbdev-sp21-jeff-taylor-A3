import React, {useState} from 'react'
import {Link} from "react-router-dom";

const EditableItem = (
    {
        to,
        deleteItem,
        updateItem,
        item={title: "Some title", _id: "ABC"},
        active=false
    }) => {

    const [editing, setEditing] = useState(false)
    const [cachedItem, setCachedItem] = useState(item)

    return (
        <>
            {
                !editing &&
                <>
                    <Link className={`d-inline nav-link ${active?'active':''}`} to={to}>{item.title}</Link>
                    <i onClick={()=> setEditing(true)} className="fas fa-edit float-right"></i>
                </>
            }
            {
                editing &&
                <>
                    <input onChange={(e) =>
                        setCachedItem({
                            ...cachedItem,
                            title: e.target.value
                        })}
                           value={cachedItem.title}/>
                    <i onClick={()=> {
                        setEditing(false)
                        updateItem(cachedItem)
                    }} className = "fas fa-check float-right"></i>
                    <i onClick={() => {deleteItem(item); setEditing(false)}} className = "fas fa-times float-right"></i>
                </>
            }
        </>
    )
}

export default EditableItem