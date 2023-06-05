
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { IoHome } from 'react-icons/io5';
import { FcAbout } from 'react-icons/fc';
import { FiLogOut } from 'react-icons/fi';
import { RxDashboard } from 'react-icons/rx';

const Navigation = () => {
  const [countdown, setCountdown] = useState(5);
  const [logoutConfirmed, setLogoutConfirmed] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (logoutConfirmed && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000); // 1 second

      return () => clearTimeout(timer);
    } else if (countdown === 0 && logoutConfirmed) {
      setRedirect(true);
    }
  }, [countdown, logoutConfirmed]);

  const handleLogoutClick = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      setLogoutConfirmed(true);
    }
  };

  useEffect(() => {
    if (redirect) {
      window.location.replace('/');
    }
  }, [redirect]);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/Home">
            <IoHome />
          </Link>
        </li>

        <li>
          <Link to="/Dashboard">
            <RxDashboard />
          </Link>
        </li>

        <li>
          <Link to="/About">
            <FcAbout />
          </Link>
        </li>

        <li>
          <Link to="#" onClick={handleLogoutClick}>
            <FiLogOut />
          </Link>
        </li>
      </ul>

      {logoutConfirmed && countdown > 0 && (
        <div>
          Redirecting to login in {countdown} seconds. Please don't close the page.
        </div>
      )}
    </nav>
  );
};

export default Navigation;
