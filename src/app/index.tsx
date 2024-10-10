import React from 'react';
import ReactDOM from 'react-dom';
import ReduxProvider from './ReduxProvider'; // Импортируем ReduxProvider
import HomePage from './page'; // Импорт компонента HomePage (из page.tsx)

ReactDOM.render(
  <ReduxProvider>
    <HomePage />
  </ReduxProvider>,
  document.getElementById('root')
);
