import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from './modules/reducers'
import PizzaOrderForm from './containers/order-form';

function configureStore(initialState) {
	const store = createStore(reducers, initialState, compose(
		applyMiddleware(reduxThunk),
		window.devToolsExtension && window.devToolsExtension()
	));
	return store;
}

const store = configureStore();

render(
	<Provider store={store}>
		<PizzaOrderForm />
	</Provider>,
	document.getElementById('root')
);
