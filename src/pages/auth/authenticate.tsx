import { useState, useEffect } from 'react';

import SigninForm from '../../components/auth/SigninForm';
import SignupForm from '../../components/auth/SignupForm';

const AuthenticatePage = () => {
  const [hasAccount, setHasAccount] = useState(!!localStorage.getItem('hasAccount'));

  useEffect(() => {
    if (hasAccount) {
      document.title = 'Sign in | Aberrations RPG Sheets';
    } else {
      document.title = 'Sign up | Aberrations RPG Sheets';
    }
  }, [hasAccount]);

  return (
    <div className="min-h-screen bg-white dark:bg-black dark:text-gray-300 relative flex flex-col justify-between">
      <div>
        <div className="max-w-7xl mx-auto">
          <main className="px-4 sm:px-6 lg:px-8 py-10">
            {hasAccount ? (
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold">Sign in to Aberrations RPG</h2>

                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
                  Or{' '}
                  <button className="text-link-accent3 font-normal" onClick={() => setHasAccount(false)}>
                    create an account
                  </button>{' '}
                  if you haven&lsquo;t already
                </p>
              </div>
            ) : (
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold">Create my Aberrations RPG account</h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
                  Or{' '}
                  <button className="text-link-accent3 font-normal" onClick={() => setHasAccount(true)}>
                    sign in
                  </button>{' '}
                  if you already have an account
                </p>
              </div>
            )}
            {/* Signin and Signup Forms */}
            {hasAccount ? <SigninForm /> : <SignupForm />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatePage;
