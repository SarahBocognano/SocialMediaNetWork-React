import { Link } from "react-router-dom";

function NavBar(props) {
    return (
        <nav className="navBar">
            <input className="searchInput" type="text" placeholder="  Search for something"></input>
            <ul className="myNavUl">
                <li>
                    <Link to="/" className={props.currentRoute === "home" ? "active" : ""}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/login" className={props.currentRoute === "user" ? "active" : ""}>
                        Login / Sign in
                    </Link>
                </li>
                <li>
                    <Link to="/user/notifications">Notifications</Link>
                </li>
                <li>
                    <Link to="/user/settings">Settings</Link>
                </li>
                <li>
                    <Link to="/user/edit">
                        <img src="512px-Circle-icons-profile.svg.png" width="40" alt="imagealacon" />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
