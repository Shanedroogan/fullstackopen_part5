import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author, but not url and likes by default', () => {
  const user = {
    token: 'a', name: 'Shane', username: 'Shane'
  }
  const blog = {
    title: 'Shane Dorg\'s Great Escape',
    author: 'Syd Legge',
    url: 'www.url.com',
    user: user
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  expect(component.container).toHaveTextContent(
    'Shane Dorg'
  )
  expect(component.container).toHaveTextContent(
    'Syd Legge'
  )
  expect(component.container).not.toHaveTextContent(
    'www.url.com'
  )
  expect(component.container).not.toHaveTextContent(
    'likes'
  )

})