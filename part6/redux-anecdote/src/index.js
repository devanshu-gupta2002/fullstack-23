import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteService from './services/anecdotes'
import { setAnecdote } from './reducers/anecdoteReducer'

import store from './store'

// const dispatch = useDispatch()

// anecdoteService.getAll().then(anecdotes => store.dispatch(setAnecdote(anecdotes)))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)