import { useState } from "react"
import { addPost } from "../api/posts"

export const AddPost = () => {

    const [content,setContent] = useState("")
    const [error,setError] = useState(null)
    const [success,setSuccess] = useState(null)
    const handleSubmit = () => {

        setError(null)

        if(content === ""){
            setError("Content is Required!")
            return
        }

        addPost(content)
        .then(res=>{
            setSuccess(res.message)
            setContent("")
        })
        .catch(err=>setError(err.message))

    }


    return (
        <div className="my-20 flex justify-center items-center">

        <div className="bg-slate-200 flex flex-col w-1/2 p-10 rounded-xl">
          <p className="text-2xl">Add Post</p>
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
            Add Post
          </button>
        </div>
      </div>
    )
}