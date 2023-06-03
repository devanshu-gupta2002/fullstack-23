import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginServices from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] =useState('')
  const [password, setPassword] = useState('')
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try{
      const user = await loginServices.login({
        username, password,
      })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch (exception) {
      console.log('wrong credentials')
    }
  }

  const loginForm = () => (
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
    )

  const blogForm = () => (
    <div>
    <h1>Blogs</h1>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>

  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
    {!user && loginForm()}
    {user && blogForm()}
    </div>
  )
}

export default App