import { useEffect } from 'react';

import SigninForm from '../../components/auth/SigninForm';

const AuthenticatePage = () => {
  useEffect(() => {
    document.title = 'Sign in | Aberrations RPG Sheets';
  }, []);

  return (
    <div className="relative flex flex-col justify-between min-h-screen bg-white dark:bg-black dark:text-gray-300">
      <div>
        <div className="mx-auto max-w-7xl">
          <main className="px-4 py-10 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h2 className="mt-6 text-3xl font-extrabold text-center">Sign in to Aberrations RPG</h2>

              <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
                Or{' '}
                <a href="https://aberrations-rpg.com/auth/signup" target="_blank" rel="noreferrer" className="font-normal text-link-accent3">
                  create an account
                </a>{' '}
                if you haven&lsquo;t already
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
