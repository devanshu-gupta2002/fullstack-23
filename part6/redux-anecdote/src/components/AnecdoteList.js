import { addVote } from "../reducers/anecdoteReducer"
import { useSelector, useDispatch } from "react-redux"
import { orderBy } from 'lodash'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const search = useSelector(state => state.filter)
  
  const sortedAnecdotes = orderBy(anecdotes, ["votes"], ["desc"])
  const filteredAnecdote = sortedAnecdotes.filter((anecdote) => anecdote.content.includes(search))

  const vote = (id) => {
    dispatch(addVote(id))
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList