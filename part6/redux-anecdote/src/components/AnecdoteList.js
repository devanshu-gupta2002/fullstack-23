import { addVote } from "../reducers/anecdoteReducer"
import { useSelector, useDispatch } from "react-redux"
import { orderBy } from 'lodash'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const search = useSelector(state => state.filter)
  
  const sortedAnecdotes = orderBy(anecdotes, ["votes"], ["desc"])
  const filteredAnecdote = sortedAnecdotes.filter((anecdote) => anecdote.content.includes(search))

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 3))
  }

  return ( 
    <div>
      {filteredAnecdote.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList