import React from "react";
import { Redirect } from 'react-router';
import { userService } from '../services/user.service';

import Content from './Content';


export default class Logout extends React.Component {

    state = {
        redirect: false
    }

    componentDidMount() {
        event.preventDefault();
        userService.logout();
        this.setState({
            redirect: true
        })
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to='/'/>;
        }

        return (<h3>Loading...</h3>)
    }
}
