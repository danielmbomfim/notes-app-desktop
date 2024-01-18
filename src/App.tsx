import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditionPage from './pages/EditionPage';
import NewNotePage from './pages/NewNotesPage';
import {
	DefaultTheme,
	ThemeProvider,
	createGlobalStyle
} from 'styled-components';

const appTheme: DefaultTheme = {
	primary: '#344955',
	secondary: '#485b66',
	alert: '#f9aa33',
	background: '#d6dadd',
	details: '#fff'
};

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
		background-color: ${(props) => props.theme.background};
	}
`;

const router = createBrowserRouter([
	{ path: '/', Component: HomePage },
	{ path: '/new-notes-page', Component: NewNotePage },
	{ path: '/edition-page/:id', Component: EditionPage }
]);

export default function App() {
	return (
		<ThemeProvider theme={appTheme}>
			<GlobalStyle />
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}
