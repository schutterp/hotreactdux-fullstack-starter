import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class PizzaApp extends Component {
	constructor(props) {
		super(props)
		this.incrementAsync = this.incrementAsync.bind(this)
		this.incrementIfOdd = this.incrementIfOdd.bind(this)
	}

	incrementIfOdd() {
		if (this.props.currentCount % 2 !== 0) {
			this.props.onIncrement()
		}
	}

	incrementAsync() {
		setTimeout(this.props.onIncrement, 1000)
	}

	render() {
		const { currentCount, onIncrement, onDecrement } = this.props
		return (
			<p>
				Clicked: {currentCount} times
				{' '}
				<button onClick={onIncrement}>
					+
				</button>
				{' '}
				<button onClick={onDecrement}>
					-
				</button>
				{' '}
				<button onClick={this.incrementIfOdd}>
					Increment if odd
				</button>
				{' '}
				<button onClick={this.incrementAsync}>
					Increment async
				</button>
			</p>
		)
	}
}

PizzaApp.propTypes = {
	currentCount: PropTypes.number.isRequired,
	onIncrement: PropTypes.func.isRequired,
	onDecrement: PropTypes.func.isRequired
};

function mapStateToProps(state) {
	return {
		currentCount: state
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onIncrement: () => dispatch({ type: 'INCREMENT' }),
		onDecrement: () => dispatch({ type: 'DECREMENT' })
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PizzaApp);
