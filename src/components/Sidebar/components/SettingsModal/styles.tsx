import styled from 'styled-components';

export const Container = styled.section`
	display: flex;
	flex-direction: column;
	width: 600px;
	gap: 20px;
	margin-bottom: 20px;
`;

export const UserArea = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 10px;
	margin-bottom: 20px;
`;

export const ProfileImage = styled.img.attrs({
	referrerPolicy: 'no-referrer'
})`
	height: 80px;
	aspect-ratio: 1;
	border-radius: 40px;
`;

export const FakeImage = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 80px;
	aspect-ratio: 1;
	border-radius: 40px;
	background-color: ${(props) => props.theme.secondary.main};
	color: ${(props) => props.theme.secondary.contrastText};
	font-size: ${(props) => props.theme.fontSize.largeTitle};
`;

export const Subtitle = styled.h2`
	color: ${(props) => props.theme.primary.contrastText};
	font-size: ${(props) => props.theme.fontSize.smallTitle};
	margin: 0;
	opacity: 0.8;
`;

export const Label = styled.label`
	color: ${(props) => props.theme.primary.contrastText};
	font-size: ${(props) => props.theme.fontSize.normalText};
`;

export const HorizontalArea = styled.div`
	display: flex;
	flex-direction: row;
	gap: 10px;
	align-items: center;
	justify-content: space-between;
	padding: 0 10px;
`;
