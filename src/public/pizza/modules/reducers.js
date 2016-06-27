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
