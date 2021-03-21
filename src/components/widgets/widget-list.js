import React, {useState, useEffect} from 'react'
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
import {useParams} from 'react-router-dom'
import widgetService from "../../services/widget-service";
import {connect} from "react-redux";
import widgetActions from "../../actions/widget-actions";

const WidgetList = ({

    widgets = [{type: "HEADING", size: 1, text: "NEW WIDGET"}, {type: "PARAGRAPH", size: 1, text: "Test text for paragraph"}],
    createWidget,
    updateWidget,
    deleteWidget,
    findWidgetsForTopic

    }) => {

        const {topicId} = useParams()

        const [editingWidget, setEditingWidget] = useState({})

        useEffect(() => {
            if (topicId !== "undefined" && typeof topicId !== "undefined") {
                findWidgetsForTopic(topicId)
                console.log("running use effect " + topicId)
            }
        }, [topicId])

        return (
            <div>
                <i onClick={() => createWidget(topicId)}className="fas fa-plus fa-2x float-right"></i>
                <h2>widget list ({widgets.length})</h2>
                <ul className="list-group">
                    {
                        widgets.map(widget =>
                            <li className="list-group-item" key={widget.id}>
                                {
                                widget.type === "HEADING" &&
                                    <HeadingWidget updateWidget={updateWidget} deleteWidget={deleteWidget} widget={widget}/>
                                }
                                {
                                    widget.type === "PARAGRAPH" &&
                                    <ParagraphWidget updateWidget={updateWidget} deleteWidget={deleteWidget} widget={widget}/>
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

    // const dtpm = (dispatch) => ({
    //     findWidgetsForTopic: (topicId) => {
    //         widgetService.findWidgetsForTopic(topicId)
    //             .then(widgets => dispatch({
    //                 type: "FIND_WIDGETS",
    //                 widgets: widgets
    //             }))
    //     },
    //     createWidget: (topicId) => {
    //         widgetService.createWidget(topicId, {type: "HEADING", size: 1, text: "New heading widget - update me"})
    //             .then(widget => dispatch({
    //                 type: "CREATE_WIDGET",
    //                 widget
    //             }))
    //     },
    //
    //     updateWidget: (widget) => {
    //         widgetService.updateWidget(widget.id, widget)
    //             .then(status => dispatch({
    //                 type: "UPDATE_WIDGET",
    //                 // syntax below is the same as widget:widget
    //                 widget
    //             }))
    //     },
    //
    //     deleteWidget: (widget) =>
    //         widgetService.deleteWidget(widget.id).then(status =>
    //             dispatch({type: "DELETE_WIDGET", widgetToDelete: widget })),
    // })

const dtpm = (dispatch) => {
    return {
        findWidgetsForTopic: (topicId) => widgetActions.findWidgetsForTopic(dispatch, topicId),
        createWidget: (topicId) => widgetActions.createWidget(dispatch, topicId),
        updateWidget: (widget) => widgetActions.updateWidget(dispatch, widget),
        deleteWidget: (widget) => widgetActions.deleteWidget(dispatch, widget)
    }
}

export default connect(stpm, dtpm)(WidgetList)