import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Calendar, Home, Book, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8" />
              <span className="font-bold text-xl">SRM University</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/campus" className="hover:text-blue-200 flex items-center space-x-1">
              <Home className="h-4 w-4" />
              <span>Campus</span>
            </Link>
            <Link to="/events" className="hover:text-blue-200 flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Events</span>
            </Link>
            <Link to="/hostel" className="hover:text-blue-200 flex items-center space-x-1">
              <Book className="h-4 w-4" />
              <span>Hostel</span>
            </Link>
            {user ? (
              <button
                onClick={signOut}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-blue-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/campus"
              className="block px-3 py-2 rounded-md hover:bg-blue-800"
            >
              Campus
            </Link>
            <Link
              to="/events"
              className="block px-3 py-2 rounded-md hover:bg-blue-800"
            >
              Events
            </Link>
            <Link
              to="/hostel"
              className="block px-3 py-2 rounded-md hover:bg-blue-800"
            >
              Hostel
            </Link>
            {user ? (
              <button
                onClick={signOut}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-800"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md hover:bg-blue-800"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;