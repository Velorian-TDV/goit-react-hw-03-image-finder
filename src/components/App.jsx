import React from "react";
import PixabayApi from "../services/imageParser";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";

export default class App extends React.Component {
    state = {
        images: [],
        isModalOpen: false,
        modalImage: '',
        modalAlt: '',
        query: '',
        status: 'idle',
        currentPage: 0,
        buttonVisibility: true
    };

    async componentDidUpdate(prevProps, prevState) {
        const { query, currentPage } = this.state;
        const prevQuery = prevState.query;
        const prevPage = prevState.currentPage;

        if (query !== prevQuery) await this.imageSkip();
        if (currentPage !== prevPage) await this.imageParser();
    }

    imageParser = async () => {
        const { images, currentPage, query } = this.state;
        this.setState({ status: 'pending' });

        PixabayApi(query, currentPage)
            .then(data => {
                if (data === null) this.setState({ status: 'rejected' })
                else if (query.trim() === '') this.setState({ status: 'rejected' });
                else if (data.total === 0) this.setState({ status: 'rejected' });
                else if (images.length + 12 >= data.total) this.setState({ buttonVisibility: false, images: [...images, ...data.hits], status: 'fulfilled' })
                else this.setState({ images: [...images, ...data.hits], status: 'fulfilled' });
            })
    };

    imageSkip = async () => this.setState({ currentPage: 1, images: [], buttonVisibility: true })

    queryChange = (query) => this.setState({ query: query });

    loadMore = () => this.setState({ currentPage: this.state.currentPage + 1 })

    getImages = () => this.state.images;

    modalTogle = (image, alt) => this.setState({ isModalOpen: !this.state.isModalOpen, modalImage: image, modalAlt: alt })

    render() {
        const { query, status, isModalOpen, modalImage, modalAlt, buttonVisibility } = this.state;

        if (status === 'idle') {
            return (
                <div className="App">
                    <Searchbar queryChange={this.queryChange} loadMore={this.loadMore} />
                </div>
            )
        }

        if (status === 'pending') {
            return (
                <div className="App">
                    <Searchbar queryChange={this.queryChange} loadMore={this.loadMore} />
                    <ImageGallery getImages={this.getImages} />
                    <Loader />
                </div>
            )
        }

        if (status === 'rejected') {
            return (
                <div className="App">
                    <Searchbar queryChange={this.queryChange} loadMore={this.loadMore} />
                    <p className="rejected">Nothing was found according to your request <b>{query}</b>.</p>
                </div>
            )
        }

        if (status === 'fulfilled') {
            return (
                <div className="App">
                    <Searchbar queryChange={this.queryChange} loadMore={this.loadMore} />
                    <ImageGallery getImages={this.getImages} modalTogle={this.modalTogle} />
                    <Button loadMore={this.loadMore} visibility={buttonVisibility} />
                    {isModalOpen && <Modal modalTogle={this.modalTogle}>
                        <img src={modalImage} alt={modalAlt} />
                    </Modal>}
                </div>
            )
        }
    }
}