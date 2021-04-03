import React, {useState} from 'react'



const ListWidget = ({widget, updateWidget, deleteWidget}) => {

    const [editing, setEditing] = useState(false)
    const [cachedItem, setCachedItem] = useState(widget)

    return (
        <div>
            {
                editing &&
                    <>
                        <i onClick={() => deleteWidget(widget)} className="fas fa-trash fa-2x float-right"></i>
                        <i onClick={() => {setEditing(false); updateWidget(cachedItem)}} className="fas fa-check fa-2x float-right"></i>
                        <input checked={cachedItem.ordered} type="checkbox"
                               onChange={(e) => setCachedItem({...cachedItem, ordered: e.target.checked})}
                        /> Ordered
                        <br/>
                        Item List
                        <textarea
                            onChange={(e) => setCachedItem({...cachedItem, text: e.target.value})}
                            value={cachedItem.text} rows={10} className="form-control">
                        </textarea>
                    </>
            }
            {
                !editing &&
                    <>
                        <i onClick={() => setEditing(true)} className="fas fa-cog fa-2x float-right"></i>
                        {
                            widget.ordered &&
                            <ol>
                                {
                                    widget.text.split("\n").map((item) => {
                                        return (
                                            <li>{item}</li>
                                        )
                                    })
                                }
                            </ol>
                        }
                        {
                            !widget.ordered &&
                            <ul>
                                {
                                    widget.text.split("\n").map((item) => {
                                        return (
                                            <li>{item}</li>
                                        )
                                    })
                                }
                            </ul>
                        }
                    </>
                }
        </div>
    )
}

export default ListWidget