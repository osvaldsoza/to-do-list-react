import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import Header from './components/header/Header'
import Tasks from './components/Tasks'

library.add(faCheckCircle, faTrashAlt)



function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Tasks />
      </Container>
    </div>
  );
}

export default App;
