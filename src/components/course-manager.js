import React from 'react'
import CourseTable from "./course-table";
import CourseGrid from "./course-grid";
import CourseEditor from "./course-editor";
import {Route} from 'react-router-dom';
import courseService from "../services/course-service";
import '../styles/course-manager-styles.css'

class CourseManager extends React.Component {

    state = {
        courses: []
    }

    componentDidMount() {
        // findAllCourses().then(actualCourses => this.setState({
        //     courses: actualCourses
        // }))
        courseService.findAllCourses().then(courses => this.setState({courses}))
    }

    addCourse = (courseTitle) => {

        const newCourse = {
            title: courseTitle,
            owner: "me",
            lastModified: "today"
        }

        courseService.createCourse(newCourse).then(course => this.setState(
            (prevState) => ({
                ...prevState,
                courses: [
                    ...prevState.courses,
                    course
                ]
            })
        ))
    }

    updateCourse = (course) => {
        courseService.updateCourse(course._id, course)
            .then(status => this.setState((prevState) => ({
                ...prevState,
                courses: prevState.courses.map(
                    (c) => c._id === course._id ? course : c)

            // courses: prevState.courses.map(c => {
            //     if(c._id === course._id) {
            //         return course
            //     }
            //     else {
            //         return c
            //     }
            // })
        })))
    }

    deleteCourse = (courseToDelete) => {

        courseService.deleteCourse(courseToDelete._id).then(status => {
            // this.setState((prevState) => {
            //     // let nextState = {...prevState}
            //     // nextState.courses = prevState.courses.filter(course => course !== courseToDelete)
            //     // return nextState
            //
            //     //alternative syntax to above
            //     let nextState = {
            //         ...prevState,
            //         courses: prevState.courses.filter(course => course !== courseToDelete)
            //     }
            //     return nextState
            // })

            this.setState((prevState) => ({
                ...prevState,
                courses: prevState.courses.filter(course => course !== courseToDelete)
            }))
        })
    }

    render() {
        return (
            <div>
                <div class="container-fluid">
                    <div class="row">
                       <div class="col-1">
                           <i className="fas fa-bars fa-2x"></i>
                       </div>
                        <div class="col-3 d-none d-lg-block">
                            <h3>Course Manager</h3>
                        </div>
                        <div class="col-10 col-lg-7">
                            <input class="form-control" id="newCourse" type="text"/>
                        </div>
                        <div class="col-1">
                            <i onClick={() => this.addCourse(document.getElementById("newCourse").value)} className="fas fa-plus-circle fa-2x"></i>
                        </div>
                    </div>
                </div>

                <Route path="/courses/table">
                    <CourseTable updateCourse={this.updateCourse} deleteCourse={this.deleteCourse} courses={this.state.courses}/>
                </Route>
                <Route path="/courses/grid">
                    <CourseGrid updateCourse={this.updateCourse} deleteCourse={this.deleteCourse} courses={this.state.courses}/>
                </Route>
                {/*<Route path="/courses/editor"*/}
                {/*       render={(props) => <CourseEditor props={props}/>}>*/}
                {/*</Route>*/}
                <Route path="/courses/editor"
                       render={(props) => <CourseEditor {...props}/>}>
                </Route>
            </div>
        )
    }
}

export default CourseManager