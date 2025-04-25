import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import { Menu, X, UserCircle, LogOut, Home, User, Settings } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleNavItemClick = () => {
    if (isOpen) setIsOpen(false);
  };
  
  const authLinks = (
    <>
      {user  && <li className="px-4 py-2 bg-blue-50 rounded-xl text-blue-900 font-medium shadow-sm hover:shadow-md transition-shadow">
        Welcome back, <span className="font-semibold">{user.name}</span>
      </li>}

      <li>
        <Link 
          to={user?.role === 'patient' ? '/patient/dashboard' : '/dentist/dashboard'} 
          className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
          onClick={handleNavItemClick}
        >
          Dashboard
        </Link>
      </li>
      <li>
        <Link 
          to="/profile" 
          className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
          onClick={handleNavItemClick}
        >
          Profile
        </Link>
      </li>
      <li>
        <button 
          onClick={() => {
            handleLogout();
            handleNavItemClick();
          }}
          className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
        >
          <LogOut size={16} className="mr-1" /> Logout
        </button>
      </li>
    </>
  );
  
  const guestLinks = (
    <>
      <li>
        <Link 
          to="/login" 
          className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
          onClick={handleNavItemClick}
        >
          Login
        </Link>
      </li>
      <li>
        <Link 
          to="/register" 
          className="bg-blue-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
          onClick={handleNavItemClick}
        >
          Register
        </Link>
      </li>
    </>
  );
  
  return (
    <nav className="bg-white shadow-sm mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to={user?.role === 'patient' ? '/patient/dashboard' : '/dentist/dashboard'} className="flex items-center">
                <span className="text-primary-700 font-bold text-xl">DentalCheck</span>
              </Link>
            </div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:ml-6 md:flex md:items-center">
            <ul className="flex space-x-4 items-center">
              {isAuthenticated ? authLinks : guestLinks}
            </ul>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <ul className="pt-2 pb-3 space-y-1 px-4">
            {isAuthenticated ? (
              <>
                <li>
                  <Link 
                    to={user?.role === 'patient' ? '/patient/dashboard' : '/dentist/dashboard'} 
                    className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
                    onClick={handleNavItemClick}
                  >
                    <div className="flex items-center">
                      <User size={16} className="mr-2" /> Dashboard
                    </div>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/profile" 
                    className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
                    onClick={handleNavItemClick}
                  >
                    <div className="flex items-center">
                      <Settings size={16} className="mr-2" /> Profile
                    </div>
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      handleLogout();
                      handleNavItemClick();
                    }}
                    className="text-gray-600 hover:text-blue-600 block w-full text-left px-3 py-2 text-base font-medium transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <LogOut size={16} className="mr-2" /> Logout
                    </div>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/login" 
                    className="text-gray-600 hover:text-blue-600 block px-3 py-2 text-base font-medium transition-colors duration-200"
                    onClick={handleNavItemClick}
                  >
                    <div className="flex items-center">
                      <UserCircle size={16} className="mr-2" /> Login
                    </div>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className="bg-blue-600 hover:bg-primary-700 text-white block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
                    onClick={handleNavItemClick}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;