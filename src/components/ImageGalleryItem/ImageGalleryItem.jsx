import React from "react";
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends React.Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        alt: PropTypes.string.isRequired,
        dataLarge: PropTypes.string.isRequired,
        modalTogle: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.src = this.props.src;
        this.id = this.props.id;
        this.alt = this.props.alt;
        this.dataLarge = this.props.dataLarge;
        this.modalTogle = this.props.modalTogle;
    }

    handleClick = () => {
        this.modalTogle(this.dataLarge, this.alt)
    }

    render() {
        return (
            <li className="ImageGalleryItem" >
                <img
                    src={this.src}
                    id={this.id}
                    alt={this.alt}
                    data-large={this.dataLarge}
                    className="ImageGalleryItem-image"
                    onClick={this.handleClick}
                />
            </li>
        )
    }
}