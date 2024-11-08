import React, { useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [coursename, setCoursename] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8000/api/course/add', { coursename, description, price }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCoursename('');
            setDescription('');
            setPrice('');
        } catch (error) {
            console.error("Error adding course:", error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Add New Course</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Course Name" value={coursename} onChange={(e) => setCoursename(e.target.value)} />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                <button type="submit">Add Course</button>
            </form>
        </div>
    );
}

export default AdminDashboard;