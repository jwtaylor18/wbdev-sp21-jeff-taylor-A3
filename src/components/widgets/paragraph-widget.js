import React, {useState} from 'react'

const ParagraphWidget = ({widget, updateWidget, deleteWidget}) => {

    const [cachedItem, setCachedItem] = useState(widget)
    const [editing, setEditing] = useState(false)

    return (

        <>
            {
                !editing &&
                <i onClick={() => setEditing(true)} className="fas fa-cog fa-2x float-right"></i>
            }
            {
                editing &&
                <>
                    <i onClick={() => deleteWidget(widget)} className="fas fa-trash fa-2x float-right"></i>
                    <i onClick={() => {setEditing(false); updateWidget(cachedItem)}} className="fas fa-check fa-2x float-right"></i>
                </>
            }
            <p>
                {widget.text}
            </p>

            {
                editing &&
                <>
                    <select onChange={(e) => setCachedItem(cachedItem => ({...cachedItem, type: e.target.value}))}
                            value={cachedItem.type} className="form-control">
                        <option value={"HEADING"}>Heading</option>
                        <option value={"PARAGRAPH"}>Paragraph</option>
                        <option value={"VIDEO"}>Video</option>
                        <option value={"IMAGE"}>Image</option>
                        <option value={"LINK"}>Link</option>
                        <option value={"LIST"}>List</option>
                        <option value={"HTML"}>HTML</option>
                    </select>
                    <textarea
                        onChange={(e) => setCachedItem({...cachedItem, text: e.target.value})}
                        value={cachedItem.text} className="form-control"
                    />

                </>
            }
        </>
    )
}

export default ParagraphWidget