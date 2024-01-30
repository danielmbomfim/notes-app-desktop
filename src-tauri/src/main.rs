#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database;
mod model;
mod schema;
mod services;

use std::{ffi::OsString, fs::create_dir, io::Error, path::Path};

use database::note::{create_note, delete_note, get_note, get_notes, update_note};
use model::{get_connection_pool, DatabaseManager};
use services::authentication::login;
use tauri::{
    api::path::config_dir, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    WindowEvent,
};

fn create_config_folder() -> Result<String, Error> {
    let config_dir =
        config_dir().expect("It was not possible to obtain the configuration directory");

    let mut path: OsString = OsString::from(config_dir);
    path.push("/simple-notes");

    if !Path::new(&path).exists() {
        create_dir(&path)?;
    }

    path.push("/database.db");
    Ok(path.to_str().unwrap().to_owned())
}

fn main() {
    let tray_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("open", "Abrir"))
        .add_item(CustomMenuItem::new("exit", "Sair"));

    let system_tray = SystemTray::new().with_menu(tray_menu);

    let database_path =
        create_config_folder().expect("It was not possible to create the configuration directory");

    let pool = DatabaseManager::new(get_connection_pool(&database_path));

    pool.sync_schema()
        .expect("Unable to execute database schema sync");

    let state = pool;

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_notes,
            get_note,
            create_note,
            update_note,
            delete_note,
            login,
        ])
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::MenuItemClick { id, .. } => {
                match id.as_str() {
                    "open" => {
                        let window = app.get_window("main").unwrap();
                        window.show().unwrap();
                    }
                    "exit" => std::process::exit(0),
                    _ => {}
                };
            }
            _ => {}
        })
        .manage(state)
        .on_window_event(|event| match event.event() {
            WindowEvent::CloseRequested { api, .. } => {
                api.prevent_close();
                event.window().hide().unwrap();
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
