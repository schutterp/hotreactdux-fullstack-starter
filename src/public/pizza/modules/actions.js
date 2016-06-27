import {getRemainingInventory} from './selectors';

export function submitOrder(order) {
	return (dispatch, getState) => {
		dispatch({
			type: 'SUBMIT_ORDER',
			payload: {
				order,
				remainingInventory: getRemainingInventory(getState())
			}
		});
	};
}

export function updateItemQty(item) {
	return {
		type: 'UPDATE_ITEM_QTY',
		payload: {
			item
		}
	};
}

export function cancelOrder() {
	return {
		type: 'CANCEL_ORDER'
	};
}

export function requestInventory() {
	return {
		type: 'REQUEST_INVENTORY'
	};
}

export function receiveInventory(items) {
	return {
		type: 'RECEIVE_INVENTORY',
		payload: {
			items
		}
	};
}

export function errorInventory(error) {
	return {
		type: 'ERROR_INVENTORY',
		payload: {
			error
		}
	};
}

export function fetchInventory() {
	return (dispatch, getState) => {
		dispatch(requestInventory());

		fetch('inventory')
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			dispatch(receiveInventory(data));
		})
		.catch((error) => {
			return dispatch(errorInventory(error));
		});
	};
};
