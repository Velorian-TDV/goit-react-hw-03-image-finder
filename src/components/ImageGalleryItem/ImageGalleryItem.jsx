import React from "react";
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends React.Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        dataLarge: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);

        this.src = this.props.src;
        this.alt = this.props.alt;
        this.dataLarge = this.props.dataLarge;
    }

    render() {
        return (
            <li className="ImageGalleryItem">
                <img
                    src={this.src}
                    alt={this.alt}
                    data-large={this.dataLarge}
                    className="ImageGalleryItem-image"
                />
            </li>
        )
    }
}