import React from "react";
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types';

const rootModal = document.querySelector('#root-modal');

export default class Modal extends React.Component {

    static propTypes = {
        modalTogle: PropTypes.func.isRequired,
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown)
    }

    handleKeydown = event => {
        if (event.code === 'Escape') {
            this.props.modalTogle()
        }
    }

    handleClick = (event) => {
        if (event.currentTarget === event.target) {
            this.props.modalTogle()
        }
    }

    render() {
        return createPortal(
            <div className="Overlay" onClick={this.handleClick}>
                <div className="Modal">
                    {this.props.children}
                </div>
            </div>,
            rootModal
        )
    }
}