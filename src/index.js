import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import './App.scss';
import 'react-spinners/ClockLoader';


// eslint-disable-next-line no-unused-vars
import App from './App';

import Crud from "./components/Crud"

ReactDOM.render(<Crud />, document.getElementById('root'));
