import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
	hasEnoughInventory,
	getOrdersById,
	getMenuItems,
	isFetchingInventory
} from '../modules/selectors';
import {submitOrder, updateItemQty, cancelOrder, fetchInventory} from '../modules/actions';
import MenuItem from '../components/menu-item';

class PizzaOrderForm extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillMount() {
		this.props.onComponentWillMount();
	}

	onSubmit() {
		this.props.onSubmitOrder(this.props.ordersById);
	}

	render() {
		const {
			menuItems,
			onUpdateItemQty,
			onSubmitOrder,
			onClearOrder,
			isFetchingInventory
		} = this.props;
		if (isFetchingInventory) {
			return <span>loading...</span>;
		}
		return (
			<div>
				{menuItems.map((type) => (
					<MenuItem
						key={type.id}
						id={type.id}
						desc={type.desc}
						size={type.size}
						qty={type.qty}
						isAvailable={type.isAvailable}
						onUpdateItemQty={onUpdateItemQty}
					></MenuItem>
				))}
				<button onClick={this.onSubmit}>Submit Order</button>
				<button onClick={onClearOrder}>Clear</button>
			</div>
		);
	}
}

PizzaOrderForm.propTypes = {
	menuItems: PropTypes.arrayOf(React.PropTypes.shape({
		desc: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		size: PropTypes.string.isRequired,
		qty: PropTypes.number.isRequired,
		isAvailable: PropTypes.bool.isRequired
	})),
	ordersById: PropTypes.object.isRequired,
	isFetchingInventory: PropTypes.bool,
	onSubmitOrder: PropTypes.func.isRequired,
	onClearOrder: PropTypes.func.isRequired,
	onUpdateItemQty: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		isFetchingInventory: isFetchingInventory(state),
		ordersById: getOrdersById(state),
		menuItems: getMenuItems(state).map((item) => {
			return {
				id: item.id,
				desc: item.desc,
				size: item.size,
				// TAKE NOTE: tough bug due to numeric keys: 'order.items[item.id]' was borked!
				qty: _.get(state, `order.items.${item.id}`, 0),
				isAvailable: hasEnoughInventory(state, item.ingredients)
			};
		})
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onComponentWillMount: () => dispatch(fetchInventory()),
		onSubmitOrder: (order) => dispatch(submitOrder(order)),
		onClearOrder: () => dispatch(cancelOrder()),
		onUpdateItemQty: (item) => dispatch(updateItemQty(item))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PizzaOrderForm);
