import React, {useState} from 'react'
import {Link} from "react-router-dom";
import '../styles/course-row-styles.css'

const CourseRow = (
    {
        title,
        owner,
        lastModified,
        deleteCourse,
        updateCourse,
        course
    }) => {

    const [editing, setEditing] = useState(false)
    const [newTitle, setNewTitle] = useState(title)

    const saveTitle = () => {
        setEditing(false)
        const newCourse = {
            ...course,
            title: newTitle
        }
        updateCourse(newCourse)
    }

    return (<tr class="d-flex">
        <td class="col-9 col-md-6 col-lg-4">
            {!editing && <Link to={`/courses/editor/${course._id}`}>{title}</Link>}
            {editing && <input
                onChange={(event) => setNewTitle(event.target.value)}
                value={newTitle}
                className="form-control"/>}
        </td>
        <td class="d-none col-md-3 d-md-table-row">{owner}</td>
        <td class="col-2 d-none d-lg-table-row" >{lastModified}</td>
        <td class="col-3 float-right">
            {!editing && <i onClick={() => setEditing(true)} className="fas fa-edit float-right"></i>}
            {editing && <i onClick={() => {deleteCourse(course); setEditing(false)}} className="fas fa-trash float-right"></i>}
            {editing && <i onClick={() => saveTitle()} className="fas fa-check float-right"></i>}
        </td>
    </tr>)
    }

export default CourseRow