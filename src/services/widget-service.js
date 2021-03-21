
const LESSONS_URL = "https://wbdv-generic-server.herokuapp.com/api/jefftaylor/lessons"

const TOPICS_URL = "https://wbdv-generic-server.herokuapp.com/api/jefftaylor/topics"

const WIDGET_URL = process.env.REACT_APP_WIDGET_URL

export const updateWidget =(widgetId, widget) =>
    fetch(`${WIDGET_URL}/api/widgets/${widgetId}`, {
        method: "PUT",
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response=> response.json())

export const findWidgetsForTopic = (topicId) =>
    fetch(`${WIDGET_URL}/api/topics/${topicId}/widgets`)
        .then(response => response.json())

export const createWidget = (topicId, widget) =>
    fetch(`${WIDGET_URL}/api/topics/${topicId}/widgets`, {
        method: "POST",
        body: JSON.stringify(widget),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const deleteWidget = (widgetId) =>
    fetch(`${WIDGET_URL}/api/widgets/${widgetId}`, {
        method: "DELETE"
    })
        .then(response => response.json())

export default {
    updateWidget, findWidgetsForTopic, createWidget, deleteWidget
}