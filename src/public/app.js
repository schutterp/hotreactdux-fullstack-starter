import React, { Component } from 'react';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		fetch('orders', {
			method: 'post'
		})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			console.log('order id: ', data);
		})
		.then((err) => {
			console.log(err);
		});
	}
	render() {
		const ingredientRows = this.props.ingredients.map((ingredient) => (
			<tr>
				<td>{ingredient.name}</td>
				<td>{ingredient.unitsAvailable}</td>
			</tr>
		));
		return (
			<div>
				<table>
					<tr>
						<th>Ingredient</th>
						<th>Qty</th>
					</tr>
					{ingredientRows}
				</table>
				<button onClick={this.handleClick}>Create Order</button>
			</div>
		);
	}
}
