import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const GET_USER = gql`
  query {
    me {
      username,
      favoriteGenre
    }
  }
`

export const GET_AUTHORS = gql`
  query {
    allAuthors  {
      name,
      born,
      bookCount,
      id
    }
  }
`

export const GET_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
    addBook (
      title: $title,
      author: $author, 
      published: $published,
      genres: $genres,
    ) {
      title,
      author {
        name
      }
      published,
      genres,
      id
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name,
      born,
      id,
    }
  }
`
