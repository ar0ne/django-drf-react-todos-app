import React, {Component} from 'react';
import PropTypes from "prop-types";

class DataProvider extends Component {
    static propTypes = {
        endpoint: PropTypes.string.isRequired,
        render: PropTypes.func.isRequired
    };

    state = {
        data: [],
        loaded: false,
        placeholder: "Loading..."
    };

    componentDidMount() {
        fetch(this.props.endpoint, {
            headers: {
                "Authorization": "Token 1af793c66e8bd4423cec90dc4ac955b10df6e0ae"
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Something went wrong!");
            }
        })
        .then(data => this.setState({
            data: data,
            loaded: true
        }))
        .catch(error => this.setState({
            placeholder: error.message,
            loaded: false,
        }));
    }

    render() {
        const { data, loaded, placeholder } = this.state;
        return loaded ? this.props.render(data) : <p>{placeholder}</p>;
    }
}


export default DataProvider;