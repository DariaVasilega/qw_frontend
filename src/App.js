import React from 'react';
import LoginForm from './LoginForm';
import { useLocalStorage } from '@uidotdev/usehooks';
import UserCabinet from "./UserCabinet";

export default function App() {
  const [token] = useLocalStorage('token', null)

  return token ? <UserCabinet /> : <LoginForm />;
}