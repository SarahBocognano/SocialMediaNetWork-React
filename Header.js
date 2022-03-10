import { Link } from "react-router-dom";
import "../styles/header.css";
import NavBar from "./Navbar";

function Header(props) {
    return (
        <div>
            <header className="App-header">
                <NavBar currentRoute={props.currentRoute}></NavBar>
            </header>
        </div>
    );
}
export default Header;
