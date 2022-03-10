import React from "react";

const ContentPost = (props) => {
    const post = props.data;
    // "_id":"61fd4deffb8e74001bda17ce",
    // "title":"Test 999999999",
    // "content":"ça maarche ou pas ?",
    // "firstname":"Dayle",
    // "lastname":"Parent",
    // "userId":"61fd297a248c53001a2771ec",
    // "date":"2022-02-04T16:01:51.373Z",
    // "likes":[],
    // "comments":[],
    // "__v":0
    return (
        <li className="listePost">
            <h2 className="titlePost">{post.title}</h2>
            <h3>{post.content}</h3>
            <h4>
                {post.firtsname} {post.lastname}
            </h4>
            <p>
                {post.likes} {post.comments}
            </p>
        </li>
    );
};
export default ContentPost;
