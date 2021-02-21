import React from 'react'
import CourseRow from "./course-row";
import {Link} from "react-router-dom";
import '../styles/course-table-styles.css'

export default class CourseTable extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="container-fluid">
                <table className ="table">
                    <thead>
                        <tr class="d-flex">
                            <th class="col-9 col-md-6 col-lg-4">Title</th>
                            <th class="d-none col-md-3 d-md-table-row">Owned by</th>
                            <th class="col-2 d-none d-lg-table-row">Last modified</th>
                            <th class="col-3">
                                <Link to="/courses/grid">
                                    <i className="fas fa-th float-right"></i>
                                </Link>
                                <i className="fas fa-sort-alpha-up float-right"></i>
                                <i className="fas fa-folder-open float-right"></i>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.courses.map((course, index) =>
                                <CourseRow
                                    updateCourse={this.props.updateCourse}
                                    key={index}
                                    deleteCourse={this.props.deleteCourse}
                                    course={course}
                                    title={course.title}
                                    owner={course.owner}
                                    lastModified={course.lastModified}
                                /> )
                        }
                    </tbody>

                </table>
            </div>

        )
    }
}