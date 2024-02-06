// page.js

'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [text, setText] = useState('');
  const [snomedResponse, setSnomedResponse] = useState(null);
  const [fetching, setFetching] = useState(false);

  const handleSubmit = async () => {
    console.log(text);

    if (text.trim() === '') {
      return alert('Please enter a valid procedure name');
    }

    const dataToSend = {
      text: text,
      top_n: 5 // or any other number you wish to specify
    };

    setSnomedResponse(null);

    try {
      setFetching(true);

      const res = await axios.post(process.env.NEXT_PUBLIC_API_URL, dataToSend, {
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
          Malaysian Bot Record Optimizer (MyBRO) Demo
        </p>
      </div>

      <div className='w-full max-w-5xl mb-8'>
        <label htmlFor="procedureInput" className="mb-2 text-lg">Procedure:</label>
        <textarea
          id="procedureInput"
          className='w-full h-40 p-4 border-2 text-black border-gray-300 rounded-lg dark:border-neutral-800'
          value={text}
          placeholder='Enter procedure name here'
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

      <div className='w-full max-w-5xl'>
        <div className='rounded-lg border border-transparent px-5 py-4 transition-colors'>
          <h2 className={`text-2xl font-semibold mb-4`}>
            Table{' '}
          </h2>
          <div className='overflow-x-auto'>
            {snomedResponse ? (
              <table className='w-full table-fixed divide-y divide-gray-200 shadow-sm'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Code
                    </th>
                    <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Description
                    </th>
                    <th className='px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {snomedResponse[0].predictions.map((item, index) => (
                    <tr key={index}>
                      <td className='px-3 py-2 whitespace-nowrap text-sm text-gray-500'>
                        {item.code}
                      </td>
                      <td className='px-3 py-2 text-sm text-gray-500'>
                        {item.description}
                      </td>
                      <td className='px-3 py-2 whitespace-nowrap text-sm text-gray-500'>
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
