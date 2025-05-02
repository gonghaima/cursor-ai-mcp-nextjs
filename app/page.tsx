'use client';

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: data.message, isError: false });
        setEmail('');
      } else {
        setMessage({ text: data.message || 'Something went wrong', isError: true });
      }
    } catch {
      setMessage({ text: 'Failed to submit. Please try again.', isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center">
          <Image
            src="/levercast-logo.svg"
            alt="Levercast Logo"
            width={140}
            height={32}
            priority
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Turn Raw Ideas Into{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
                Polished Content
              </span>{" "}
              Across Platforms
            </h1>
            <p className="text-xl text-gray-700">
              Levercast helps busy entrepreneurs effortlessly capture, format, and share content
              across multiple social media platforms with just a few clicks.
            </p>
            
            {/* Waitlist Form */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-4">Join the Waitlist</h3>
              <p className="text-gray-600 mb-4">
                Be the first to know when we launch. Get early access and exclusive benefits.
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-800 text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition duration-300 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
                </button>
                {message && (
                  <p className={`text-sm mt-2 ${message.isError ? 'text-red-600' : 'text-green-600'}`}>
                    {message.text}
                  </p>
                )}
              </form>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-2xl bg-white p-8">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Raw Content Input</h3>
              <div className="bg-white border border-gray-300 rounded-md p-3 h-24">
                <p className="text-gray-500">Just dump your ideas here...</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs mr-2">
                    Li
                  </div>
                  <h4 className="font-medium text-blue-800">LinkedIn</h4>
                </div>
                <div className="bg-white border border-gray-300 rounded-md p-3 h-28">
                  <p className="text-sm text-gray-600">Formatted for LinkedIn...</p>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-xs mr-2">
                    X
                  </div>
                  <h4 className="font-medium text-blue-800">Twitter</h4>
                </div>
                <div className="bg-white border border-gray-300 rounded-md p-3 h-28">
                  <p className="text-sm text-gray-600">Formatted for Twitter...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How Levercast Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Capture Ideas Quickly</h3>
            <p className="text-gray-600">
              Enter your raw content ideas and images in seconds. Never lose a creative spark again.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">LLM-Powered Formatting</h3>
            <p className="text-gray-600">
              Our templates automatically format your content for different social platforms, saving hours of work.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Publish Everywhere</h3>
            <p className="text-gray-600">
              Connect your social accounts once and publish with a single click across platforms.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-indigo-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Who Levercast Is For</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">Entrepreneurs & Business Owners</h3>
              <p className="text-gray-600">
                &ldquo;As a busy entrepreneur, I need a quick way to publish across platforms. Levercast
                gives me back hours each week while improving my content quality.&rdquo;
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">Content Creators & Marketers</h3>
              <p className="text-gray-600">
                &ldquo;Creating platform-specific content used to be tedious. With Levercast, I can
                transform my ideas into tailored content for each channel in seconds.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your Content Workflow?
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Join our waitlist today and be among the first to experience the future of multi-platform content publishing.
        </p>
        <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition duration-300 whitespace-nowrap disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
          </button>
        </form>
        {message && (
          <p className={`text-sm mt-4 ${message.isError ? 'text-red-600' : 'text-green-600'}`}>
            {message.text}
          </p>
        )}
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-gray-600 border-t border-gray-200">
        <p>&copy; {new Date().getFullYear()} Levercast. All rights reserved.</p>
      </footer>
    </div>
  );
}
