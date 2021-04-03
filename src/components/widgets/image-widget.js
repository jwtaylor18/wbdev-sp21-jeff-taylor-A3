import React, {useState} from 'react'

const ImageWidget = ({widget, updateWidget, deleteWidget}) => {

    const [editing, setEditing] = useState(false)
    const [cachedItem, setCachedItem] = useState(widget)

    return (
        <div>
            {
                !editing &&
                    <>
                        <i onClick={() => setEditing(true)} className="fas fa-cog fa-2x float-right"></i>
                        <img width={widget.width} height={widget.height} src={widget.src}/>
                    </>


            }
            {
                editing &&
                    <>
                        <i onClick={() => deleteWidget(widget)} className="fas fa-trash fa-2x float-right"></i>
                        <i onClick={() => {setEditing(false); updateWidget(cachedItem)}} className="fas fa-check fa-2x float-right"></i>
                        Image Source URL
                        <input value={cachedItem.src}
                               onChange={(e) => setCachedItem({...cachedItem, src: e.target.value})}
                                   className="form-control"/>
                        <br/>
                        Image Width
                        <input value={cachedItem.width}
                               onChange={(e) => setCachedItem({...cachedItem, width: e.target.value})}
                               className="form-control"/>
                        <br/>
                        Image Height
                        <input value={cachedItem.height}
                               onChange={(e) => setCachedItem({...cachedItem, height: e.target.value})}
                               className="form-control"/>
                    </>
            }

        </div>
    )

}

export default ImageWidget