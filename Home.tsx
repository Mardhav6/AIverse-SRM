import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, MapPin } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div 
        className="h-[600px] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1986&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to AIverse SRM</h1>
          <p className="text-xl mb-8">Transforming Lives Through Knowledge and Innovation</p>
          <Link
            to="/campus"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg inline-block w-fit hover:bg-blue-700 transition-colors"
          >
            Explore Campus
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">World-Class Education</h3>
              <p className="text-gray-600">Access to cutting-edge facilities and expert faculty</p>
            </div>
            <div className="text-center p-6">
              <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Vibrant Community</h3>
              <p className="text-gray-600">Join a diverse community of learners and innovators</p>
            </div>
            <div className="text-center p-6">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Prime Location</h3>
              <p className="text-gray-600">Located in the heart of Chennai's IT corridor</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Events Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Latest Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Event cards will be populated from the database */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Tech Symposium"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Tech Symposium 2025</h3>
                <p className="text-gray-600 mb-4">Join us for the biggest tech event of the year</p>
                <Link to="/events" className="text-blue-600 hover:text-blue-800">Learn More →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;