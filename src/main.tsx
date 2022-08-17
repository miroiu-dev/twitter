import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './hooks/UserContext';
import { TweetsProvider } from './hooks/TweetsContext';
import { BrowserRouter } from 'react-router-dom';

const MemoizedApp = memo(App);

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<TweetsProvider>
				<UserProvider>
					<MemoizedApp />
				</UserProvider>
			</TweetsProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
