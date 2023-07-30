import React from "react";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";

export default class App extends React.Component {
    state = {
        images: [],
        query: '',
        status: 'idle',
        apiKey: '37437370-877202df46223cca979279914',
        currentPage: 1,
    };

    componentDidUpdate(prevProps, prevState) {
        const { query } = this.state;
        const prevQuery = prevState.query;

        if (query !== prevQuery) this.setState({ images: [], currentPage: 1, status: 'idle' })
    }

    imageParser = () => {
        const { apiKey, images, currentPage, query } = this.state;
        const URL = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&page=${currentPage}&per_page=12`;

        this.setState({ currentPage: currentPage + 1, status: 'pending' });

        fetch(URL)
            .then(response => {
                if (!response.ok) this.setState({ status: 'rejected' });
                return response.json();
            })
            .then(data => {
                if (data.total === 0) this.setState({ status: 'rejected' });
                else if (query.trim() === '') this.setState({ status: 'rejected' });
                else this.setState({ images: [...images, ...data.hits], status: 'fulfilled' });
            })
    };

    handleChange = (event) => this.setState({ query: event.target.value });

    getImages = () => this.state.images;

    render() {
        const { query, status } = this.state;

        if (status === 'idle') {
            return (
                <div className="App">
                    <Searchbar imageParser={this.imageParser} handleChange={this.handleChange} />
                </div>
            )
        }

        if (status === 'pending') {
            return (
                <div className="App">
                    <Searchbar imageParser={this.imageParser} handleChange={this.handleChange} />
                    <ImageGallery getImages={this.getImages} />
                    <Loader />
                </div>
            )
        }

        if (status === 'rejected') {
            return (
                <div className="App">
                    <Searchbar imageParser={this.imageParser} handleChange={this.handleChange} />
                    <p className="rejected">Nothing was found according to your request <b>{query}</b>.</p>
                </div>
            )
        }

        if (status === 'fulfilled') {
            return (
                <div className="App">
                    <Searchbar imageParser={this.imageParser} handleChange={this.handleChange} />
                    <ImageGallery getImages={this.getImages} />
                    <Button imageParser={this.imageParser} />
                </div>
            )
        }
    }
}