import React from 'react'

const BlogForm = ({ onSubmit, title, onTitleChange, author, onAuthorChange, url, onUrlChange }) => (
  <form onSubmit={onSubmit}>
      <div>
        title:
        <input 
          type="text"
          value={title}
          name="Title"
          onChange={onTitleChange}
        />
      </div>
      <div>
        author:
        <input 
          type="text"
          value={author}
          name="Author"
          onChange={onAuthorChange}
        />
      </div>
      <div>
        url:
        <input 
          type="text"
          value={url}
          name="Url"
          onChange={onUrlChange}
        />
      </div>
      <button type="submit">save</button>
  </form>
)

export default BlogForm