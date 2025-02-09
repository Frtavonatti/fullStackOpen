import { gql } from '@apollo/client'

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
  query {
    allBooks {
      title,
      published,
      author,
      id,
      genres
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
      author, 
      published,
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name,
      id,
      born,
    }
  }
`
