import React, { Component } from 'react';

export default class App extends Component {
	render() {
		const ingredientRows = this.props.ingredients.map((ingredient) => (
			<tr>
				<td>{ingredient.name}</td>
				<td>{ingredient.unitsAvailable}</td>
			</tr>
		));
		return (
			<table>
				<tr>
					<th>Ingredient</th>
					<th>Qty</th>
				</tr>
				{ingredientRows}
			</table>
		);
	}
}
