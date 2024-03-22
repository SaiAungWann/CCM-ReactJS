import './App.css';
import { Outlet, NavLink } from 'react-router-dom';


function Home() {
  return (
      <div className='App'>
        <nav>
          <h1>My Blogs</h1>
          <ul>
            {/*  a tag is refr the page and also take to the server site*/}
            {/*  to solve this porplem use link tag */}
            {/*  link tag is mouding the client site page , so the page will not refr*/}
            {/*  NavLink is automatic create className="active" so it can easy to manage the active state in css*/}
            {/*  both link and NavLink are basically come form a tag, to change the style need to use a tag*/}
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </nav>
        {/*  to receive the data form router children */}
        <Outlet/>
      </div>
  );
}

export default Home;