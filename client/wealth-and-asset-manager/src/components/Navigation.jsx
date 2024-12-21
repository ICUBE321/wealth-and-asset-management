import Logo from "../assets/logo.jpg";
import { Navbar } from "flowbite-react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
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
          <Navbar.Link as={NavLink} to="/">
            Home
          </Navbar.Link>
          <Navbar.Link as={NavLink} to="/asset-tracker">
            Track Assets
          </Navbar.Link>
          <Navbar.Link as={NavLink}>Monitor Growth</Navbar.Link>
          <Navbar.Link as={NavLink}>Generate Insights</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
