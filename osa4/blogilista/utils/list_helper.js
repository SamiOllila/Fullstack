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

const mostBlogs = (blogs) => {
  if (!blogs) {
    return {}
  }
  const getAuthors = (blogs) => {
    const getAuthor = (acc, cur) => {
      if (!acc.includes(cur.author)) {
        acc.push(cur.author)
        return acc
      }
      return acc
    }
    return blogs.reduce(getAuthor, [ blogs[0].author ])
  }
  const authors = getAuthors(blogs)
  const countAuthorBlogs = (blogs, author) => {
    const authorBlogs = blogs.filter(blog => blog.author === author)
    return authorBlogs.length
  }

const authorWithBlog = (acc, cur) => {
  authorObj = {
    author: cur,
    blogs: countAuthorBlogs(blogs, cur)
  }
  acc.push(authorObj)
  return acc
}
  const authorsWithBlogs = authors.reduce(authorWithBlog, [])
  const hasMoreBlogs = (acc, cur) => {
    if (acc.blogs > cur.blogs) {
      return acc
    }
    return cur
  }
  return authorsWithBlogs.reduce(hasMoreBlogs, authorsWithBlogs[0])
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}