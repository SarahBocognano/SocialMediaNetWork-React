import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/login">
                        <Header currentRoute="user" />
                        <Login />
                    </Route>
                    <Route path="/">
                        <Header currentRoute="home" />
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
