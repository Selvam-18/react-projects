import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink 
            to='/' 
            className={({ isActive }) => isActive ? classes.active : undefined} 
            end 
            relative='path'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
            to='/events' 
            className={({ isActive }) => isActive ? classes.active : undefined} 
            relative='path'>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
