import React, { Component, PropTypes } from 'react';

export default class MenuItem extends Component {
	constructor(props) {
		super(props);
		this.increment = this.increment.bind(this);
	}

	increment(units) {
		const {id, qty} = this.props;
		this.props.onUpdateItemQty({
			id,
			qty: qty + units
		});
	}

	render() {
		const {desc, size, qty, isAvailable} = this.props;
		return (
			<div>
				<span>{`${size} ${desc}`}</span>
				<span>*{qty}*</span>
				<span>
					<button
						disabled={qty <= 0}
						onClick={() => {this.increment(-1);}}
					>
						-
					</button>
					<button
						disabled={!isAvailable}
						onClick={() => {this.increment(1);}}
					>
						+
					</button>
				</span>
			</div>
		);
	}
}

MenuItem.propTypes = {
	desc: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	size: PropTypes.string.isRequired,
	qty: PropTypes.number.isRequired,
	isAvailable: PropTypes.bool.isRequired,
	onUpdateItemQty: PropTypes.func.isRequired
};
