import {combineReducers} from 'redux';
import {createSelector} from 'reselect';
import _ from 'lodash';

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

function getIngredientsForOrder(ordersById = {}, menuItems = []) {
	let result = {};
	_.forEach(ordersById, (qty, id) => {
		const menuItem = _.find(menuItems, {id: parseInt(id, 10)});
		result = _.reduce(_.get(menuItem, 'ingredients', {}), (memo, units, name) => {
			if (!result[name]) {
				memo[name] = units * qty;
			} else {
				memo[name] = result[name] + units * qty;
			}
			return memo;
		}, result);
	});
	return result;
}

const getOrdersById = (state) => _.get(state, 'order.items', {});
const getMenuItems = (state) => _.get(state, 'menu.items', []);
const getInventoryItems = (state) => _.get(state, 'inventory.items', []);

export const getRemainingInventory = createSelector(
	[getOrdersById, getMenuItems, getInventoryItems],
	(ordersById, menuItems, inventoryItems) => {
		const ingredients = getIngredientsForOrder(ordersById, menuItems);
		return inventoryItems.map((item) => (
			{
				...item,
				unitsAvailable: item.unitsAvailable - _.get(ingredients, item.name, 0)
			}
		));
	}
)

export function hasEnoughInventory(state, ingredients = {}) {
	const inventory = getRemainingInventory(state);
	return _.every(ingredients, (qty, name) => (
		_.get(_.find(inventory, {name}), 'unitsAvailable', 0) >= qty
	));
}
