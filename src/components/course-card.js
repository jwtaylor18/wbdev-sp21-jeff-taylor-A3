import React, {useState} from 'react'
import {Link} from "react-router-dom";
import '../styles/course-card-styles.css'

const CourseCard = ({course, updateCourse, deleteCourse}) => {

    const [editing, setEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(course.title)

    const saveTitle = () => {
        setEditing(false)
        const newCourse = {
            ...course,
            title: newTitle
        }
        updateCourse(newCourse)
    }

    return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
        <div className="card">
            <img src="https://www.valuecoders.com/blog/wp-content/uploads/2016/08/react.png" className="card-img-top" alt="React Image"/>
            <div className="card-body">
                {!editing && <h5 className="card-title">{course.title}</h5>}
                {editing && <input
                    onChange={(event) => setNewTitle(event.target.value)}
                    value={newTitle}
                    className="form-control"/>}
                <p className="card-text">Sample description</p>
                <Link to={`/courses/editor/${course._id}`} className="btn btn-primary">{course.title}</Link>
                <div class={"wbdv-card-icons"}>
                    {!editing && <i onClick={() => setEditing(true)} className="fas fa-edit float-right"></i>}
                    {editing && <i onClick={() => {deleteCourse(course); setEditing(false)}} className="fas fa-trash float-right"></i>}
                    {editing && <i onClick={() => saveTitle()} className="fas fa-check float-right"></i>}
                </div>
            </div>
        </div>
    </div> )}

export default CourseCard