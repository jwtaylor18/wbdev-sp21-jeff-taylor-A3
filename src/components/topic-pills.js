import React, {useEffect} from 'react'
import EditableItem from "./editable-item";
import topicService from "../services/topic-service";
import {useParams} from "react-router-dom";
import {connect} from "react-redux";

const TopicPills = ({
    topics= [
        {_id: "134", title:"Topic A"},
        {_id: "234", title:"Topic B"},
        {_id: "456", title:"Topic C"}
    ],

    createTopic,
    updateTopic,
    deleteTopic,
    findTopicsForLesson

    }) => {

        const {courseId, moduleId, lessonId, topicId} = useParams()

        useEffect(() => {
            if (lessonId !== "undefined" && typeof lessonId !== "undefined") {
                findTopicsForLesson(lessonId)
            }
        }, [lessonId])

        return (
            <div>
                <ul className="nav nav-pills">
                    {
                        topics.map(topic =>
                            <li className = "nav-item">
                                <EditableItem
                                    // active = {lesson._id === lessonId}
                                    updateItem={updateTopic}
                                    deleteItem={deleteTopic}
                                    to={`/courses/editor/${courseId}/${moduleId}/${lessonId}/${topic._id}`}
                                    item={topic}/>
                            </li>)
                    }
                    <li>
                        <button onClick={() => createTopic(lessonId)}>Create New Topic</button>
                    </li>
                </ul>
            </div>
        )}

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

export default connect(stpm, dtpm)(TopicPills)
