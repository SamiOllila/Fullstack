const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  const countLikes = (acc, cur) => {
    return acc + cur.likes
  }
  return blogs.reduce(countLikes, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs) {
    return {}
  }
  const hasMoreLikes = (acc, cur) => {
    if (cur.likes > acc.likes) {
      return cur
    }
    return acc
  }
  return blogs.reduce(hasMoreLikes, blogs[1])
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}