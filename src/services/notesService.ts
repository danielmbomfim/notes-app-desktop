import { invoke } from '@tauri-apps/api/tauri';
import { Note, NoteDraft, NotesProvider, QueryParams } from '../types';

class NoteseService implements NotesProvider {
	async createNote(data: NoteDraft) {
		const note = await invoke<Note>('create_note', { ...data });

		return note;
	}

	async updateNote(note: Note) {
		const updatedNote = await invoke<Note>('update_note', { ...note });

		return updatedNote;
	}

	async getNote(id: number) {
		const note = await invoke<Note>('get_note', { id });

		return note;
	}

	async getNotes(params: QueryParams = {}) {
		const notes = await invoke<Note[]>('get_notes', { params });

		return notes;
	}

	async deleteNote(id: number) {
		await invoke<void>('delete_note', { id });
	}
}

export default new NoteseService();
