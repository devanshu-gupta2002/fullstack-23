import { vote } from "../reducers/anecdoteReducer"
import { useSelector, useDispatch } from "react-redux"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const search = useSelector(state => state.filter)
  // console.log(search)
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
  // console.log(sortedAnecdotes.content)
  const filteredAnecdote = sortedAnecdotes.filter(obj => obj.content.includes(search))
  // console.log(filteredAnecdote)

  const addVote = (id) => {
    dispatch(vote(id))
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
            <button onClick={() => addVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList