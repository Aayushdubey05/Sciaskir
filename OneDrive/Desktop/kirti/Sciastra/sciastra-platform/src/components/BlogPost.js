import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function BlogPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        async function fetchPost() {
            const response = await axios.get(`/api/blog/${id}`);
            setPost(response.data);
        }
        fetchPost();
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div className="blog-post">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
    );
}

export default BlogPost;