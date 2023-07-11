import { useState } from "react"

const Blog = ({blog, updateBlog, userName, removeCurrBlog}) => {
  const [blogVisible, setBlogVisible] =useState(false)
  // const {removeVisibility} = useState(userId===blog.user.id ? {display: ''} : {display: 'none'})
  // const {visible} = useState(visibility)
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

  const removeBlog = () => {
    removeCurrBlog(blog)
  }

  // const removeVisibility = userId===blog.user.id ? {display: ''} : {display: 'none'}

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
        <button onClick={addLike} className="button button-like">Like</button>
      </div>
      <div className="user">
        {blog.user.name}
      </div>
      {/* <div style={{display: visible ? '' : 'none'}}> */}
      {blog.user.username === userName && (
            <button className="button-remove" onClick={removeBlog}>
              delete
            </button>)}
      </div>
    </div> 
  )}
  

export default Blog