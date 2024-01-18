import { Note, NoteDraft, NotesProvider } from '../types';

class FakeDatabaseService implements NotesProvider {
	private notes: Note[] = [{ id: 1, title: 'teste', content: 'teste' }];

	async createNote(data: NoteDraft) {
		const note = { id: new Date().getTime(), ...data };
		this.notes.push(note);

		return note;
	}

	async updateNote(note: Note) {
		const [target] = this.notes.filter((n) => n.id === note.id);

		target.title = note.title;
		target.content = note.content;

		return note;
	}

	async getNote(id: number) {
		const [note] = this.notes.filter((n) => n.id === id);

		return note;
	}

	async getNotes() {
		return [...this.notes];
	}

	async deleteNote(id: number) {
		this.notes = this.notes.filter((note) => note.id !== id);
	}
}

export default new FakeDatabaseService();
