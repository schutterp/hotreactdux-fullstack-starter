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
