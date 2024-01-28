use crate::model::note::Note;
use crate::model::{DatabaseManager, SqliteManager};
use crate::schema::notes::dsl as note_table;
use crate::schema::notes::dsl::notes;
use diesel::{insert_into, prelude::*};
use serde::Deserialize;
use tauri::State;

#[derive(Deserialize, Debug)]
pub struct QueryParams {
    text: Option<String>,
}

#[tauri::command]
pub fn get_notes(
    params: QueryParams,
    state: State<DatabaseManager<SqliteManager>>,
) -> Result<Vec<Note>, String> {
    let connection = &mut state.pool.get().map_err(|err| err.to_string())?;

    let mut query = notes.into_boxed();

    if let Some(value) = params.text {
        query = query.filter(
            note_table::title
                .like(format!("{}%", value))
                .or(note_table::content.like(format!("{}%", value))),
        );
    }

    let results = query
        .select(Note::as_select())
        .load(connection)
        .map_err(|err| err.to_string())?;

    Ok(results)
}

#[tauri::command]
pub fn get_note(id: i32, state: State<DatabaseManager<SqliteManager>>) -> Result<Note, String> {
    let connection = &mut state.pool.get().map_err(|err| err.to_string())?;

    let result = notes
        .filter(note_table::id.eq(id))
        .select(Note::as_select())
        .first(connection)
        .map_err(|err| err.to_string())?;

    Ok(result)
}

#[tauri::command]
pub fn create_note(
    title: &str,
    content: &str,
    state: State<DatabaseManager<SqliteManager>>,
) -> Result<Note, String> {
    let connection = &mut state.pool.get().map_err(|err| err.to_string())?;

    let inserted_note = insert_into(notes)
        .values((
            note_table::title.eq(title),
            (note_table::content.eq(content)),
        ))
        .returning(Note::as_returning())
        .get_result(connection)
        .map_err(|err| err.to_string())?;

    Ok(inserted_note)
}

#[tauri::command]
pub fn update_note(
    id: i32,
    title: &str,
    content: &str,
    state: State<DatabaseManager<SqliteManager>>,
) -> Result<Note, String> {
    let connection = &mut state.pool.get().map_err(|err| err.to_string())?;

    let updated_note = diesel::update(notes.filter(note_table::id.eq(id)))
        .set((note_table::title.eq(title), note_table::content.eq(content)))
        .returning(Note::as_returning())
        .get_result(connection)
        .map_err(|err| err.to_string())?;

    Ok(updated_note)
}

#[tauri::command]
pub fn delete_note(id: i32, state: State<DatabaseManager<SqliteManager>>) -> Result<(), String> {
    let connection = &mut state.pool.get().map_err(|err| err.to_string())?;

    let _ = diesel::delete(notes.filter(note_table::id.eq(id)))
        .execute(connection)
        .map_err(|err| err.to_string())?;

    Ok(())
}
