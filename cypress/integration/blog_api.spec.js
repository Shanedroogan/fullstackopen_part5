describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Shane',
      username: 'Shane',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login button appears first', function() {
    cy.contains('login').click()
  })

  describe('Login', function() {
    it('user can log in', function() {
      cy.contains('login').click()
      cy.get('#username').type('Shane')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
  
      cy.contains('Shane logged in')
    })
  
    it('user denied if wrong password', function() {
      cy.contains('login').click()
      cy.get('#username').type('Shane')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
  
      cy.contains('Wrong Username or Password')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Shane', password: 'secret' })
    })

    it('new blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('Test Title')
      cy.get('#author').type('Ghost Writer')
      cy.get('#url').type('www.test.com')

      cy.contains('save').click()

      cy.contains('Test Title Ghost Writer')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Test Title',
          author: 'Ghost Writer',
          url: 'www.test.com'
        })
      })

      it('it can be liked', function() {
        cy.contains('show').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('it can be deleted', function() {
        cy.contains('show').click()
        cy.contains('delete').click()
        cy.should('not.contain', 'Test Title')
      })
    })

    describe('and multiple blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'title1',
          author:'author1',
          url: 'www.1.com',
          likes: '1'
        })
        cy.createBlog({
          title: 'title2',
          author:'author2',
          url: 'www.2.com',
          likes: '2'
        })
        cy.createBlog({
          title: 'title3',
          author:'author3',
          url: 'www.3.com',
          likes: '3'
        })
      })

      it.only('blogs ordered by likes', function() {
        cy.get('.blog').children().children().click({ multiple:true })

        cy.get('.blog')
          .then(blogs => {
            expect(blogs[0].innerHTML).contains('likes 3')
            expect(blogs[1].innerHTML).contains('likes 2')
            expect(blogs[2].innerHTML).contains('likes 1')
          })
      })
    })
  })
})