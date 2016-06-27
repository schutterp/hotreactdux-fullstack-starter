import {combineReducers} from 'redux';

const initialInventoryState = {
	items: [],
	isFetching: false
};

const menuItems = [
	{
		id: 1,
		desc: 'cheese',
		size: 'small',
		price: 5,
		ingredients: {
			dough: 1,
			tomatoSauce: 1,
			cheese: 1
		}
	},
	{
		id: 2,
		desc: 'cheese',
		size: 'large',
		price: 8,
		ingredients: {
			dough: 2,
			tomatoSauce: 2,
			cheese: 2
		}
	},
	{
		id: 3,
		desc: 'pepperoni',
		size: 'small',
		price: 7,
		ingredients: {
			dough: 1,
			tomatoSauce: 1,
			cheese: 1,
			pepperoni: 1
		}
	},
	{
		id: 4,
		desc: 'pepperoni',
		size: 'large',
		price: 10,
		ingredients: {
			dough: 2,
			tomatoSauce: 2,
			cheese: 2,
			pepperoni: 2
		}
	}
];

function inventory(state = initialInventoryState, action) {
	switch (action.type) {
		case 'REQUEST_INVENTORY':
			return {
				...state,
				isFetching: true
			};
		case 'RECEIVE_INVENTORY':
			return {
				...state,
				isFetching: false,
				items: action.payload.items
			};
		case 'ERROR_INVENTORY':
			return {
				...state,
				isFetching: false
			};
		case 'SUBMIT_ORDER':
			return {
				...state,
				items: action.payload.remainingInventory
			};
		default:
			return state;
	}
}

function order(state = {items: {}}, action) {
	switch (action.type) {
		case 'UPDATE_ITEM_QTY':
			const {id, qty} = action.payload.item;
			return {
				...state,
				items: {
					...state.items,
					[id]: qty
				}
			};
		case 'SUBMIT_ORDER':
		case 'CANCEL_ORDER':
			return {
				...state,
				items: {}
			};
		default:
			return state;
	}
}

function menu(state = {items: menuItems}, action) {
	return state;
}

export default combineReducers({
	inventory,
	order,
	menu
});
