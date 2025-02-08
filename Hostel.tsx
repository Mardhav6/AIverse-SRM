import React from 'react';
import { Coffee, Sun, Moon } from 'lucide-react';

const Hostel = () => {
  const menu = {
    breakfast: ['Idli', 'Sambar', 'Chutney', 'Tea/Coffee'],
    lunch: ['Rice', 'Dal', 'Mixed Vegetables', 'Curd', 'Pickle'],
    dinner: ['Chapati', 'Paneer Curry', 'Rice', 'Dal']
  };

  const facilities = [
    'Wi-Fi Enabled Rooms',
    '24/7 Security',
    'Laundry Service',
    'Reading Room',
    'Gym',
    'Indoor Games'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Hostel Information</h1>
        
        {/* Today's Menu */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Today's Menu</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Coffee className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold">Breakfast</h3>
              </div>
              <ul className="list-disc list-inside space-y-2">
                {menu.breakfast.map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Sun className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold">Lunch</h3>
              </div>
              <ul className="list-disc list-inside space-y-2">
                {menu.lunch.map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Moon className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold">Dinner</h3>
              </div>
              <ul className="list-disc list-inside space-y-2">
                {menu.dinner.map((item, index) => (
                  <li key={index} className="text-gray-700">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Facilities */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Hostel Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {facilities.map((facility, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{facility}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hostel;