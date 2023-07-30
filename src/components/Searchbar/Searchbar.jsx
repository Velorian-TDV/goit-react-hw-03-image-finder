import React from "react";
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';

export default class Searchbar extends React.Component {
    static propType = {
        handleChange: PropTypes.func.isRequired,
        imageParser: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.handleChange = this.props.handleChange;
        this.imageParser = this.props.imageParser;
    }

    state = {
        query: '',
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { query } = this.state;

        this.imageParser(query)
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