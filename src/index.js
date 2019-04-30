import React from 'react';
import { render } from 'react-dom';
import App from './Components/App';
import { BrowserRouter } from 'react-router-dom';

const renderApp = AppComponent =>
  render(<BrowserRouter><AppComponent /></BrowserRouter>, document.getElementById('root'));

renderApp(App);