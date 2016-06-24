import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

fetch('ingredients')
.then((res) => {
	return res.json();
})
.then((data) => {
	ReactDOM.render(<App ingredients={data} />, document.getElementById('root'));
})
.catch((err) => {
	console.log('error: ', err);
});
