import { useState } from "react"

const Blog = ({blog, updateBlog, userName}) => {
  const [blogVisible, setBlogVisible] =useState(false)
  const [newLikes, setNewLikes] = useState(blog.likes)
  const hide = {display: blogVisible ? 'none' : ''}
  const show = {display: blogVisible ? '' : 'none'}
  const addLike = () => {
    blog = {
      ...blog, 
      likes: newLikes+1,
      user:blog.user.id,
    }
    updateBlog(blog)
    setNewLikes(blog.likes)
  }

  return (
  <div className="blog-style">
    <div className="title">
      {blog.title} | {blog.author} 
      <span style={hide}><button onClick={() => setBlogVisible(true)}>hide</button></span>
      <span style={show}><button onClick={() => setBlogVisible(false)}>show</button></span>
    </div>
    <div style={hide}>
      <div className="url">
        {blog.url}
      </div>
      <div className="likes">
        {newLikes}
        <button onClick={addLike}>Like</button>
      </div>
      <div className="user">
        {userName}
      </div>
      </div>
    </div> 
  )}
  

export default Blog