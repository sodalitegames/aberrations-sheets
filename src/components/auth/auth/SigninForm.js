import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signInStart } from '../../../redux/user/user.actions';

import { selectUserError } from '../../../redux/user/user.selectors';

import Notice from '../../shared/Notice';
import SubmitButton from '../../shared/SubmitButton';

export default function SigninForm() {
  const dispatch = useDispatch();

  const error = useSelector(selectUserError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (error) {
      setMessage({ status: error.status, message: error.message });
      setProcessing(false);
    }
  }, [error]);

  const submitHandler = async e => {
    e.preventDefault();

    setProcessing(true);

    if (!email || !password) {
      setMessage({ message: 'You must provide both an email and a password.', status: 'error' });
      setProcessing(false);
      return;
    }

    dispatch(signInStart({ email, password }));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white dark:bg-dark-200 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                autoComplete="email"
                className="input-primary w-full border border-gray-300 dark:border-gray-800 rounded-md"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                autoComplete="current-password"
                className="input-primary w-full border border-gray-300 dark:border-gray-800 rounded-md"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary dark:focus:ring-primary-fade dark:bg-dark-400 border-gray-300 dark:border-gray-800 rounded"
                checked
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="https://aberrations-rpg.com/auth/forgot-password" target="_blank" rel="noreferrer" className="text-link-accent3">
                Forgot your password?
              </a>
            </div>
          </div>

          {message ? <Notice message={message.message} status={message.status} /> : null}

          <div>
            <SubmitButton type="primary" text="Sign in" loading={processing} />
          </div>
        </form>
      </div>
    </div>
  );
}
