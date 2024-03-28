import React from 'react'

const Selectform = () => {

  const plans = [
    {
      name: 'SS04',
      features: ['3 FREE OPTIONS'],
      price: 'FREE/per month',
    },
    {
      name: 'MM04',
      features: ['3 FREE OPTIONS', 'NO ADS'],
      price: '$4.99/per month',
    },
    {
      name: 'STANDARD',
      features: ['3 FREE OPTIONS', 'UP TO 2 DEVICES'],
      price: '$8.99/per month',
    },
    {
      name: 'BUSINESS',
      features: ['3 FREE OPTIONS', 'UP TO 8 DEVICES', 'NO ADS'],
      price: '$12.99/per month',
    },
  ];

  const PlanCard = ({ plan }) => (
    <div className="bg-gradient-to-b from-purple-600 to-purple-800 rounded-lg p-6 text-white shadow-lg">
      <button className="text-2xl font-bold">
        {plan.name}
      </button>
      <ul>
        {plan.features.map((feature, index) => (
          <li key={index} className="mt-2">
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-5">
        <button className="text-lg font-bold bg-transparent border border-white rounded-full py-2 px-6 transition duration-300 ease-in-out hover:bg-white hover:text-purple-800">{plan.price}</button>
      </div>
    </div>
  );
  return (
    <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white min-h-screen p-10">
    <div className="max-w-7xl mx-auto">
      
      <main>
      <h1 className="text-3xl font-bold text-center mb-10 overflow-y-hidden">
          Pricing Table <br/>
          Modern concept
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <PlanCard key={index} plan={plan} />
          ))}
        </div>
      </main>
    </div>
  </div>
  )
}

export default Selectform