import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from "@testing-library/dom"
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

test('clicking the show button shows likes and url', () => {
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

  const button = component.getByText('show')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    blog.url
  )

  expect(component.container).toHaveTextContent(
    'likes'
  )
})

test('clicking the show button shows likes and url', () => {
  const user = {
    token: 'a', name: 'Shane', username: 'Shane'
  }
  const blog = {
    title: 'Shane Dorg\'s Great Escape',
    author: 'Syd Legge',
    url: 'www.url.com',
    user: user
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} likeBlog={mockHandler} />
  )

  const showButton = component.getByText('show')
  fireEvent.click(showButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})