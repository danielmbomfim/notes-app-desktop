import { Overlay, Container, Text, ButtonsArea, Button } from './styles';
import { ModalProps } from '../../types';

export default function Modal({
	content,
	options,
	onCloseRequest,
	visible
}: ModalProps): React.ReactElement | null {
	return !visible ? null : (
		<Overlay onClick={onCloseRequest}>
			<Container>
				<Text>{content}</Text>
				<ButtonsArea>
					{options.map((option) => (
						<Button onClick={option.action}>{option.text}</Button>
					))}
				</ButtonsArea>
			</Container>
		</Overlay>
	);
}
