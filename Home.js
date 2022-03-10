import Login from "./Login";
import NavBar from "./Navbar";
import PostsList from "./PostsList";
import CreatePost from "./CreatePost";
import { useEffect, useState } from "react";
import "../styles/home.css";
// import { createPost } from "../lib/Social-Network-Library";
// import { addComment } from "../lib/Social-Network-Library";
// import { addLike } from "../lib/Social-Network-Library";

// Import de la fonction de chargement des "posts"
import { getPosts } from "../lib/Social-Network-Library";

function Home(props) {
    // le debut des posts affichés
    let newsfeedPageNumber = 0;
    // le nombre de posts affichés par pacquet
    const newsfeedPageLimit = 20;

    const [posts, setPosts] = useState([]);
    const [nbPages, setNbPages] = useState(null);

    const [refetch, setRefetch] = useState(0);

    /**
     * Ajout des posts
     */
    const handleaddpost = () => {
        setRefetch(1);
    };
    /**
     * Chargement des posts
     */
    const handleLoadPosts = async () => {
        // appel de l'API
        let result = await getPosts(newsfeedPageNumber, newsfeedPageLimit); // Utilisation de la fonction getPosts

        /**
         * Valeur de retour: Promise - La valeur de retour est une promesse (à récupérer avec await)
         * contenant un objet en cas succès de la forme:
         *      {posts: [Posts], page: Number, totalPages: Number}.
         * En cas d'erreur, l'objet resemblera à: {message: String}
         *
         * exemple {"success":true,"posts":[],"page":0,"totalPages":0}
         *
         **/
        setNbPages(result.totalPages);
        setPosts(result.posts);
        // console.log(result);
        // const post = result.data;
        // return post;
    };

    console.log(nbPages);
    useEffect(() => {
        if (nbPages === null) {
            console.log("demande de chargement des posts");
            // demande de chargement des posts

            handleLoadPosts();
        }
    }, [nbPages, handleLoadPosts]);

    useEffect(() => {
        if (refetch > 0) {
            handleLoadPosts();
            setRefetch(0);
        }
    }, [refetch, handleLoadPosts]);

    return (
        <div className="container">
            <h1>Réseau social</h1>
            <h3>Bienvenue sur notre nouveau réseau</h3>
            <PostsList nbPages={nbPages} posts={posts}></PostsList>
            <CreatePost onCreatePost={handleaddpost}></CreatePost>
        </div>
    );
}

export default Home;
