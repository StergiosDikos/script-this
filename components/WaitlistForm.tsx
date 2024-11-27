'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [email2, setEmail2] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage1, setSuccessMessage1] = useState<string | null>(null);
  const [successMessage2, setSuccessMessage2] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/submit-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email2 }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to submit email');
      }

      setStatus('success');
      setEmail('');
      setEmail2('');
      setSuccessMessage1('Successfully joined waitlist');
      setSuccessMessage2('Successfully joined waitlist');
    } catch (error) {
      console.error('Form error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {successMessage1 && <p className="text-green-600">{successMessage1}</p>}
      </div>
      <div className="flex gap-2">
        <input
          type="email"
          value={email2}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail2(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {successMessage2 && <p className="text-green-600">{successMessage2}</p>}
      </div>
      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {status === 'loading' ? 'Submitting...' : 'Join Waitlist'}
      </button>
      {status === 'error' && (
        <p className="text-red-600">Error: {errorMessage}</p>
      )}
    </form>
  );
} 