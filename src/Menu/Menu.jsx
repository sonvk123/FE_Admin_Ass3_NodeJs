import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserAPI from "../API/UserAPI";
import { AuthContext } from "../Context/AuthContext";

function Menu(props) {
  const navigate = useNavigate();

  const { isLogin, dispatch } = useContext(AuthContext);

  const [isSubMenuVisible, setSubMenuVisibility] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuVisibility(!isSubMenuVisible);
  };

  const clickLogout = async () => {
    const req = await UserAPI.getLogout();
    console.log(req);
    localStorage.removeItem("name_user_");
    localStorage.removeItem("user");
    localStorage.setItem("isLogin", false);
    dispatch({ type: "LOGOUT" });
    window.location.reload();
    navigate("/login");
  };
  return (
    <aside className="left-sidebar" data-sidebarbg="skin6">
      <div className="scroll-sidebar" data-sidebarbg="skin6">
        <nav className="sidebar-nav">
          <ul id="sidebarnav">
            <li className="sidebar-item">
              <Link className="sidebar-link sidebar-link" href="/">
                <i data-feather="home" className="feather-icon"></i>
                <span className="hide-menu">Dashboard</span>
              </Link>
            </li>
            <li className="list-divider"></li>

            <li className="nav-small-cap">
              <span className="hide-menu">Components</span>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link sidebar-link" href="/new">
                <i data-feather="settings" className="feather-icon"></i>
                <span className="hide-menu">New Product</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link sidebar-link" href="/chat">
                <i data-feather="message-square" className="feather-icon"></i>
                <span className="hide-menu">Customer</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className={`sidebar-link has-arrow ${
                  isSubMenuVisible ? "active" : ""
                }`}
                href="/#"
                aria-expanded={isSubMenuVisible}
                onClick={toggleSubMenu}
              >
                <i data-feather="grid" className="feather-icon"></i>
                <span className="hide-menu">Tables</span>
              </Link>
              <ul
                className={`collapse first-level base-level-line ${
                  isSubMenuVisible ? "show" : ""
                }`}
              >
                <li className="sidebar-item">
                  <Link href="/users" className="sidebar-link">
                    <span className="hide-menu">Users</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link href="/products" className="sidebar-link">
                    <span className="hide-menu">Products</span>
                  </Link>
                </li>
              </ul>
            </li>

            <li className="list-divider"></li>
            <li className="nav-small-cap">
              <span className="hide-menu">Authentication</span>
            </li>

            <li className="sidebar-item">
              {!isLogin ? (
                <Link
                  className="sidebar-link sidebar-link"
                  href="/login"
                  aria-expanded="false"
                >
                  <i data-feather="lock" className="feather-icon"></i>
                  <span className="hide-menu">Login</span>
                </Link>
              ) : (
                <Link
                  className="sidebar-link sidebar-link"
                  aria-expanded="false"
                  href="/login"
                >
                  <i data-feather="lock" className="feather-icon"></i>
                  <span className="hide-menu" onClick={clickLogout}>
                    Log Out
                  </span>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Menu;
