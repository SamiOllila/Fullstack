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
    console.log(`Blogs: ${blogs}`)
    console.log(`Blog 0: ${blogs[0]}`)
    console.log(`Blog 0 author: ${blogs[0].author}`)
    const getAuthor = (acc, cur) => {
      console.log(`acc: ${acc}, cur: ${cur}, cur.author: ${cur.author}`)
      if (!acc.includes(cur.author)) {
        acc.push(cur.author)
        return acc
      }
      return acc
    }
    return blogs.reduce(getAuthor, [ blogs[0].author ])
  }
  const authors = getAuthors(blogs)
  console.log(`Final authors: ${authors}`)
  console.log(`Final author 0: ${authors[0]}`)
  const countAuthorBlogs = (blogs, author) => {
    const authorBlogs = blogs.filter(blog => blog.author === author)
    console.log(`Author blogs: ${authorBlogs.length}`)
    return authorBlogs.length
  }
  const authorsWithBlogs = authors.map(author => {
    [ {
      author: `${author}`,
      blogs: countAuthorBlogs(blogs, author)
    } ]
    console.log(`New author object: ${[ {
      author: `${author}`,
      blogs: countAuthorBlogs(blogs, author)}
    ]}`)
  })
  console.log(`AuthorsWithBlogs: ${authorsWithBlogs}`)
  console.log(`AuthorsWithBlogs 0: ${authorsWithBlogs[0]}`)
  const hasMoreBlogs = (acc, cur) => {
    if (acc.blogs > cur.blogs) {
      return acc
    }
    return cur
  }
  return authorsWithBlogs.reduce(hasMoreBlogs, authorsWithBlogs[0])
}


const mostLikes = (blogs) => {
  if (!blogs) {
    return {}
  }
  const getAuthors = (blogs) => {
    console.log(`Blogs: ${blogs}`)
    console.log(`Blog 0: ${blogs[0]}`)
    console.log(`Blog 0 author: ${blogs[0].author}`)
    const getAuthor = (acc, cur) => {
      console.log(`acc: ${acc}, cur: ${cur}, cur.author: ${cur.author}`)
      if (!acc.includes(cur.author)) {
        acc.push(cur.author)
        return acc
      }
      return acc
    }
    return blogs.reduce(getAuthor, [ blogs[0].author ])
  }
  const authors = getAuthors(blogs)
  const countAuthorLikes = (blogs, author) => {
    const authorBlogs = blogs.filter(blog => blog.author === author)
    return totalLikes(authorBlogs)
  }
  const authorsWithLikes = authors.map(author => {
    {
      author: `${author}`,
      likes: countAuthorLikes(blogs, author)
    }
  })
  return favoriteBlog(authorsWithLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}