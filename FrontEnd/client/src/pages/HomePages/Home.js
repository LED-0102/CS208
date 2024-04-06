// import React from "react";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { FaRegUser } from "react-icons/fa6";
// import { GrNotes } from "react-icons/gr";
// import { GoArrowUpRight } from "react-icons/go";
// import { RiBillLine } from "react-icons/ri";
// import { LuDot } from "react-icons/lu";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import "./utility.css"
// import "./home.css";


// const Home = () => {
//   const works = [
//     { title: "Leave application" },
//     { title: "Leave Application Recommended" },
//     { title: "Leave Application Approved" },
//     { title: "Leave Application Rejected" },
//     { title: "Approved Leave Cancel Request" },
//   ];

//   const WorkDisplay = ({ work }) => (
//     <div className="cssFlex cssAlignItemsCenter cssAlignItemsCenter hpContentOptions">
//       <div className="cssFlex cssJustifyBetween cssAlignItemsCenter hpContentOptionsText">
//         <span className="ml-2">{work.title}</span>
//         <GoArrowUpRight className="mr-2" />
//       </div>
//       <div className="hpLuDot cssFlex">
//         <LuDot />
//         <span>0</span>
//       </div>
//     </div>
//   );

//   return (
//     <div className="hp">
//       <div className="bootcontainer hpExtend">
//         <div className="cssFlex cssAlignItemsCenter cssJustifyBetween">
//             <div className="cssFlex cssAlignItemsCenter hpLeftFlexGap">
//               <RxHamburgerMenu className="homehamberger" size={"2em"} />
//               <p className="hpHeader">HR-EMP</p>
//             </div>
//             <div className="cssFlex hpTopRightButtonsDiv">
//               <a className="border border-black">
//                 <button className="bg-white text-black h-2">
//                   Create Workspace
//                 </button>
//               </a>
//               <a className="border border-black">
//                 <button className="bg-white text-black h-2">Edit</button>
//               </a>
//             </div>
//         </div>
//         <div className="cssFlex">
//           <div className="homeCssLeftWidth">
//             <div className="cssFlex cssAlignItemsCenter hpLeftFlexGap">
//               <RiArrowDropDownLine className="hpPublicSpan" />
//               <span className="hpPublicSpan hpPublicSpan2">PUBLIC</span>
//             </div>
//             <div className="cssFlex cssAlignItemsCenter hpLeftFlexGap hpLeftIcons hpLeftFirstIcon hpLeftIconsactive">
//               <FaRegUser />
//               <span>HR-EMP</span>
//             </div>
//             <div className="cssFlex cssAlignItemsCenter hpLeftFlexGap hpLeftIcons">
//               <GrNotes />
//               <span>MMS Section</span>
//             </div>
//           </div>
//           <div className="hpContentContainer">
//             <div className="cssFlex cssFlexWrap hpWorksFlexRev">
//               {works.map((w, index) => (
//                 <WorkDisplay key={index} work={w} />
//               ))}
//             </div>
//             <div className="cssFlex cssSpaceAround hplast_contents">
//                 <div>
//                     <div>
//                         <RiBillLine />
//                         <span>Employee</span>
//                     </div>
//                     <div>
//                         <LuDot />
//                         <span>Employee</span>
//                     </div>
//                 </div>
//                 <div>
//                     <div>
//                         <RiBillLine />
//                         <span>Leave</span>
//                     </div>
//                     <div>
//                         <LuDot />
//                         <span>Leave Type</span>
//                     </div>
//                 </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


// import React, { useEffect } from 'react';
// import Anavbar from '../../components/Navbar/Anavbar';

// const Home = () => {
//   useEffect(() => {
//     // Add event listeners to accordion buttons
//     const accordionButtons = document.querySelectorAll('[data-accordion-target]');
//     accordionButtons.forEach(button => {
//       button.addEventListener('click', () => {
//         const target = button.getAttribute('data-accordion-target');
//         const accordionBody = document.querySelector(target);
//         accordionBody.classList.toggle('hidden');
//       });
//     });
//   }, []);

//   return (
//     <div>
//       <Anavbar /> 
      
//       <div id="accordion-collapse" data-accordion="collapse" className=' mt-44'>
//         <h2 id="accordion-collapse-heading-1">
//           <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
//             <span>What is Flowbite?</span>
//             <svg className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
//             </svg>
//           </button>
//         </h2>
//         <div id="accordion-collapse-body-1" className="hidden" aria-labelledby="accordion-collapse-heading-1">
//           <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
//             <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
//             <p className="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

// import React, { useEffect } from 'react';
// import Anavbar from '../../components/Navbar/Anavbar';

// const Home = () => {
//   useEffect(() => {
//     const handleClick = (event) => {
//       const button = event.target.closest('[data-accordion-target]');
//       if (button) {
//         const target = button.getAttribute('data-accordion-target');
//         const accordionBody = document.querySelector(target);
//         accordionBody.classList.toggle('hidden');
//       }
//     };

//     // Attach event listener to the document for click events
//     document.addEventListener('click', handleClick);

//     // Cleanup function to remove event listener when component unmounts
//     return () => {
//       document.removeEventListener('click', handleClick);
//     };
//   }, []);

//   return (
//     <div>
//       <Anavbar /> 
      
//       <div id="accordion-collapse" data-accordion="collapse" className='mt-44'>
//         <h2 id="accordion-collapse-heading-1">
//           <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
//             <span>What is Flowbite?</span>
//             <svg className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
//             </svg>
//           </button>
//         </h2>
//         <div id="accordion-collapse-body-1" className="hidden" aria-labelledby="accordion-collapse-heading-1">
//           <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
//             <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
//             <p className="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
//           </div>
//         </div>
//       </div>
      
//     </div>
//   );
// }

// export default Home;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Anavbar from '../../components/Navbar/Anavbar';

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
              <Link to='/displayPendingForm/:formName/:formId' className="mb-2 text-white font-bold dark:text-gray-400 bg-green-300 w-32 rounded-3xl text-center p-4">SS04</Link>
              <Link to='/displayPendingForm/:formName/:formId' className="mb-2 text-white font-bold dark:text-gray-400 bg-green-300 w-32 rounded-3xl text-center p-4">MM04</Link>
              <Link to='/displayPendingForm/:formName/:formId' className="mb-2 text-white font-bold dark:text-gray-400 bg-green-300 w-32 rounded-3xl text-center p-4">E01</Link>
              <Link to='/displayPendingForm/:formName/:formId' className="mb-2 text-white font-bold dark:text-gray-400 bg-green-300 w-32 rounded-3xl text-center p-4">FURNITURE</Link>
              <Link to='/displayPendingForm/:formName/:formId' className="mb-2 text-white font-bold dark:text-gray-400 bg-green-300 w-32 rounded-3xl text-center p-4">R1</Link>
              <Link to='/displayPendingForm/:formName/:formId' className="mb-2 text-white font-bold dark:text-gray-400 bg-green-300 w-32 rounded-3xl text-center p-4">SS01</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Third Accordion Item */}
      <div id="accordion-collapse" data-accordion="collapse">
        <h2 id="accordion-collapse-heading-3">
          <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-3" aria-expanded="true" aria-controls="accordion-collapse-body-3">
          <span className='font-bold'>BUDGET</span>
            <svg className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
            </svg>
          </button>
        </h2>
        <div id="accordion-collapse-body-3" className="hidden" aria-labelledby="accordion-collapse-heading-3">
          <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <p className='mb-2 text-lg'>To see the budget click below</p>
            <div className='flex flex-col'>
              <Link to='/budget' className="mb-2 text-white font-bold dark:text-gray-400 bg-green-300 w-36 rounded-3xl text-center p-4">Check Budget</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

