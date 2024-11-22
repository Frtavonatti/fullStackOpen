const BlogForm = ({ title, setTitle, author, setAuthor, link, setLink, createNewBlog }) => {

    return (
        <form 
            onSubmit={createNewBlog}
            style={{ 
                display:'flex', 
                flexDirection:'column', 
                maxWidth: '400px',
                margin: '0 auto'
            }}>
        
            <h2>Add a new blog: </h2>

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
    )
}

export default BlogForm