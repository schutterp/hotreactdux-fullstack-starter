import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './modules/reducers'
import PizzaOrderForm from './containers/order-form';

function configureStore(initialState) {
	const store = createStore(reducers, initialState,
		window.devToolsExtension && window.devToolsExtension()
	);
	return store;
}

const store = configureStore();

render(
	<Provider store={store}>
		<PizzaOrderForm />
	</Provider>,
	document.getElementById('root')
);
