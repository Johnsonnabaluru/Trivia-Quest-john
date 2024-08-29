// src/components/Navbar.js
const Navbar = () => {
  return (
    <nav className="navbar" style={{ backgroundColor: '#212529' }}>
      <div className="container">
        <a 
          className="navbar-brand fw-bolder fs-3" 
          href="/" 
          style={{ color: '#FFC107' }}
        >
          TRIVIA QUEST
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
