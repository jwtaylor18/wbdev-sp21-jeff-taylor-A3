import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import EditableItem from "./editable-item";
import {useParams} from "react-router-dom";
import lessonService from '../services/lesson-service'
import moduleService from "../services/module-service";

const LessonTabs = (
    {lessons=[
            {_id: "134", title:"Lesson A"},
            {_id: "234", title:"Lesson B"},
            {_id: "456", title:"Lesson C"}
    ],
        findLessonsForModule,
        createLesson,
        updateLesson,
        deleteLesson

    }) => {

    const {courseId, moduleId, lessonId} = useParams()

    useEffect(() => {
        console.log(moduleId)
        if (moduleId !== "undefined" && typeof moduleId !== "undefined") {
            findLessonsForModule(moduleId)
        }
    }, [moduleId])

    return (<div className="wbdv-lesson-tabs">
        <ul className="nav nav-pills">
            {
                lessons.map(lesson =>
                    <li className = "nav-item">
                        <EditableItem
                            active = {lesson._id === lessonId}
                            updateItem={updateLesson}
                            deleteItem={deleteLesson}
                            to={`/courses/editor/${courseId}/${moduleId}/${lesson._id}`}
                            item={lesson}/>
                    </li>)
            }
            <li>
                <button onClick={() => createLesson(moduleId)}>Create New Lesson</button>
            </li>
        </ul>
    </div>)}

const stpm = (state) => ({
    lessons: state.lessonReducer.lessons
})
const dtpm = (dispatch) => ({
    findLessonsForModule: (moduleId) => {
        lessonService.findLessonsForModule(moduleId)
            .then(lessons => dispatch({
                type: "FIND_LESSONS",
                lessons: lessons
            }))
    },
    createLesson: (moduleId) => {
        lessonService.createLesson(moduleId, {title: "New Lesson"})
            .then(lesson => dispatch({
                type: "CREATE_LESSON",
                lesson
            }))
    },

    updateLesson: (lesson) => {
        lessonService.updateLesson(lesson._id, lesson)
            .then(status => dispatch({
                type: "UPDATE_LESSON",

                // syntax below is the same as module:module
                lesson
            }))
    },

    deleteLesson: (item) =>
        lessonService.deleteLesson(item._id).then(status =>
            dispatch({type: "DELETE_LESSON", lessonToDelete: item })),
})

export default connect(stpm, dtpm)(LessonTabs)