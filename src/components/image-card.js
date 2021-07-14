import React from 'react'
import config from '../config'

const ImageCard = (props) => {
    const {
        image,
        index,
        handleCheckbox
    } = props

    const imageUrl = config.BUCKET_URI + image.newFilename;

    return (
        <div className="m-4">
            <div>
                <img
                    style={{
                        width: `300px`,
                        height: `auto`
                    }}
                    src={imageUrl}
                    alt=""
                />
            </div>
            <div className="col-10 mb-1 small">
                <span>File name: </span>{image.newFilename}<br />
                <span>Status: </span>{image.status}<br />
                {/* <span>Transformation: </span>{image.transformation}<br /> */}
                <span>Created: </span>{image.createdAt}<br />
            </div>
            <input
                type="checkbox"
                onChange={handleCheckbox}
                name={index}
                value={image.checked}
                checked={image.checked}
            /> <strong className="mb-1">Grayscale it</strong>
        </div>
    )
}

export default ImageCard;