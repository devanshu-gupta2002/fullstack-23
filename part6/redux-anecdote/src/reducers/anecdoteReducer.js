import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push(content)
      return state
    },
    createVote(state, action) {
      const id=action.payload.id
      const anecdoteToChange = state.find(n => n.id===id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes+1
      }
      return state.map(note => 
        note.id!==id ? note : changedAnecdote)
    },
    appendAnecdote (state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  } 
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
  const updatedAnecdote = await anecdoteService.createVote(anecdote)
    dispatch(createVote(updatedAnecdote))
  }
}

export const { createVote, appendAnecdote, setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer