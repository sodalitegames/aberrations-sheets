import { useState } from 'react';
import { Link } from 'react-router-dom';

import { CheckCircleIcon, XCircleIcon, ExclamationIcon, InformationCircleIcon, XIcon } from '@heroicons/react/solid';

import classNames from '../../utils/classNames';

const NoticeIcon = ({ status }) => {
  return (
    <>
      {status === 'success' ? <CheckCircleIcon className="h-5 w-5 text-green-400 dark:text-green-500" aria-hidden="true" /> : null}
      {status === 'info' ? <InformationCircleIcon className="h-5 w-5 text-blue-400 dark:text-blue-500" aria-hidden="true" /> : null}
      {status === 'warn' ? <ExclamationIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" /> : null}
      {status === 'error' || status === 'fail' ? <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" /> : null}
    </>
  );
};

const NoticeText = ({ status, message, link, bold, heading }) => {
  if (heading) {
    return (
      <h3
        className={classNames(
          status === 'success' ? 'text-green-800 dark:text-green-400' : '',
          status === 'info' ? 'text-blue-800 dark:text-blue-400' : '',
          status === 'warn' ? 'text-yellow-800 dark:text-yellow-400' : '',
          status === 'error' || status === 'fail' ? 'text-red-800 dark:text-red-400' : '',
          'text-sm font-semibold'
        )}
      >
        {heading}
      </h3>
    );
  }

  return (
    <div
      className={classNames(
        status === 'success' ? 'text-green-700 dark:text-green-400' : '',
        status === 'info' ? 'text-blue-700 dark:text-blue-400' : '',
        status === 'warn' ? 'text-yellow-700 dark:text-yellow-400' : '',
        status === 'error' || status === 'fail' ? 'text-red-700 dark:text-red-400' : '',
        bold ? 'font-semibold' : '',
        'text-sm'
      )}
    >
      {typeof message !== 'string' ? (
        <ul className="list-disc pl-5 space-y-1">
          {message.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      ) : (
        <p>{message}</p>
      )}
      {link ? (
        <>
          {' '}
          <NoticeLink status={status} link={link} />
        </>
      ) : null}
    </div>
  );
};

const NoticeLink = ({ status, link, arrow }) => {
  if (link.external) {
    return (
      <a
        href={link.href}
        className={classNames(
          status === 'success' ? 'text-green-700 dark:text-green-400 hover:text-green-600 dark:hover:text-green-500' : '',
          status === 'info' ? 'text-blue-700 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500' : '',
          status === 'warn' ? 'text-yellow-700 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-500' : '',
          status === 'error' || status === 'fail' ? 'text-red-700 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500' : '',
          arrow ? 'whitespace-nowrap' : '',
          'font-semibold underline'
        )}
      >
        {link.text}{' '}
        {arrow ? (
          <span className="font-semibold" aria-hidden="true">
            &rarr;
          </span>
        ) : null}
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      className={classNames(
        status === 'success' ? 'text-green-700 dark:text-green-400 hover:text-green-600 dark:hover:text-green-500' : '',
        status === 'info' ? 'text-blue-700 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-500' : '',
        status === 'warn' ? 'text-yellow-700 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-500' : '',
        status === 'error' || status === 'fail' ? 'text-red-700 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500' : '',
        arrow ? 'whitespace-nowrap' : '',
        'font-semibold underline'
      )}
    >
      {link.text}{' '}
      {arrow ? (
        <span className="font-semibold" aria-hidden="true">
          &rarr;
        </span>
      ) : null}
    </Link>
  );
};

const NoticeButton = ({ status, link }) => {
  if (link.external) {
    return (
      <a
        href={link.href}
        className={classNames(
          status === 'success'
            ? 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-800 focus:ring-offset-green-50 dark:focus:ring-offset-green-900 focus:ring-green-600'
            : '',
          status === 'info'
            ? 'bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800 focus:ring-offset-blue-50 dark:focus:ring-offset-blue-900 focus:ring-blue-600'
            : '',
          status === 'warn'
            ? 'bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-800 focus:ring-offset-yellow-50 dark:focus:ring-offset-yellow-900 focus:ring-yellow-600'
            : '',
          status === 'error' || status === 'fail'
            ? 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800 focus:ring-offset-red-50 dark:focus:ring-offset-red-900 focus:ring-red-600'
            : '',
          'px-2 py-1.5 rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 italic'
        )}
      >
        {link.text}
      </a>
    );
  }

  return (
    <Link href={link.href}>
      <a
        href={link.href}
        className={classNames(
          status === 'success'
            ? 'bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-800 focus:ring-offset-green-50 dark:focus:ring-offset-green-900 focus:ring-green-600'
            : '',
          status === 'info'
            ? 'bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800 focus:ring-offset-blue-50 dark:focus:ring-offset-blue-900 focus:ring-blue-600'
            : '',
          status === 'warn'
            ? 'bg-yellow-50 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-800 focus:ring-offset-yellow-50 dark:focus:ring-offset-yellow-900 focus:ring-yellow-600'
            : '',
          status === 'error' || status === 'fail'
            ? 'bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800 focus:ring-offset-red-50 dark:focus:ring-offset-red-900 focus:ring-red-600'
            : '',
          'px-2 py-1.5 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2'
        )}
      >
        {link.text}
      </a>
    </Link>
  );
};

const NoticeCloseButton = ({ status, setShowNotice }) => {
  return (
    <button
      type="button"
      onClick={() => setShowNotice(false)}
      className={classNames(
        status === 'success'
          ? 'bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-800 text-green-500 focus:ring-offset-green-50 dark:focus:ring-offset-green-900 focus:ring-green-600'
          : '',
        status === 'info' ? 'bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 text-blue-500 focus:ring-offset-blue-50 dark:focus:ring-offset-blue-900 focus:ring-blue-600' : '',
        status === 'warn'
          ? 'bg-yellow-50 dark:bg-yellow-900 hover:bg-yellow-100 dark:hover:bg-yellow-800 text-yellow-500 focus:ring-offset-yellow-50 dark:focus:ring-offset-yellow-900 focus:ring-yellow-600'
          : '',
        status === 'error' || status === 'fail'
          ? 'bg-red-50 dark:bg-red-900 hover:bg-red-100 dark:hover:bg-red-800 text-red-500 focus:ring-offset-red-50 dark:focus:ring-offset-red-900 focus:ring-red-600'
          : '',
        'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2'
      )}
    >
      <span className="sr-only">Dismiss</span>
      <XIcon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
};

export default function Notice({ message, status = 'info', link, accent, heading, hideable, noIcon, classes }) {
  const [showNotice, setShowNotice] = useState(true);

  if (!showNotice) {
    return null;
  }

  return (
    <div
      className={classNames(
        status === 'success' ? 'bg-green-50 dark:bg-green-900' : '',
        status === 'info' ? 'bg-blue-50 dark:bg-blue-900' : '',
        status === 'warn' ? 'bg-yellow-50 dark:bg-yellow-900' : '',
        status === 'error' || status === 'fail' ? 'bg-red-50 dark:bg-red-900' : '',
        status === 'success' && accent ? 'border-l-4 border-green-400 dark:border-green-500' : '',
        status === 'info' && accent ? 'border-l-4 border-blue-400 dark:border-blue-500' : '',
        status === 'warn' && accent ? 'border-l-4 border-yellow-400 dark:border-yellow-500' : '',
        (status === 'error' && accent) || (status === 'fail' && accent) ? 'border-l-4 border-red-400 dark:border-red-500' : '',
        !accent ? 'rounded-md' : '',
        'p-4 my-1',
        classes
      )}
    >
      <div className="flex">
        {/* Icon */}
        {!noIcon ? (
          <div className="shrink-0">
            <NoticeIcon status={status} />
          </div>
        ) : null}

        {/* If heading was provided */}
        {heading ? (
          <div className="ml-3">
            <NoticeText status={status} heading={heading} />
            <div className="mt-2">
              <NoticeText status={status} message={message} />
            </div>
            {link ? (
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <NoticeButton status={status} link={link} />
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {/* If no heading was provided */}
        {!heading && link && link.inline ? (
          <div className="ml-3">
            <NoticeText status={status} message={message} link={link} />
          </div>
        ) : !heading && link ? (
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <NoticeText status={status} message={message} />
            <p className="mt-3 text-sm md:mt-0 md:ml-6">
              <NoticeLink status={status} link={link} arrow />
            </p>
          </div>
        ) : !heading ? (
          <div className="ml-3">
            <NoticeText status={status} message={message} />
          </div>
        ) : null}

        {/* If configure to be hideable */}
        {hideable ? (
          <div className="ml-auto pl-6">
            <div className="-mx-1.5 -my-1.5">
              <NoticeCloseButton status={status} setShowNotice={setShowNotice} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
