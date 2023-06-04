import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/notification'
import blogService from './services/blogs'
import loginServices from './services/login'
import "./index.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')
  const [username, setUsername] =useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserData = window.localStorage.getItem('localSavedUserData')
    if(loggedUserData){
      const user = JSON.parse(loggedUserData)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginServices.login({
        username, password,
      })
      window.localStorage.setItem('localSavedUserData', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        setErrorMessage(`A new blog ${newTitle} by ${newAuthor} added`)
        setTimeout(() => {setErrorMessage(null)}, 5000)
      })
  }

  const loginForm = () => (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Login to application</h1>
        <div>
          Username
          <input type='text' value={username} name='Username' onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          Password
          <input type='text' value={password} name='Password' onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
    )

  const blogForm = () => (
    <div>
    <h1><u>Blogs</u></h1>
    <div>
      <b>{user.name}</b> logged in  <button onClick={() => {
      window.localStorage.removeItem('localSavedUserData')
      window.location.reload()
      }}>Log Out</button>
    </div>
    <br></br>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
        <div>
          <form onSubmit={addBlog}>
            <h1>Create New</h1>
            <div>Title: <input type='text' value={newTitle} name='Title' onChange={({target}) => setTitle(target.value)} /></div>
            <div>Author: <input type='text' value={newAuthor} name='Author' onChange={({target}) => setAuthor(target.value)} /></div>
            <div>Url: <input type='text' value={newUrl} name='Url' onChange={({target}) => setUrl(target.value)} /></div>
            <button type='submit'>Create</button>
          </form>
      </div>
  </div>

  )

  return (
    <div>
    <Notification message={errorMessage} />
    {!user && loginForm()}
    {user && blogForm()}
    </div>
  )
}

export default App