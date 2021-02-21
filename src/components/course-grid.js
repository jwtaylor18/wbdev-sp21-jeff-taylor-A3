import React from 'react'
import CourseCard from "./course-card";
import {Link} from "react-router-dom";
import '../styles/course-grid-styles.css'

const CourseGrid = ({courses, updateCourse, deleteCourse}) =>
    <div>
        <div class="d-flex flex-row justify-content-end">
            <i className="fas fa-folder-open fa-2x"></i>
            <i className="fas fa-sort-alpha-up fa-2x"></i>
            <Link to="/courses/table">
            <i className="fas fa-list fa-2x"></i>
            </Link>
        </div>

        <div className="row">
        {
            courses.map(course =>
               <CourseCard course={course} updateCourse={updateCourse} deleteCourse={deleteCourse}/>
            )
        }
        </div>
    </div>


export default CourseGrid