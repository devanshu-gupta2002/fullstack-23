const App = () => {
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  return (
    <div>
      <p>{friends[0].name} and {friends[0].age}</p>
      <p>{friends[1].name} and {friends[1].age}</p>
    </div>
  )
}

export default App