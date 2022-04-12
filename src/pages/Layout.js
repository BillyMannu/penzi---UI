import { Outlet, Link } from "react-router-dom";
import "../index.css";
import { Nav } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { FaSignIn } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

const Layout = () => {
  return (
    <div>
      <h2></h2>
      {/* <div className="sidenav"> */}
      <div className="topnav">
        <nav>
          <ul>
            <li>
              <Nav.Link as={Link} to={"/"}>
                Home
              </Nav.Link>
            </li>
            {/* <li>
              <Nav.Link as={Link} to={"/Page1"}>
                page1
              </Nav.Link>
            </li> */}
            <li>
              <Nav.Link as={Link} to={"/Registration"}>
                Registration
              </Nav.Link>
            </li>
            <li>
              <Nav.Link as={Link} to={"/Specifics"}>
                Specifics
              </Nav.Link>
            </li>
            <li>
              <Nav.Link as={Link} to={"/Myself"}>
                Myself
              </Nav.Link>
            </li>
            <li>
              <Nav.Link as={Link} to={"/Match"}>
                Match
              </Nav.Link>
            </li>
            <li>
              <Nav.Link as={Link} to={"/Choice"}>
                Choice
              </Nav.Link>
            </li>
            <li>
              <Nav.Link as={Link} to={"/Describe"}>
                Describe
              </Nav.Link>
            </li>
            {/* <li>
              <Nav.Link as={Link} to={"/NoPage"}>
                NoPage
              </Nav.Link>
            </li> */}
          </ul>
        </nav>

        <Outlet />
      </div>
      <div className="card"></div>
    </div>
  );
};
function Menu() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
export default Layout;
