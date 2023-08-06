import { vote } from "../reducers/anecdoteReducer"
import { useSelector, useDispatch } from "react-redux"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  const addVote = (id) => {
    dispatch(vote(id))
  }

  return ( 
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList