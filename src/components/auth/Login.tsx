import { useState } from 'react';
import { fbLogin } from '../../utils/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validation function must be HERE

    const result = await fbLogin(email, password);
    console.log(result);
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <button>Log In</button>
    </form>
  );
};

export default Login;