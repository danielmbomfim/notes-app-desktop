import {} from 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		primary: string;
		secondary: string;
		alert: string;
		background: string;
		details: string;
	}
}
