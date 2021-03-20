import React, {useState, useEffect} from 'react'
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
import {useParams} from 'react-router-dom'
import widgetService from "../../services/widget-service";
import {connect} from "react-redux";

const WidgetList = ({

    widgets = [{type: "HEADING", size: 1, text: "NEW WIDGET"}, {type: "PARAGRAPH", size: 1, text: "Test text for paragraph"}],
    createWidget,
    updateWidget,
    deleteWidget,
    findWidgetsForTopic

    }) => {

        const {topicId} = useParams()

        // //TODO: move state management to widgets-reducer
        // const[widgets, setWidgets] = useState([])
        const [editingWidget, setEditingWidget] = useState({})

        useEffect(() => {
            if (topicId !== "undefined" && typeof topicId !== "undefined") {
                findWidgetsForTopic(topicId)
                console.log("running use effect " + topicId)
            }
        }, [topicId])

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
                <i onClick={() => createWidget(topicId)}className="fas fa-plus fa-2x float-right"></i>
                <h2>widget list ({widgets.length})</h2>
                <ul className="list-group">
                    {
                        widgets.map(widget =>
                            <li className="list-group-item" key={widget.id}>
                                {
                                    editingWidget.id === widget.id &&
                                        <>
                                            <i onClick={() => {updateWidget(widget.id, editingWidget)}} className="fas fa-check fa-2x float-right"></i>
                                            <i onClick={() => deleteWidget(editingWidget)} className="fas fa-trash fa-2x float-right"></i>
                                        </>
                                }
                                {
                                    editingWidget.id != widget.id &&
                                    <i onClick={() => {setEditingWidget(widget); console.log(editingWidget.id)}} className="fas fa-cog fa-2x float-right"></i>
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
        )}

    const stpm = (state) => ({
        widgets: state.widgetReducer.widgets
    })

    const dtpm = (dispatch) => ({
        findWidgetsForTopic: (topicId) => {
            widgetService.findWidgetsForTopic(topicId)
                .then(widgets => dispatch({
                    type: "FIND_WIDGETS",
                    widgets: widgets
                }))
        },
        createWidget: (topicId) => {
            widgetService.createWidget(topicId, {type: "HEADING", size: 1, text: "NEW WIDGET"})
                .then(widget => dispatch({
                    type: "CREATE_WIDGET",
                    widget
                }))
        },

        updateWidget: (widget) => {
            widgetService.updateWidget(widget.id, widget)
                .then(status => dispatch({
                    type: "UPDATE_WIDGET",
                    // syntax below is the same as widget:widget
                    widget
                }))
        },

        deleteWidget: (widget) =>
            widgetService.deleteWidget(widget.id).then(status =>
                dispatch({type: "DELETE_WIDGET", widgetToDelete: widget })),
    })

export default connect(stpm, dtpm)(WidgetList)