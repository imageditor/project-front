import React, { Component } from "react";
import ImageDataService from "../services/image.service";
//import ProcessingImageDataService from '../services/processing.service'
//import { Link } from "react-router-dom";



export default class ImagesList extends Component {
    constructor(props) {
        super(props);

        this.retrieveAllImages = this.retrieveAllImages.bind(this);
        this.retrieveProjectImages = this.retrieveProjectImages.bind(this);
        this.getActualContent = this.getActualContent.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleProcessing = this.handleProcessing.bind(this);
        //        this.handleCheckbox = this.handleCheckbox.bind(this);
        //        this.refreshList = this.refreshList.bind(this); //change-it
        //        this.setActiveProject = this.setActiveProject.bind(this); //change-it
        //        this.removeAllProjects = this.removeAllProjects.bind(this); //change-it

        this.state = {
            images: [],
            projectId: null,
            //currentIndex: -1,
        }
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

    handleFile(e) {
        const { projectId } = this.state;

        e.preventDefault();
        // let dt = e.dataTransfer;
        let files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let bodyFormData = new FormData()
            console.log(file)
            bodyFormData.append('projectID', projectId)
            bodyFormData.append('image', file)

            let imageData = {
                projectId: projectId,
                parentImage: file.name
            };

            console.log(`Try post to ${projectId} ${file.name}`)
            //            ImageDataService.imageUpload(bodyFormData)
            ImageDataService.create(imageData)
                .then(response => {
                    console.log(`it's ok: ${response}`)
                    this.getActualContent(projectId)
                })
                .catch(e => {
                    console.log(`foooooo: ${e}`)
                })
        }

        return false;
    }
    /*    
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
    */
    handleCheckbox = (e) => {
        const { name, checked } = e.target;
        console.log(`prevState`, this.state)
        const newImagesState = [...this.state.images];

        newImagesState[name].checked = checked;

        this.setState(newImagesState);

        // Это перенеси в цикл, который будет пробегать по выбранным картинкам и отправлять запросы в ВВ с 
        const bulkActionImgs = this.state.images.filter(img => img.checked)


        console.log(`bulkActionImgs`, bulkActionImgs)
    }

    handleProcessing = (e) => {
        const { type } = e.target
        // Это перенеси в цикл, который будет пробегать по выбранным картинкам и отправлять запросы в ВВ с 
        const bulkActionImgs = this.state.images.map(img => {
            let result = null;
            if (img.checked) {
                result = {
                    id: img.newFilename,
                    projectId: img.projectId,
                    processingType: type
                }
            }
            return result
        })
        
        bulkActionImgs.forEach(img => {
            fetch(URL, {
                method: 'POST',
                body: img
            })
            .then()
            .catch()
        })

        console.log(`bulkActionImgs`, bulkActionImgs)
    }

    render() {

        const {
            images,
            projectId
        } = this.state;
        const imagesListName = "imagesList"

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h4>Images List {projectId} </h4>
                    <div className="App">
                        <input type="file" name="images" id="imgid" className="imgcls" onChange={this.handleFile} multiple />
                    </div>
                    <ul className="list-group" name={imagesListName}>
                        {
                            images.map((image, index) => (
                                <li className="list-group-item" key={index}>
                                    <span>File name: </span>{image.newFilename}<br />
                                    <span>Status: </span>{image.status}<br />
                                    <span>Transformation: </span>{image.transformation}<br />
                                    <span>Created: </span>{image.createdAt}<br />
                                    <input
                                        type="checkbox"
                                        onChange={this.handleCheckbox}
                                        name={index}
                                        value={image.checked}
                                        checked={image.checked}
                                    /> Grayscale it
                                </li>
                            ))}
                    </ul>
                    <div className="App">
                        <button id="processing-btn" type="grayscale" onClick={this.handleProcessing}>Grayscale it</button>
                    </div>

                </div>
            </div>
        );
    }
}