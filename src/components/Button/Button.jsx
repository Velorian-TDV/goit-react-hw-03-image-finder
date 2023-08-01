import React from "react";
import PropTypes from 'prop-types';

export default class Button extends React.Component {
    static propTypes = {
        loadMore: PropTypes.func.isRequired,
        visibility: PropTypes.bool.isRequired
    }

    constructor(props) {
        super(props);

        this.loadMore = this.props.loadMore;
        this.visibility = this.props.visibility;
    }

    render() {
        return (
            <button className="Button" onClick={this.loadMore} data-visible={this.visibility}>Load more</button>
        )
    }
}