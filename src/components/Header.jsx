import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { currentUser, userRoutes, handleSignOut } = useAuth();
  const navigate = useNavigate();

  const isSignInPage = location.pathname === "/signin";
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Auth App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {userRoutes.includes("createuser") && (
                <li className="nav-item">
                  <Link className="nav-link" to="/createuser">
                    Create User
                  </Link>
                </li>
              )}
              {userRoutes.includes("test") && (
                <li className="nav-item">
                  <Link className="nav-link" to="/test">
                    Test
                  </Link>
                </li>
              )}
              {userRoutes.includes("project") && (
                <li className="nav-item">
                  <Link className="nav-link" to="/project">
                    Project
                  </Link>
                </li>
              )}
              {userRoutes.includes("management") && (
                <li className="nav-item">
                  <Link className="nav-link" to="/management">
                    Management
                  </Link>
                </li>
              )}
              {userRoutes.includes("labs") && (
                <li className="nav-item">
                  <Link className="nav-link" to="/labs">
                    Labs
                  </Link>
                </li>
              )}
              {userRoutes.includes("settings") && (
                <li className="nav-item">
                  <Link className="nav-link" to="/settings">
                    Settings
                  </Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav">
              {!currentUser && !isSignInPage && (
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                </li>
              )}
              {currentUser && (
                <>
                  <li className="nav-item">
                    <span className="nav-link">
                      Welcome, {currentUser.email}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-link nav-link"
                      onClick={() => handleSignOut(navigate("signin"))}
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
