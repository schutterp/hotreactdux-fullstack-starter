import _ from 'lodash';

// given a set of ingredients and inventory, determine if there's enough inventory for the item
export function hasIngredientsInInventory(inventory = [], ingredients = {}) {
	return _.every(ingredients, (qty, name) => (
		_.get(_.find(inventory, {name}), 'unitsAvailable', 0) >= qty
	));
}

export function getIngredientsForOrder(orderItems = {}, menuItems = []) {
	let result = {};
	_.forEach(orderItems, (qty, id) => {
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

export function getRemainingInventory(inventory = [], orderItems = {}, menuItems = []) {
	const ingredients = getIngredientsForOrder(orderItems, menuItems);
	return inventory.map((item) => (
		{
			...item,
			unitsAvailable: item.unitsAvailable - _.get(ingredients, item.name, 0)
		}
	));
}
