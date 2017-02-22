import React from 'react';
import { Router, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Routes from './components/Routes';
import 'bootstrap/dist/css/bootstrap.css';
import 'script!whatwg-fetch';
import './app-wide-styles.css';
import './app.scss';
import 'animate.css/animate.css';



ReactDOM.render((
    <Routes />
), document.getElementById('app'));