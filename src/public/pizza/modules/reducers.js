import {combineReducers} from 'redux';

const initialInventory = [
	{
		id: 1,
		name: 'pepperoni',
		unitsAvailable: 10
	},
	{
		id: 2,
		name: 'mushroom',
		unitsAvailable: 5
	},
	{
		id: 3,
		name: 'cheese',
		unitsAvailable: 15
	},
	{
		id: 4,
		name: 'tomatoSauce',
		unitsAvailable: 10
	},
	{
		id: 5,
		name: 'dough',
		unitsAvailable: 10
	}
];

const menuItems = [
	{
		id: 1,
		desc: 'cheese',
		size: 'small',
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
		ingredients: {
			dough: 2,
			tomatoSauce: 2,
			cheese: 2,
			pepperoni: 2
		}
	}
];

function inventory(state = {items: initialInventory}, action) {
	switch (action.type) {
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
