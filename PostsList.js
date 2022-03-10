import "../styles/PostList.css";
import ContentPost from "./PostItem";
import { useState } from "react";

const PostsList = (props) => {
    return props.nbPages === null ? (
        <div>Il faut charger les posts</div>
    ) : (
        <div className="list">
            <ul>
                {props.posts.map((post) => (
                    <ContentPost data={post} key={post._id} />
                ))}
            </ul>
            il y a {props.nbPages} page(s).
        </div>
    );
};

export default PostsList;
