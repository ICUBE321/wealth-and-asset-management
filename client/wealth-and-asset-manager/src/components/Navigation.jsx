import Logo from "../assets/logo.jpg";
import { Navbar } from "flowbite-react";
import { NavLink } from "react-router-dom";

const Navigation = ({ tokenExists }) => {
  return (
    <>
      <Navbar className="" fluid rounded>
        <Navbar.Brand href="">
          <img
            src={Logo}
            className="mr-3 h-6"
            alt="Wealth and Asset Manager Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold">
            Wealth and Assets Manager
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {!tokenExists && (
            <>
              <Navbar.Link as={NavLink} to="/login">
                Login
              </Navbar.Link>
              <Navbar.Link as={NavLink} to="/signup">
                Sign Up
              </Navbar.Link>
            </>
          )}

          <Navbar.Link as={NavLink} to="/">
            Home
          </Navbar.Link>
          {tokenExists && (
            <>
              <Navbar.Link as={NavLink} to="/asset-tracker">
                Track Assets
              </Navbar.Link>
              <Navbar.Link as={NavLink} to="/monitor-growth">
                Monitor Growth
              </Navbar.Link>
              <Navbar.Link as={NavLink} to="/logout">
                Logout
              </Navbar.Link>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
