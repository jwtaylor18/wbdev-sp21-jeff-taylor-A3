import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import EditableItem from "./editable-item";
import {useParams} from "react-router-dom";
import lessonService from '../services/lesson-service'

const LessonTabs = (
    {lessons=[
            {_id: "134", title:"Lesson A"},
            {_id: "234", title:"Lesson B"},
            {_id: "456", title:"Lesson C"}
    ],
        findLessonsForModule,
        createLessonForModule

    }) => {

    const {courseId, moduleId, lessonId} = useParams()

    useEffect(() => {
        console.log(moduleId)
        if (moduleId !== "undefined" && typeof moduleId !== "undefined") {
            findLessonsForModule(moduleId)
        }
    }, [moduleId])

    return (<div>
        <h2>Lessons</h2>
        <ul className="nav nav-pills">
            {
                lessons.map(lesson =>
                    <li className = "nav-item">
                        <EditableItem
                            active = {lesson._id === lessonId}
                            to={`/courses/editor/${courseId}/${moduleId}/${lesson._id}`}
                            item={lesson}/>
                    </li>)
            }
            <li>
                <i onClick={() => createLessonForModule(moduleId)} className="fas fa-plus"></i>
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
    createLessonForModule: (moduleId) => {
        lessonService.createLessonForModule(moduleId, {title: "New Lesson"})
            .then(lesson => dispatch({
                type: "CREATE_LESSON",
                lesson
            }))
    }
})

export default connect(stpm, dtpm)(LessonTabs)