const dummy = (blogs) => {
  blogs.push(1)
  return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0 ? 0
    : blogs.reduce(reducer, 0) 
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) 
        return {}
    let favoriteBlog = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
    let filteredBlog = {
        title:favoriteBlog.title,
        author: favoriteBlog.author,
        likes: favoriteBlog.likes
    }
    return filteredBlog 
  }

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    } else {
        let authorCounts = blogs.reduce((authorCount, blog) => {
            authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
            return authorCount
        }, {})
        let maxCount = Math.max(...Object.values(authorCounts))
        let mostFrequent = Object.keys(authorCounts).filter(author => authorCounts[author] === maxCount)
        return {
            author: mostFrequent[0],
            blogs: maxCount
        }
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    } else {
        let likesCounts = blogs.reduce((likesCount, blog) => {
            likesCount[blog.author] = (likesCount[blog.author] || 0) + blog.likes
            return likesCount
        }, {})
        let maxCount = Math.max(...Object.values(likesCounts))
        let mostLiked = Object.keys(likesCounts).filter(author => likesCounts[author] === maxCount)
        return {
            author: mostLiked[0],
            likes: maxCount
        }
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}