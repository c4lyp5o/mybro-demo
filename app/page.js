'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [text, setText] = useState('');
  const [snomedResponse, setSnomedResponse] = useState(null);
  const [fetching, setFetching] = useState(false);

  const handleSubmit = async () => {
    console.log(text);

    if (text === '') {
      return alert('Please enter a valid json structure');
    }

    let jsonised;
    try {
      jsonised = JSON.parse(text);
    } catch (err) {
      return alert('Not a valid json structure');
    }

    setSnomedResponse(null);

    try {
      setFetching(true);

      const res = await axios.post(process.env.NEXT_PUBLIC_API_URL, jsonised, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
        },
      });

      console.log(res.data);
      setSnomedResponse(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setFetching(false);
    }
  };

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <p className='fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30'>
          myBRO Demo
        </p>
      </div>

      <div className='flex flex-col items-center'>
        Diagnosis:{' '}
        <textarea
          className='w-full h-40 p-4 border-2 text-black border-gray-300 rounded-lg dark:border-neutral-800'
          value={text}
          placeholder='Enter your symptoms here'
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button
          type='button'
          className='mt-2 p-2 text-white rounded-lg border border-1 border-black dark:border-white hover:bg-grey-200 dark:hover:bg-grey-800'
          onClick={handleSubmit}
          disabled={fetching}
        >
          {fetching ? 'Fetching...' : 'Submit'}
        </button>
      </div>

      <div className='mt-5 mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left'>
        <div className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            JSON Response{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className={`m-0 text-sm opacity-50`}>
            {snomedResponse
              ? JSON.stringify(snomedResponse, null, 2)
              : 'Waiting for response'}
          </p>
        </div>

        <div className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30'>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Table{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <div className='overflow-x-auto'>
            {snomedResponse ? (
              <table className='min-w-full divide-y divide-gray-200 shadow-sm'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Code
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Description
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {snomedResponse[0].predictions.map((item, index) => (
                    <tr key={index}>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer hover:text-blue-600 hover:underline'>
                        {item.code}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {item.description}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {item.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className={`m-0 text-sm opacity-50`}>Waiting for response</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
