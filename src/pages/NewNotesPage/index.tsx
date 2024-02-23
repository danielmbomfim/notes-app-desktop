import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/Header';
import database from '../../services/notesService';
import { Container, InputsArea, TitleInput, ContentInput } from './styles';
import { PopoverOption } from '../../types';
import FixedButton from '../../components/FixedButton';

export default function NewNotePage(): React.ReactElement {
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const menuOptions: PopoverOption[] = [
		{
			label: 'Salvar anotação',
			action: saveData
		},
		{
			label: 'Descartar anotação',
			action: () => navigate('/')
		}
	];

	function saveData() {
		if (!title && !content) {
			return;
		}

		database.createNote({ title, content });
		navigate('/');
	}

	return (
		<Container>
			<Header
				title="Nova anotação"
				onGoBack={saveData}
				options={menuOptions}
			/>
			<InputsArea>
				<TitleInput
					placeholder="Título"
					value={title}
					onChange={(evt) => setTitle(evt.target.value)}
				/>
				<ContentInput
					placeholder="Sua anotação"
					value={content}
					onChange={(evt) => setContent(evt.target.value)}
				/>
			</InputsArea>
			<FixedButton icon={faCheck} onClick={saveData} />
		</Container>
	);
}
