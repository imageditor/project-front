import React, { Component } from "react";
import ImageDataService from "../services/image.service";
import ProcessingImageDataService from '../services/processing.service'
//import { Link } from "react-router-dom";



export default class ImagesList extends Component {
    constructor(props) {
        super(props);

        this.retrieveAllImages = this.retrieveAllImages.bind(this);
        this.retrieveProjectImages = this.retrieveProjectImages.bind(this);
        this.getActualContent = this.getActualContent.bind(this);
        //        this.refreshList = this.refreshList.bind(this); //change-it
        //        this.setActiveProject = this.setActiveProject.bind(this); //change-it
        //        this.removeAllProjects = this.removeAllProjects.bind(this); //change-it

        this.state = {
            images: [],
            projectId: null,
            //currentIndex: -1,
        }
    }

    handleFile(e) {
        e.preventDefault();
        // let dt = e.dataTransfer;
        let files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let reader = new FileReader();
            let fetchBody = {
                projectId: 'placeholder',
                processingType: 'upload',
                image: new Blob([reader.result], { type: file.type })
            };
            console.log(fetchBody)
            const successsCallback = (response) => {
                if (response.ok) {
                    console.log('Processing has been started')
                } else {
                    console.log('Error uploading [' + file.name + ']. Max upload size is ~4MB.');
                }
            }

            reader.addEventListener('loadend', function (e) {
                ProcessingImageDataService.startProcessing(fetchBody, successsCallback)
            });
            reader.readAsArrayBuffer(file);
        }
        return false;
    }

    componentDidMount() {
        const {
            projectId
        } = this.props;

        this.getActualContent(projectId);
    }

    componentDidUpdate(prevProps) {
        const {
            projectId
        } = this.props;

        if (prevProps.projectId !== projectId) this.getActualContent(projectId);
    }

    getActualContent(projectId) {
        console.log(this.props)
        if (projectId) {
            this.retrieveProjectImages(projectId);
            this.setState({
                projectId: projectId
            });
        } else
            this.retrieveAllImages();
    }

    /*
        onChangeSearchTitle(e) {
            const searchTitle = e.target.value;
    
            this.setState({
                searchTitle: searchTitle
            });
        }
    */
    retrieveAllImages() {
        ImageDataService.getAll()
            .then(response => {
                this.setState({
                    images: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    retrieveProjectImages(projectId) {
        ImageDataService.findByProjectId(projectId)
            .then(response => {
                this.setState({
                    images: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    /*
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
*/
    render() {

        const {
            images,
            projectId
        } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Images List {projectId} </h4>
                    <div className="App">
                        <input type="file" name="images" id="imgid" className="imgcls" onChange={this.handleFile} multiple />
                    </div>
                    <ul className="list-group">
                        {
                            images.map((image, index) => (
                                <li
                                    className={"list-group-item"}
                                    //                                    onClick={() => this.setActiveProject(project, index)}
                                    key={index}
                                >
                                    {image.id}
                                </li>
                            ))}
                    </ul>

                </div>
            </div>
        );
    }
}