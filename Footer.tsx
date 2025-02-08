import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">SRM University</h3>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              SRM Nagar, Kattankulathur - 603203
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              +91 44 2741 7777
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              info@srmist.edu.in
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/campus" className="hover:text-blue-200">Campus</Link></li>
            <li><Link to="/events" className="hover:text-blue-200">Events</Link></li>
            <li><Link to="/hostel" className="hover:text-blue-200">Hostel</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
          <p className="text-sm">Follow us on social media for updates and news</p>
          <div className="mt-4 space-x-4">
            <a href="https://www.facebook.com/SRMUniversityOfficial" className="hover:text-blue-200">Facebook</a>
            <a href="https://twitter.com/SRM_Univ" className="hover:text-blue-200">Twitter</a>
            <a href="https://www.instagram.com/srm_university/" className="hover:text-blue-200">Instagram</a>
          </div>
        </div>
      </div>
      <div className="bg-blue-950 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          © {new Date().getFullYear()} SRM Institute of Science and Technology. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;