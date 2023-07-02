import { useState } from "react"

const BlogForm = ({createBlog}) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
    
  }

    return (
      <div>
          <form onSubmit={addBlog}>
            <h1>Create New</h1>
            <div>Title: <input type='text' value={newTitle} name='Title' onChange={({target}) => setTitle(target.value)} /></div>
            <div>Author: <input type='text' value={newAuthor} name='Author' onChange={({target}) => setAuthor(target.value)} /></div>
            <div>Url: <input type='text' value={newUrl} name='Url' onChange={({target}) => setUrl(target.value)} /></div>
            <button type='submit'>Create</button>
          </form>
      </div>
    )
}

export default BlogForm