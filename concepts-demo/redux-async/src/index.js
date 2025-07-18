import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/index';

import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}> <App /> </Provider>
);
