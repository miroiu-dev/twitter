import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './hooks/UserContext';
import { TweetsProvider } from './hooks/TweetsContext';
// console.log = (l: any) => document.write(l);
ReactDOM.render(
	<React.StrictMode>
		<TweetsProvider>
			<UserProvider>
				<App />
			</UserProvider>
		</TweetsProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
