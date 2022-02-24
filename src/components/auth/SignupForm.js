import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signUpStart } from '../../redux/user/user.actions';

import { selectUserError } from '../../redux/user/user.selectors';

import Notice from '../Notice';
import SubmitButton from '../forms/elements/SubmitButton';

export default function SignupForm() {
  const dispatch = useDispatch();

  const error = useSelector(selectUserError);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [subscribe, setSubscribe] = useState(true);

  const [message, setMessage] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (error) {
      setMessage({ status: 'error', message: error.message });
      setProcessing(false);
    }
  }, [error]);

  const submitHandler = async e => {
    e.preventDefault();
    setProcessing(true);

    if (!name || !email || !password || !passwordConfirm) {
      setMessage({ message: 'You must fill out all fields.', status: 'error' });
      setProcessing(false);
      return;
    }

    if (password !== passwordConfirm) {
      setMessage({ status: 'fail', message: 'Passwords do not match.' });
      setProcessing(false);
      return;
    }

    dispatch(signUpStart({ name, email, password, passwordConfirm, subscribe }));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="px-4 py-8 bg-white shadow dark:bg-dark-200 sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                autoComplete="name"
                className="w-full border border-gray-300 rounded-md input-primary dark:border-gray-800"
                onChange={e => setName(e.target.value)}
              />
            </div>
          </div>

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
                className="w-full border border-gray-300 rounded-md input-primary dark:border-gray-800"
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
                className="w-full border border-gray-300 rounded-md input-primary dark:border-gray-800"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="passwordConfirm" className="block text-sm font-medium">
              Confirm Password
            </label>
            <div className="mt-1">
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                value={passwordConfirm}
                autoComplete="confirm-password"
                className="w-full border border-gray-300 rounded-md input-primary dark:border-gray-800"
                onChange={e => setPasswordConfirm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary dark:focus:ring-primary-fade dark:bg-dark-400 dark:border-gray-800"
                checked={subscribe}
                onChange={() => setSubscribe(!subscribe)}
              />
              <label htmlFor="remember-me" className="block ml-2 text-sm">
                Sign me up for the mailing list
              </label>
            </div>
          </div>

          {message ? <Notice message={message.message} status={message.status} /> : null}

          <div>
            <SubmitButton type="primary" text="Create my account" loading={processing} />
          </div>
        </form>
      </div>
    </div>
  );
}
