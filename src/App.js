import React from 'react';
import LoginForm from './LoginForm';
import { useLocalStorage } from '@uidotdev/usehooks';

export default function App() {
  const [token] = useLocalStorage('token', null)

  return token ? (<div>test</div>) : <LoginForm />;
}