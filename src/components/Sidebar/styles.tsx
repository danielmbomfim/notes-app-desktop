import styled from 'styled-components';

export const Container = styled.section`
	display: flex;
	flex-direction: column;
	gap: 8px;
	width: 300px;
	height: 100vh;
	background-color: ${(props) => props.theme.primary.main};

	> * {
		&:first-child {
			margin-top: 40px;
		}
	}
`;

export const Option = styled.button`
	display: flex;
	flex-direction: row;
	gap: 10px;
	align-items: center;
	margin: 0 15px;
	border: none;
	background-color: transparent;
`;

export const ProfileImage = styled.img.attrs({
	referrerPolicy: 'no-referrer'
})`
	height: 34px;
	aspect-ratio: 1;
	border-radius: 20px;
`;

export const FakeImage = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 34px;
	aspect-ratio: 1;
	border-radius: 20px;
	background-color: ${(props) => props.theme.secondary.main};
	color: ${(props) => props.theme.secondary.contrastText};
	font-size: ${(props) => props.theme.fontSize.mediumTitle};
`;

export const OptionTitle = styled.h2`
	color: ${(props) => props.theme.primary.contrastText};
	font-size: ${(props) => props.theme.fontSize.smallTitle};
	margin: 0;
	opacity: 0.8;
`;

export const OptionText = styled.h3`
	color: ${(props) => props.theme.primary.contrastText};
	font-size: ${(props) => props.theme.fontSize.normalText};
	font-weight: normal;
	margin: 0;
	opacity: 0.8;
`;
