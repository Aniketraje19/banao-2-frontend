import { useEffect, useState } from "react"
import { getAllPosts } from "../api/posts"
import { AiOutlineLike } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import {useAuth} from "../context/authContext"
import { Link } from "react-router";

export const Home = () => {

    const [posts, setPosts] = useState([])

    const {isAuthenticated} = useAuth()

    useEffect(() => {

        getAllPosts()
            .then(data => {
                setPosts(data.data)
            })

    }, [])

    return (

        <div className="m-4">

            {isAuthenticated && <Link to="/add-post"><button className="w-full bg-green-300 p-2 m-2 hover:bg-green-400 rounded-xl font-semibold">Add Post</button></Link>}

            {posts.map(post => (
                <div key={post._id} className="w-full bg-slate-200  p-4 m-2 rounded-lg">
                    <p className="border-b-2 border-slate-300 p-2 m-2 flex justify-between">
                        <span>User: {post.author.username}</span>
                        <span>Date: {new Date(post.createdAt).toLocaleString()}</span>
                    </p>
                    <p className="p-4 m-2 border-b-2 border-slate-300">
                        {post.content.length > 400 ? post.content.slice(0, 400) + "...." : post.content}
                    </p>

                    <p className="p-2 m-2 flex justify-between">
                        <span className="flex"><AiOutlineLike size={20} />  {post.likes.length}</span>
                        <span className="flex"><GoCommentDiscussion size={20} /> {post.comments.length}
                        </span>
                    </p>
                   
                        <Link to={`/post/${post._id}`} className="w-full m-2 p-2 rounded-md text-white bg-blue-400 hover:bg-blue-500 block text-center">View Post</Link>
                   
                </div>
            ))}
        </div>
    )

}