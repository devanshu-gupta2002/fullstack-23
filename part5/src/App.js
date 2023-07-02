import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/notification'
import Togglable from './components/toggle'
import BlogForm from './components/blogForm'
import blogService from './services/blogs'
import loginServices from './services/login'
import "./index.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  // const [newTitle, setTitle] = useState('')
  // const [newAuthor, setAuthor] = useState('')
  // const [newUrl, setUrl] = useState('')
  const [username, setUsername] =useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef=useRef()
  
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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
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
      
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
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