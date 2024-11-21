import Blog from './Blog'

const BlogList = ({ blogs, title, setTitle, author, setAuthor, link, setLink, createNewBlog }) => {
    return (
        <>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />)}

            <form 
                onSubmit={createNewBlog}
                style={{ display:'flex', flexDirection:'column' }}
                >

                Title: 
                <input 
                    type="text" 
                    placeholder='Title'
                    name='title'
                    onChange={(event) => { setTitle(event.target.value) }}
                    value={title}
                />
                Author*: 
                <input 
                    type="text" 
                    placeholder='Author'
                    name='author'
                    onChange={(event) => { setAuthor(event.target.value) }}
                    value={author}
                />
                Link*: 
                <input 
                    type="text" 
                    placeholder='Link'
                    name='link'
                    onChange={(event) => { setLink(event.target.value) }}
                    value={link}
                />
                <button type='submit'> Create </button>
            </form>

        </>


    )
}

export default BlogList