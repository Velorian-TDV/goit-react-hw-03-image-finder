import React from "react";
import PropTypes from 'prop-types';
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";

export default class ImageGallery extends React.Component {
    static propTypes = {
        getImages: PropTypes.func.isRequired,
    }
    
    constructor(props) {
        super(props);

        this.images = this.props.getImages;
    }

    render() {
        return (
            <ul className="ImageGallery" >
                {this.images().length === 0 ? null :
                    this.images().map(image => {
                        const { id, webformatURL, largeImageURL, tags } = image;

                        return (
                            <ImageGalleryItem
                                key={id}
                                id={id}
                                src={webformatURL}
                                alt={tags}
                                dataLarge={largeImageURL}
                                modalTogle={this.props.modalTogle}
                            />
                        )
                    })
                }
            </ul>
        )
    }
}