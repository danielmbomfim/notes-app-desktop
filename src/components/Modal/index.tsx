import { Overlay, Container, Text, ButtonsArea, Button } from './styles';
import { ModalActionProps, ModalContainerProps } from '../../types';
import { PropsWithChildren } from 'react';

function ModalContainer({
	onCloseRequest,
	visible,
	children
}: ModalContainerProps): React.ReactElement | null {
	return !visible ? null : (
		<Overlay onClick={onCloseRequest}>
			<Container onClick={(evt) => evt.stopPropagation()}>
				{children}
			</Container>
		</Overlay>
	);
}

function Content({ children }: PropsWithChildren): React.ReactElement {
	return <Text>{children}</Text>;
}

function ActionsArea({ children }: PropsWithChildren): React.ReactElement {
	return <ButtonsArea>{children}</ButtonsArea>;
}

function Action({ onClick, text }: ModalActionProps) {
	return <Button onClick={onClick}>{text}</Button>;
}

export default {
	Container: ModalContainer,
	Content,
	ActionsArea,
	Action
};
