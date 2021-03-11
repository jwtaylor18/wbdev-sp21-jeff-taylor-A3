import React, {useState, useEffect} from 'react'
import {Link, useParams} from "react-router-dom";
import '../styles/course-editor-styles.css'
import moduleReducer from '../reducers/modules-reducer.js'
import lessonReducer from "../reducers/lesson-reducer";
import topicReducer from "../reducers/topic-reducer";
import {Provider} from "react-redux";
import ModuleList from "./module-list";
import {combineReducers, createStore} from "redux";
import LessonTabs from "./lesson-tabs";
import TopicPills from "./topic-pills";
import courseService from "../services/course-service"

const reducer = combineReducers({
    moduleReducer: moduleReducer,
    lessonReducer: lessonReducer,
    topicReducer: topicReducer
})

// const store = createStore(moduleReducer)
// const store = createStore(lessonReducer)
const store = createStore(reducer)


// const CourseEditor = ({props}) =>
const CourseEditor = ({history}) => {

    const {courseId, moduleId} = useParams()

    const [courseTitle, setCourseTitle] = useState('');
    useEffect(() => getTitle(courseId));

    const getTitle = (courseId) => {
        courseService.findCourseById(courseId)
            .then(course => setCourseTitle(course.title));
    }
    return (<Provider store={store}>
        <div>
            {/*paste everything from course editor in A1, replace h2 below*/}
            <h2>
                {/*<i onClick={() => props.history.goBack()} className="fas fa-arrow-left"></i>*/}
                <i onClick={() => history.goBack()} className="fas fa-arrow-left float-left"><span id="go-back-language">Go back</span></i>
                <span>Course Editor Page: {courseTitle}</span>
            </h2>
            <div className="row">
                <div className="col-4">
                    <ModuleList/>


                    {/*<div className="list-group list-style">*/}
                    {/*    <a href="#" className="list-group-item list-group-item-action list-group-item-dark active">*/}
                    {/*        Module 1 - jQuery<i className="float-right  fa fa-trash"></i>*/}
                    {/*    </a>*/}
                    {/*    <a href="#" className="list-group-item list-group-item-action list-group-item-dark">Module 2 - React<i*/}
                    {/*        className="float-right fa fa-trash"></i></a>*/}
                    {/*    <a href="#" className="list-group-item list-group-item-action list-group-item-dark">Module 3 - Redux<i*/}
                    {/*        className="float-right  fa fa-trash"></i></a>*/}
                    {/*    <a href="#" className="list-group-item list-group-item-action list-group-item-dark">Module 4 -*/}
                    {/*        Native<i className="float-right  fa fa-trash"></i></a>*/}
                    {/*    <a href="#" className="list-group-item list-group-item-action list-group-item-dark">Module 5 -*/}
                    {/*        Angular<i className="float-right  fa fa-trash"></i></a>*/}
                    {/*    <a href="#" className="list-group-item list-group-item-action list-group-item-dark">Module 6 -*/}
                    {/*        Node<i className="float-right  fa fa-trash"></i></a>*/}
                    {/*    <a href="#" className="list-group-item list-group-item-action list-group-item-dark">Module 7 - Mongo<i*/}
                    {/*        className="float-right  fa fa-trash"></i></a>*/}
                    {/*    <i className="fa fa-plus"></i>*/}
                    {/*</div>*/}
                </div>
                <div className="col-8">
                    <LessonTabs/>
                    {/*<ul className="nav nav-pills nav-fill pill-style">*/}
                    {/*    <li className="nav-item">*/}
                    {/*        <a className="nav-link active" href="#">Topic 1</a>*/}
                    {/*    </li>*/}
                    {/*    <li className="nav-item">*/}
                    {/*        <a className="nav-link" href="#">Topic 2</a>*/}
                    {/*    </li>*/}
                    {/*    <li className="nav-item">*/}
                    {/*        <a className="nav-link" href="#">Topic 3</a>*/}
                    {/*    </li>*/}
                    {/*    <li className="nav-item">*/}
                    {/*        <a className="nav-link" href="#">Topic 4</a>*/}
                    {/*    </li>*/}
                    {/*    <li className="nav-item">*/}
                    {/*        <a className="nav-link disabled" href="#"><span>+</span></a>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}
                    <TopicPills/>
                </div>
            </div>
        </div>
    </Provider>)}


export default CourseEditor