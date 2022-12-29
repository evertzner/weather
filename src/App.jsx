import React from 'react';
import { StoreProvider, createStore } from 'easy-peasy';
import StoreModel from './store/store-model';
import Container from './components/container/container.component';
import './App.styles.scss';

const store = createStore(StoreModel);

const App = () => {
  return (
    <StoreProvider store={store}>
      <div className="App">
        <Container />
      </div>
    </StoreProvider>
  );
};

export default App;
