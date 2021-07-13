import React, { Component } from "react";
import ProjectDataService from "../services/project.service";
import ImagesList from "../components/images-list.component";

import { Link } from "react-router-dom";

export default class ProjectsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveProjects = this.retrieveProjects.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveProject = this.setActiveProject.bind(this);
        this.removeAllProjects = this.removeAllProjects.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            projects: [],
            currentProject: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveProjects();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveProjects() {
        ProjectDataService.getAll()
            .then(response => {
                this.setState({
                    projects: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveProjects();
        this.setState({
            currentProject: null,
            currentIndex: -1
        });
    }

    setActiveProject(project, index) {
        this.setState({
            currentProject: project,
            currentIndex: index
        });
    }

    removeAllProjects() {
        ProjectDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchTitle() {
        ProjectDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    projects: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchTitle, projects, currentProject, currentIndex } = this.state;

        return (
            <div className="list row">

                <div className="col-md-6 d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                    <a href="/" className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
                        <span className="fs-5 fw-semibold">List group</span>
                    </a>
                    <div className="list-group list-group-flush border-bottom scrollarea">
                        <a href="/" className="list-group-item list-group-item-action active py-3 lh-tight" aria-current="true">
                            <div className="d-flex w-100 align-items-center justify-content-between">
                                <strong className="mb-1">List group item heading</strong>
                                <small>Wed</small>
                            </div>
                            <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                        </a>
                        <a href="/" className="list-group-item list-group-item-action py-3 lh-tight">
                            <div className="d-flex w-100 align-items-center justify-content-between">
                                <strong className="mb-1">List group item heading</strong>
                                <small className="text-muted">Tues</small>
                            </div>
                            <div className="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                        </a>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Projects List</h4>

                    <ul className="list-group">
                        {projects &&
                            projects.map((project, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveProject(project, index)}
                                    key={index}
                                >
                                    {project.title}
                                </li>
                            ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllProjects}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentProject ? (
                        <div>
                            <h4>Project</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentProject.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentProject.description}
                            </div>

                            <Link
                                to={"/projects/" + currentProject.id}
                                className="badge bg-warning"
                            >
                                Edit
                            </Link>
                            <ImagesList projectId={currentProject.id} />
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Project...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}