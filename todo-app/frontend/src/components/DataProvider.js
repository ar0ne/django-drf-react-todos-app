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

    render() {
        const { data, loaded, placeholder } = this.state;
        return loaded ? this.props.render(data) : <p>{placeholder}</p>;
    }
}


export default DataProvider;