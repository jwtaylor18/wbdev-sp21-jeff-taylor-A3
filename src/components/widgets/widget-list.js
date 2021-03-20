import React, {useState, useEffect} from 'react'
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
import {useParams} from 'react-router-dom'
import topicService from "../../services/topic-service";

const WidgetList = () => {

    const {topicId} = useParams()

    //TODO: move state management to widgets-reducer
    const[widgets, setWidgets] = useState([])
    const [editingWidget, setEditingWidget] = useState({})

    useEffect(() => {
        //TODO: move server communication to widget service

        // fetch("http://localhost:8080/api/widgets").
        fetch(`http://localhost:8080/api/topics/${topicId}/widgets`).then(response => response.json()).then(widgets => setWidgets(widgets))
    },[topicId])

    // const createWidgetForTopic = () => {
    //     fetch(`http://localhost:8080/api/topics/${topicId}/widgets`, {
    //         method: "POST",
    //         body: JSON.stringify({type: "HEADING", size: 1, text: "NEW WIDGET"}),
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(actualWidget => {
    //         setWidgets(widgets =>([...widgets, actualWidget]))
    //     })
    //
    // }
    //
    // const deleteWidget = (wid) =>
    //     fetch(`http://localhost:8080/api/widgets/${wid}`, {
    //         method: "DELETE",
    //     }).then(response => {
    //         setWidgets((widgets) => widgets.filter(w => w.id !== wid))
    //     })
    //
    //
    // const updateWidget = (wid, widget) =>
    //     fetch(`http://localhost:8080/api/widgets/${wid}`, {
    //         method: "PUT",
    //         body: JSON.stringify({widget}),
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     }).then(response => {
    //         setWidgets((widgets) => widgets.map(w => w.id !== wid ? w : widget ))
    //         setEditingWidget({})
    //     })

    return (
        <div>
            <i onClick={createWidgetForTopic}className="fas fa-plus fa-2x float-right"></i>
            <h2>widget list ({widgets.length})</h2>
            <ul className="list-group">
                {
                    widgets.map(widget =>
                        <li className="list-group-item" key={widget.id}>
                            {
                                editingWidget.id === widget.id &&
                                    <>
                                        <i onClick={() => {updateWidget(widget.id, editingWidget)}} className="fas fa-check fa-2x float-right"></i>
                                        <i onClick={() => deleteWidget(widget.id)} className="fas fa-trash fa-2x float-right"></i>
                                    </>
                            }
                            {
                                editingWidget.id != widget.id &&
                                <i onClick={() => setEditingWidget(widget)} className="fas fa-cog fa-2x float-right"></i>
                            }


                            {
                            widget.type === "HEADING" &&
                                <HeadingWidget editing = {editingWidget.id === widget.id} widget={widget}/>
                            }
                            {
                                widget.type === "PARAGRAPH" &&
                                <ParagraphWidget widget={widget}/>
                            }
                        </li>
                    )
                }
            </ul>
        </div>
    )

    const stpm = (state) => ({
        topics: state.topicReducer.topics
    })

    const dtpm = (dispatch) => ({
        findTopicsForLesson: (lessonId) => {
            topicService.findTopicsForLesson(lessonId)
                .then(topics => dispatch({
                    type: "FIND_TOPICS",
                    topics: topics
                }))
        },
        createTopic: (lessonId) => {
            topicService.createTopic(lessonId, {title: "New Topic"})
                .then(topic => dispatch({
                    type: "CREATE_TOPIC",
                    topic
                }))
        },

        updateTopic: (topic) => {
            topicService.updateTopic(topic._id, topic)
                .then(status => dispatch({
                    type: "UPDATE_TOPIC",

                    // syntax below is the same as module:module
                    topic
                }))
        },

        deleteTopic: (item) =>
            topicService.deleteTopic(item._id).then(status =>
                dispatch({type: "DELETE_TOPIC", topicToDelete: item })),
    })
}

export default WidgetList