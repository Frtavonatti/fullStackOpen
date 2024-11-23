import { useState } from "react"

const BlogForm = ({ createNewBlog, addBlogVisible, setAddBlogVisible}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [link, setLink] = useState('')

    const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

    const addBlog = (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: link
        }
        createNewBlog(newBlog)
        setTitle('')
        setAuthor('')
        setLink('')
    }

    return (
    <>
        <div style={hideWhenVisible}>
            <button onClick={() => setAddBlogVisible(!addBlogVisible)}> Create a new Blog </button>            
        </div>

            
        <div style={showWhenVisible}>
            <form 
                onSubmit={addBlog}
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

                <button type='submit' onClick={() => setAddBlogVisible(false)}> Create </button>
            </form>
        </div>

    </>
    )
}

export default BlogForm