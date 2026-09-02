'use client'

import { useState, SetStateAction } from 'react'
import { users } from '@/data/users'
import Modal from './Modal'
import { useAuthContext } from '@/contexts/AuthContext'
import { AuthContextType } from '@/types/user'

interface LogInFormModalProps {
  open: boolean,
  handleClose: (value: boolean) => void
}

const Form = ({ open, handleClose }: LogInFormModalProps) => {
  const { setUser } = useAuthContext() as AuthContextType
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [formError, setFormError] = useState<string | null>(null)

  const handleUserName = (e: { target: { value: SetStateAction<string> } }) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e: { target: { value: SetStateAction<string> } }) => {
    setPassword(e.target.value)
  }

  const handleLogIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (!username || !password) {
      setFormError('Username and password are required.');
      return;
    }

    const loggedInUser = users.find(u => u.username === username && u.password === password);

    if (!loggedInUser) {
      setFormError('Incorrect username or password.');
      return;
    }

    setUser(loggedInUser);
    handleClose(false);

  }

  return (
    <Modal open={open} onClose={() => handleClose(false)}>
      <form onSubmit={handleLogIn} className='flex flex-col gap-4'>
        <h2 className='text-lg font-medium text-center p-2 uppercase'>Log In</h2>
        {formError && (
          <p className="text-accent-two text-sm text-center mb-2">
            {formError}
          </p>
        )}
        <div className='flex flex-col gap-1'>
          <label htmlFor='username' className='text-sm font-medium uppercase'>Username</label>
          <input id='username' placeholder='Enter username here' className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-one' onChange={handleUserName} value={username} />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='password' className='text-sm font-medium uppercase'>Password</label>
          <input id='password' type='password' placeholder='Enter your password here' className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-one' onChange={handlePassword} value={password} />
        </div>
        <button type='submit' className='bg-accent-one rounded text-white p-4'>Log In</button>
      </form>
    </Modal>
  )
}

export default Form;