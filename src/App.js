import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from './logo.svg';

import AddProject from "./components/add-project.component";
import Project from "./components/project.component";
import ProjectsList from "./components/projects-list.component";

import ImagesList from "./components/images-list.component";

class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/projects" className="navbar-brand">
                        <img src={logo} className="App-logo" alt="logo" />
                    </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/projects"} className="nav-link">
                                Projects
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/add"} className="nav-link">
                                Add Project
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/images"} className="nav-link">
                                Images
                            </Link>
                        </li>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/projects"]} component={ProjectsList} />
                        <Route exact path={["/images"]} render={() => <ImagesList showAll />} />
                        <Route exact path="/add" component={AddProject} />
                        <Route path="/projects/:id" component={Project} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;