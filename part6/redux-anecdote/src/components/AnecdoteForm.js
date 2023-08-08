import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { createNotification } from "../reducers/notificationReducer"
import noteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.value = ''
    const newAnecdote = await noteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(createNotification(`You added '${content}'`))
    setTimeout(() => {
      dispatch(createNotification(''))
    }, 3000)
  }



  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm