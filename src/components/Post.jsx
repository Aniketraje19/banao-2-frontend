import { useParams,useNavigate } from "react-router";
import { getPostById, addComment,toggleLike,deletePost} from "../api/posts";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { GoCommentDiscussion } from "react-icons/go";

import { useAuth } from '../context/authContext';

export const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [commentSuccess, setCommentSuccess] = useState(null);
  const [commentAdded, setCommentAdded] = useState(false);

  const [isPostLiked,setIsPostLiked] = useState(false)

  const [likeCount,setLikeCount] = useState(0)

  const { isAuthenticated,user } = useAuth();

  const navigate = useNavigate()

  const handleComment = () => {
    setCommentError("");
    setCommentSuccess(null);

    if (comment === "") {
      setCommentError("Comment can't be empty!");
      return;
    }

    if (!isAuthenticated) {
      setCommentError("Please login to add a comment!");
      return;
    }

    addComment(id, comment)
      .then((res) => {
        setCommentSuccess(res.message);
        setComment("");
        setCommentAdded((prev) => !prev);
      })
      .catch((err) => setCommentError(err.message));
  };

  const handleLike = () => {

    if(!isAuthenticated){
      alert("Login to Like the Post!")
      return
    }

    toggleLike(id)
    .then(res=>{
      if(isPostLiked){
        setLikeCount(prev => prev-1)
      }else{
        setLikeCount(prev => prev+1)
      }
      setIsPostLiked(prev=>!prev)
    })
    .catch((err)=>alert(err.message))
  }

  const handleDeletePost = () => {
    const toDelete = window.confirm("Are you want to Delete this Post!")
    if(toDelete){
      deletePost(id)
      .then(res=>{
        navigate("/")
      })
      .catch(err=>alert(err))
    }
  }

  const handleEditPost = () => {
    navigate("update")
  }

  useEffect(() => {

    setLoading(true);
    getPostById(id)
      .then((response) => {
        console.log(response.data)
        setPost(response.data);
        setLikeCount(response.data.likes.length)
        setLoading(false);
        return response.data
      })
      .then(data=>{
        if(isAuthenticated){
          let index = data.likes.indexOf(user.id)
          if(index >= 0){
            setIsPostLiked(true)
          }

        }
        
      })
      .catch((err) => {
        console.log("Error fetching post:", err);
        setLoading(false);
      });
  }, [id, commentAdded]); 

  if (loading) {
    return <p className="text-center my-10">Loading...</p>;
  }

  if (!post) {
    return <p className="text-center my-10">Post not found</p>;
  }

  

  return (
    <div className="bg-slate-200 p-4 m-4 rounded-lg">
      <div className="flex justify-end">{post.author._id === user?.id ? <span>
        <button className="m-2 p-2" onClick={handleEditPost}><FaEdit size={30} color="green" /></button>
        <button className="m-2 p-2" onClick={handleDeletePost}><MdDeleteForever size={30} color="red"/></button>
        </span> : null}  </div>
      <p className="border-b-2 border-slate-300 p-2 m-2 flex justify-between">
        <span>User: {post.author.username}</span>
        <span>Date: {new Date(post.createdAt).toLocaleString()}</span>
      </p>
      <p className="p-4 m-2 border-b-2 border-slate-300 text-xl">{post.content}</p>
      <p className="p-2 m-2 flex justify-between">
        <span className="flex items-center">
          <button onClick={handleLike}>
          {isPostLiked ? <AiFillLike size={30} /> : <AiOutlineLike size={30} />}
          </button>
          <span className="text-xl">
           {likeCount}
          </span>
        </span>
        <span className="flex">
          <GoCommentDiscussion size={20} /> {post.comments.length}
        </span>
      </p>

      <div>
        {commentSuccess && <p className="text-green-600">{commentSuccess}</p>}
        {commentError && <p className="text-red-600">{commentError}</p>}

        <textarea
          placeholder="comment"
          className="w-full rounded-xl p-4 text-lg"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-300 text-white p-2 m-2 w-full rounded-xl hover:bg-blue-400"
          onClick={handleComment}
        >
          Add Comment
        </button>
      </div>

      <p>Comments: </p>

      {post.comments.map((comment) => (
        <div className="bg-slate-300 p-6 m-2 rounded-xl" key={comment._id}>
          <p className="flex justify-between border-b-2 border-slate-400 m-2 p-2">
            <span>Commented By: {comment.user.username}</span>
            <span>Date: {new Date(comment.createdAt).toLocaleString()}</span>
          </p>
          <p className="p-2 m-2 text-gray-700">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};
