import { useState } from 'react';
import { fbRegister } from '../../utils/firebase';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation function must be HERE

    const result = await fbRegister(name, email, password);
    console.log(result);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type='text'
        placeholder='Name' 
        onChange={(e) => setName(e.target.value)}
      />
      <input 
        type='email'
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type='password'
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Create Account</button>
    </form>
  );
};
