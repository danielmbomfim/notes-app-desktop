import styled from 'styled-components';

export const Container = styled.section`
	display: flex;
	flex-direction: column;
	gap: 8px;
	width: 300px;
	height: 100vh;
	background-color: ${(props) => props.theme.primary};

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
	background-color: ${(props) => props.theme.alert};
	font-size: 18px;
`;

export const OptionTitle = styled.h2`
	color: ${(props) => props.theme.details};
	font-size: 16px;
	margin: 0;
	opacity: 0.8;
`;

export const OptionText = styled.h3`
	color: ${(props) => props.theme.details};
	font-size: 14px;
	margin: 0;
	opacity: 0.8;
`;
