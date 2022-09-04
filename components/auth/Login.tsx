import { useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { Box, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import { LOGIN_MUTATION } from '../../lib/graphql';
import { LoginPayload } from '../../types';

interface LoginProps {
  identifierText: string;
  passwordText: string;
  loginText: string;
}

const ContentStyle = styled(Box)(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export function Login({ identifierText, passwordText, loginText }: LoginProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const [login, { data, loading, error }] = useMutation<LoginPayload>(
    LOGIN_MUTATION,
    {
      variables: { identifier, password },
    }
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (identifier && password) {
      login();
    }
  };

  return (
    <Container maxWidth="sm">
      <form>
        <ContentStyle>
          {error && (
            <Typography variant="body2" gutterBottom>
              {error.message}
            </Typography>
          )}
          <TextField
            name="identifier"
            placeholder={identifierText}
            onChange={(e) => setIdentifier(e.target.value)}
            size="small"
          />
          <TextField
            name="password"
            placeholder={passwordText}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
          />
          <LoadingButton
            size="small"
            onClick={handleSubmit}
            loading={loading}
            loadingIndicator="Loading…"
            variant="outlined"
          >
            {loginText}
          </LoadingButton>
        </ContentStyle>
      </form>
    </Container>
  );
}
