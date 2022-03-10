import React from "react";
import { useState } from "react";
import "../styles/CreatePost.css";
import { createPost } from "../lib/Social-Network-Library";

const Createpost = (props) => {
    const [title, setTitle] = useState("");
    const [post, setPost] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const blog = { title, post };
        let newpost = await createPost(title, post);
        props.onCreatePost(newpost);
        console.log(newpost);
    };

    return (
        <div className="create">
            <h2 className="AddaPost">Add a Post</h2>
            <form className="formPost" onSubmit={handleSubmit}>
                <label className="title">Title </label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
                <label className="post">Contenu du Post </label>
                <textarea
                    className="postContent"
                    required
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                ></textarea>
                <button className="BtnAddpost">Ajouter</button>
            </form>
        </div>
    );
};

export default Createpost;
