import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await axios.get('http://localhost:8000/api/course');
                setCourses(response.data.courses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        }
        fetchCourses();
    }, []);

    return (
        <div className="courses">
            {courses.map(course => (
                <div key={course.id} className="course-card">
                    <h3>{course.coursename}</h3>
                    <p>{course.description}</p>
                    <p>Price: ${course.price}</p>
                    <button>Enroll Now</button>
                </div>
            ))}
        </div>
    );
}

export default Courses;