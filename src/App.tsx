import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import EditionPage from './pages/EditionPage';
import NewNotePage from './pages/NewNotesPage';
import { AuthProvider } from './contexts/authContext';
import {
	DefaultTheme,
	ThemeProvider,
	createGlobalStyle
} from 'styled-components';

const appTheme: DefaultTheme = {
	primary: {
		main: '#344955',
		contrastText: '#fff'
	},
	secondary: {
		main: '#f9aa33',
		contrastText: '#485b66'
	},
	background: '#d6dadd',
	fontSize: {
		largeTitle: '29.3px',
		mediumTitle: '22.6px',
		smallTitle: '20px',
		normalText: '17.3px',
		smallText: '13.3px'
	}
};

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
		background-color: ${(props) => props.theme.background};
		-webkit-user-select: none;
		user-select: none;
		cursor: default;
	}

	button, input, textarea {
		outline: none;
		-webkit-user-select: none;
		user-select: none;
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
			<Toaster />
			<GlobalStyle />
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</ThemeProvider>
	);
}
