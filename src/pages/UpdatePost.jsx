import { useState,useEffect } from "react"
import {getPostById,updatePost } from "../api/posts"
import { useParams,useNavigate } from "react-router"

export const UpdatePost = () => {

    const { id } = useParams();

    const [content,setContent] = useState("")
    const [error,setError] = useState(null)
    const [success,setSuccess] = useState(null)
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    const handleSubmit = () => {

        setError(null)

        if(content === ""){
            setError("Content is Required!")
            return
        }

        updatePost(id,content)
        .then(res=>{
            setSuccess(res.message)
            setContent("")
            navigate(-1)
        })
        .catch(err=>setError(err.message))

    }

    
  useEffect(() => {

    setLoading(true);
    getPostById(id)
      .then((response) => {
        setContent(response.data.content)
        setLoading(false);
        return response.data
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false);
      });
  }, [id]); 


    return (
        <div className="my-20 flex justify-center items-center">

        <div className="bg-slate-200 flex flex-col w-1/2 p-10 rounded-xl">
          <p className="text-2xl">Update Post</p>
          {success && <p className="text-green-600">{success}</p>}
          {error && <p className="text-red-600">{error}</p>}
            <textarea
          placeholder="Content"
          className="w-full rounded-xl p-4 my-4 text-lg"
          value={content}
          onChange={e=>setContent(e.target.value)}
          ></textarea>
          <button
            className="bg-blue-300 m-2 p-2 rounded text-xl text-white hover:bg-blue-400"
            onClick={handleSubmit}
          >
            Update Post
          </button>
        </div>
      </div>
    )
}