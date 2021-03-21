import widgetService from "../services/widget-service";

export const findWidgetsForTopic = (dispatch, topicId) => {
    widgetService.findWidgetsForTopic(topicId)
        .then(widgets => dispatch({
            type: "FIND_WIDGETS",
            widgets: widgets
        }))
}

export const createWidget = (dispatch, topicId) => {
    widgetService.createWidget(topicId, {type: "HEADING", size: 1, text: "New heading widget - update me"})
        .then(widget => dispatch({
            type: "CREATE_WIDGET",
            widget
        }))
}

export const updateWidget = (dispatch, widget) => {
    widgetService.updateWidget(widget.id, widget)
        .then(status => dispatch({
            type: "UPDATE_WIDGET",
            // syntax below is the same as widget:widget
            widget
        }))
}

export const deleteWidget= (dispatch, widget) => {
    widgetService.deleteWidget(widget.id).then(status =>
        dispatch({type: "DELETE_WIDGET", widgetToDelete: widget}))
}

const widgetActions = {
    findWidgetsForTopic, createWidget, updateWidget, deleteWidget
}

export default widgetActions
