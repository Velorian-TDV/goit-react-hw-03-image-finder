import React from "react";
import PropTypes from 'prop-types';

export default class Button extends React.Component {
    static propTypes = {
        imageParser: PropTypes.func,
    }
    
    constructor(props) {
        super(props);

        this.imageParser = this.props.imageParser;
    }

    render() {
        return (
            <button className="Button" onClick={this.imageParser}>Load more</button>
        )
    }
}