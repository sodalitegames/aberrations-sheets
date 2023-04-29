import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectCurrentUser, selectToken } from '../../redux/user/user.selectors';

import SigninForm from '../../components/auth/SigninForm';

const AuthenticatePage = () => {
  const token = useSelector(selectToken);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    document.title = 'Sign in | Aberrations RPG Sheets';
  }, []);

  if (token && !currentUser) {
    return (
      <div className="relative flex flex-col justify-between min-h-screen bg-white dark:bg-black dark:text-gray-300">
        <div>
          <div className="mx-auto max-w-7xl">
            <main className="px-4 py-10 sm:px-6 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-3xl font-extrabold text-center">Your account is not set up</h2>

                <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
                  You can{' '}
                  <a href={`${process.env.REACT_APP_WEBSITE_URL}/auth/account-setup`} target="_blank" rel="noreferrer" className="font-normal text-link-accent3">
                    finish setting it up
                  </a>{' '}
                  on our website, then come back here.
                </p>
              </div>

              {/* Setup Button */}
              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="px-4 py-8 bg-white shadow dark:bg-dark-200 sm:rounded-lg sm:px-10">
                  <a href={`${process.env.REACT_APP_WEBSITE_URL}/auth/account-setup`} target="_blank" rel="noreferrer" className="w-full btn-primary">
                    Set up my account &rarr;
                  </a>

                  <div className="mt-8 text-sm text-center">
                    <a href={`${process.env.REACT_APP_SELF}`} className="text-link-accent3">
                      I'm back and ready to go...
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col justify-between min-h-screen bg-white dark:bg-black dark:text-gray-300">
      <div>
        <div className="mx-auto max-w-7xl">
          <main className="px-4 py-10 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-3xl font-extrabold text-center">Sign in to Aberrations RPG</h2>

              <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
                Or{' '}
                <a href={`${process.env.REACT_APP_WEBSITE_URL}/auth/signup`} target="_blank" rel="noreferrer" className="font-normal text-link-accent3">
                  create an account
                </a>{' '}
                on our website, then come back here.
              </p>
            </div>

            {/* Signin Form */}
            <SigninForm />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatePage;
