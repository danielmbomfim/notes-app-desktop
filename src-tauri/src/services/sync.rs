use notes_core::ffi::{
    create_note as r_create_note, delete_note as r_delete_note, get_note as r_get_note,
    get_notes as r_get_notes, update_note as r_update_note, Note,
};
use serde::Serialize;

#[derive(Serialize)]
pub struct NoteData {
    pub id: String,
    pub title: String,
    pub content: String,
}

impl NoteData {
    pub fn from_realm(note: &Note) -> NoteData {
        NoteData {
            id: note._id.to_owned(),
            title: note.title.to_owned(),
            content: note.content.to_owned(),
        }
    }
}

#[tauri::command]
pub fn get_notes() -> Vec<NoteData> {
    let notes = r_get_notes();
    let mut results = Vec::with_capacity(notes.len());

    for note in notes.iter() {
        results.push(NoteData::from_realm(note));
    }

    results
}

#[tauri::command]
pub fn get_note(id: &str) -> NoteData {
    let note = r_get_note(id.to_owned());

    NoteData::from_realm(&note)
}

#[tauri::command]
pub fn create_note(title: &str, content: &str) -> NoteData {
    let note = r_create_note(title.to_owned(), content.to_owned());

    NoteData::from_realm(&note)
}

#[tauri::command]
pub fn update_note(id: &str, title: &str, content: &str) -> NoteData {
    let note = r_update_note(id.to_owned(), title.to_owned(), content.to_owned());

    NoteData::from_realm(&note)
}

#[tauri::command]
pub fn delete_note(id: &str) {
    r_delete_note(id.to_owned());
}
