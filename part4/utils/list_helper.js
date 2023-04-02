const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const allLikes = blogs.length === 0
    ? 0
    : blogs.reduce((sum, item) => sum + item.likes, 0)
  return(allLikes)
}

const favoriteBlog =(blogs) => {
  const mostLikes = blogs.reduce((prev, curr) =>{
    return(prev.likes<curr.likes ? curr : prev)
  })
return(
  {
    title: mostLikes.title,
    author: mostLikes.author,
    likes: mostLikes.likes
  }
)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}


