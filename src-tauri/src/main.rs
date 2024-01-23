#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database;
mod model;
mod schema;

use database::note::{create_note, delete_note, get_note, get_notes, update_note};
use model::{get_connection_pool, DatabaseManager};

fn main() {
    let pool = get_connection_pool();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_notes,
            get_note,
            create_note,
            update_note,
            delete_note,
        ])
        .manage(DatabaseManager::new(pool))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
