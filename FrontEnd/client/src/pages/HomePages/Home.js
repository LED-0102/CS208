import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    const handleClick = (event) => {
      const button = event.target.closest('[data-accordion-target]');
      if (button) {
        const target = button.getAttribute('data-accordion-target');
        const accordionBody = document.querySelector(target);
        accordionBody.classList.toggle('hidden');
      }
    };

    // Attach event listener to the document for click events
    document.addEventListener('click', handleClick);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div>
      
      {/* First Accordion Item */}
      <div id="accordion-collapse" data-accordion="collapse">
        <h2 id="accordion-collapse-heading-1">
          <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
            <span className='font-bold'>FILL FORMS</span>
            <svg className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
            </svg>
          </button>
        </h2>
        <div id="accordion-collapse-body-1" className="hidden" aria-labelledby="accordion-collapse-heading-1">
          <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <p className='mb-2 text-lg'>Select the form you want to fill</p>
            <div className='flex flex-col'>
              <Link to='/SS04' className="mb-2 text-white font-bold dark:text-gray-400 bg-green-300 w-32 rounded-3xl text-center p-4">SS04</Link>
              <Link to='/MM04' className="mb-2 text-white font-bold dark:text-gray-400 bg-green-300 w-32 rounded-3xl text-center p-4">MM04</Link>
              <Link to='/e01' className="mb-2 text-white font-bold dark:text-gray-400 bg-green-300 w-32 rounded-3xl text-center p-4">E01</Link>
              <Link to='/Furniture' className="mb-2 text-white font-bold dark:text-gray-400 bg-green-300 w-32 rounded-3xl text-center p-4">FURNITURE</Link>
              <Link to='/r1' className="mb-2 text-white font-bold dark:text-gray-400 bg-green-300 w-32 rounded-3xl text-center p-4">R1</Link>
              <Link to='/SS01' className="mb-2 text-white font-bold dark:text-gray-400 bg-green-300 w-32 rounded-3xl text-center p-4">SS01</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Second Accordion Item */}
      <div id="accordion-collapse" data-accordion="collapse">
        <h2 id="accordion-collapse-heading-2">
          <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-2" aria-expanded="true" aria-controls="accordion-collapse-body-2">
          <span className='font-bold'>VIEW FORMS</span>
            <svg className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
            </svg>
          </button>
        </h2>
        <div id="accordion-collapse-body-2" className="hidden" aria-labelledby="accordion-collapse-heading-2">
          <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <p className='mb-2 text-lg'>Select the form you want to see</p>
            <div className='flex flex-col'>
              <Link to='/displayPendingForm' className="mb-2 text-white font-bold dark:text-gray-400 bg-green-300 w-32 rounded-3xl text-center p-4">Pending Form</Link>
              <Link to='/displayPreviousForm' className="mb-2 text-white font-bold dark:text-gray-400 bg-green-300 w-32 rounded-3xl text-center p-4">Previous Form</Link>
              <Link to='/displaySeekingForm' className="mb-2 text-white font-bold dark:text-gray-400 bg-green-300 w-32 rounded-3xl text-center p-4">Seeking Form</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Third Accordion Item */}
      <div id="accordion-collapse" data-accordion="collapse">
        <h2 id="accordion-collapse-heading-3">
          <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-3" aria-expanded="true" aria-controls="accordion-collapse-body-3">
          <span className='font-bold'>LABS</span>
            <svg className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
            </svg>
          </button>
        </h2>
        <div id="accordion-collapse-body-3" className="hidden" aria-labelledby="accordion-collapse-heading-3">
          <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <p className='mb-2 text-lg'>Book Labs</p>
            <div className='flex flex-col'>
              <Link to='/booklab' className="mb-2 text-white font-bold dark:text-gray-400 bg-green-300 w-36 rounded-3xl text-center p-4">Proceed to labs</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

