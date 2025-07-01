
const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const reducer = (sum, current) => {
        return sum + current.likes;
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;
    const reducer = (max, current) => {
        return max.likes > current.likes? max: current;
    }
    return blogs.reduce(reducer, {likes:0})
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) return null;

    const reducer = (best, current) => {
        best[current.author] = (best[current.author] || 0)+1;
        return best;
    }
    const counts= blogs.reduce(reducer, {});

    let maxBlogs = 0
    let maxAuthor = '';
    for(const author in counts) {
        if(counts[author] > maxBlogs) {
            maxBlogs = counts[author];
            maxAuthor = author;
        }
    }

    return {
        author: maxAuthor,
        blogs: maxBlogs
    }
}

const mostLikes = (blogs) => {
    if(blogs.length === 0) return null;

    const reducer = (best, current) => {
        best[current.author] = (best[current.author] || 0) + current.likes;
        return best;
    }
    const counts= blogs.reduce(reducer, {});
    let likes = 0;
    let maxAuthor = '';
    for(const author in counts) {
        if(counts[author] > likes) {
            maxAuthor = author
            likes = counts[author];
        }
    }
    return {
        author: maxAuthor,
        likes
    }
}

export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };