import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
const PERSON_DETAILS = gql`
  fragment PersonDetails on Person {
    id
    name
    phone 
    address {
      street 
      city
    }
  }
`

export const ALL_PERSONS = gql`
  ${PERSON_DETAILS}
  query {
    allPersons  {
      ...PersonDetails
    }
  }
`

export const FIND_PERSON = gql`
  ${PERSON_DETAILS}
  query FindPerson($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      ...PersonDetails
    }
  }
`

export const CREATE_PERSON = gql`
  ${PERSON_DETAILS}
  mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
    addPerson(
      name: $name,
      street: $street,
      city: $city,
      phone: $phone
    ) {
      ...PersonDetails
    }
  }
`

export const EDIT_NUMBER = gql`
  ${PERSON_DETAILS}
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone)  {
      ...PersonDetails
    }
  }
`