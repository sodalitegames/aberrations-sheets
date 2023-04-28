import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signInStart } from '../../redux/user/user.actions';

import { selectUserSignin } from '../../redux/user/user.selectors';

import Notice from '../Notice';
import SubmitButton from '../forms/elements/SubmitButton';

export default function SigninForm() {
  const dispatch = useDispatch();

  const signin = useSelector(selectUserSignin);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('');

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (signin.message) {
      setNotice({ status: signin.message.status, message: signin.message.message });
      setProcessing(false);
    }

    if (signin.error) {
      setNotice({ status: signin.error.status, message: signin.error.message });
      setProcessing(false);
    }
  }, [signin]);

  const submitHandler = async e => {
    e.preventDefault();

    setProcessing(true);

    if (!email || !password) {
      setNotice({ message: 'You must provide both an email and a password.', status: 'error' });
      setProcessing(false);
      return;
    }

    dispatch(signInStart({ email, password }));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="px-4 py-8 bg-white shadow dark:bg-dark-200 sm:rounded-lg sm:px-10">
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

          {notice ? <Notice message={notice.message} status={notice.status} /> : null}

          <div>
            <SubmitButton type="primary" text="Sign in" loading={processing} />
          </div>

          <div className="text-sm text-center">
            <a href="https://aberrations-rpg.com/auth/forgot-password" target="_blank" rel="noreferrer" className="text-link-accent3">
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
