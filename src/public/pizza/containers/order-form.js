import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import {hasIngredientsInInventory, getRemainingInventory} from '../modules/selectors';
import MenuItem from '../components/menu-item';

class PizzaOrderForm extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit() {
		this.props.onSubmitOrder(this.props.orderItems, this.props.remainingInventory);
	}

	render() {
		const { menuItems, onUpdateItemQty, onSubmitOrder, onClearOrder } = this.props;
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
	orderItems: PropTypes.object.isRequired,
	remainingInventory: PropTypes.array.isRequired,
	onSubmitOrder: PropTypes.func.isRequired,
	onClearOrder: PropTypes.func.isRequired,
	onUpdateItemQty: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	const remainingInventory = getRemainingInventory(state.inventory.items, state.order.items, state.menu.items);
	return {
		orderItems: state.order.items,
		remainingInventory,
		menuItems: state.menu.items.map((item) => {
			return {
				id: item.id,
				desc: item.desc,
				size: item.size,
				// TAKE NOTE: tough bug due to numeric keys: 'order.items[item.id]' was borked!
				qty: _.get(state, `order.items.${item.id}`, 0),
				isAvailable: hasIngredientsInInventory(remainingInventory, item.ingredients)
			};
		})
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onSubmitOrder: (order, remainingInventory) => {
			dispatch({
				type: 'SUBMIT_ORDER',
				payload: {
					order,
					remainingInventory
				}
			});
		},
		onClearOrder: () => dispatch({ type: 'CANCEL_ORDER' }),
		onUpdateItemQty: (item) => {
			dispatch({
				type: 'UPDATE_ITEM_QTY',
				payload: {
					item
				}
			});
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PizzaOrderForm);
