const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  const countLikes = (acc, cur) => {
    return acc + cur.likes
  }
  return blogs.reduce(countLikes, 0)
}

module.exports = {
  dummy,
  totalLikes
}