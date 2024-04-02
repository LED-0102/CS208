import React from 'react';
import { Link } from 'react-router-dom';
import Anavbar from '../../components/Navbar/Anavbar';

const formsAvailable = [
  {
    name: 'SS04',
    url: '/SS04'
  },
  {
    name: 'SS01',
    url: '/SS01'
  },
  {
    name: 'MM04',
    url: '/MM04'
  },
  {
    name: 'E01',
    url :'/e01'
  },
  {
    name: 'R1',
    url: '/r1'
  },
  {
    name: 'Furniture',
    url : '/Furniture'
  },
];

const PlanCard = ({ plan }) => (
  <div className="bg-blue-50 rounded-lg p-6 text-blue-900 shadow-lg">
    <button className="text-2xl font-bold">
      {plan.name}
    </button>
    <div className="mt-5">
      <Link to={`${plan.url}`}><button className="text-lg font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-full py-2 px-6 transition duration-300 ease-in-out">Fill Form</button></Link>
    </div>
  </div>
);

const Forms = () => (
    <div>
        <Anavbar />
        <div className="bg-blue-100 text-blue-900 min-h-screen p-10 mt-28">
    <div className="max-w-7xl mx-auto">
      
      <main>
        <h1 className="text-3xl font-bold text-center mb-10">
          <span>FORMS</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {formsAvailable.map((plan, index) => (
            <PlanCard key={index} plan={plan} />
          ))}
        </div>
      </main>
    </div>
  </div>
    </div>
  
);

export default Forms;

