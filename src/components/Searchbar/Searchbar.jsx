import React from "react";
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

export default class Searchbar extends React.Component {
    static propType = {
        loadMore: PropTypes.func.isRequired,
        queryChange: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.queryChange = this.props.queryChange;
        this.loadMore = this.props.loadMore;
    }

    state = {
        query: '',
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { query } = this.state;

        this.queryChange(query);
        this.loadMore();
    }

    handleChange = (event) => {
        this.setState({ query: event.target.value })
    }

    render() {
        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={this.handleSubmit}>
                    <button type="submit" className="SearchForm-button">
                        <FaSearch size={18} />
                    </button>

                    <input
                        className="SearchForm-input"
                        name="test"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleChange}
                    />
                </form>
            </header>
        )
    }
}