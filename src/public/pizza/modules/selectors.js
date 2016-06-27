import _ from 'lodash';
import {createSelector} from 'reselect';

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

export const getOrdersById = (state) => _.get(state, 'order.items', {});
export const getMenuItems = (state) => _.get(state, 'menu.items', []);
export const getInventoryItems = (state) => _.get(state, 'inventory.items', []);
export const isFetchingInventory = (state) => _.get(state, 'inventory.isFetching', false);

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
