import { useEffect } from 'react';
import Modal from '../../../Modal';
import { useAuth } from '../../../../contexts/authContext';
import { ModalProps } from '../../../../types';

export default function CloseModal({
	visible,
	onCloseRequest
}: ModalProps): React.ReactElement {
	const { logout } = useAuth();

	useEffect(() => {
		function handleEsc(evt: KeyboardEvent) {
			if (evt.key === 'Escape' || evt.key === 'Esc') {
				onCloseRequest();
			}
		}

		window.addEventListener('keydown', handleEsc);

		return () => window.removeEventListener('keydown', handleEsc);
	}, [visible]);

	function handleLogout() {
		logout();
		onCloseRequest();
	}

	return (
		<Modal.Container visible={visible} onCloseRequest={onCloseRequest}>
			<Modal.Content>
				Tem certeza que deseja sair da sua conta?
			</Modal.Content>
			<Modal.ActionsArea>
				<Modal.Action text="Cancelar" onClick={onCloseRequest} />
				<Modal.Action text="Confirmar" onClick={handleLogout} />
			</Modal.ActionsArea>
		</Modal.Container>
	);
}
