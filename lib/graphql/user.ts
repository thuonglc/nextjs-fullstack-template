import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  # User login
  mutation login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
    }
  }
`;
