use crate::model::setting::Setting;
use crate::model::{DatabaseManager, SqliteManager};
use crate::schema::settings::dsl::settings;
use diesel::{insert_into, prelude::*};
use serde::{Deserialize, Serialize};
use tauri::State;

use crate::{
    schema::settings::dsl::id as setting_id,
    schema::settings::dsl::run_on_background as setting_run_on_background,
    schema::settings::dsl::sync as setting_sync,
};

#[derive(Serialize, Deserialize)]
pub struct ParsedSetting {
    pub id: i32,
    pub sync: bool,
    #[serde(rename = "runOnBackground")]
    pub run_on_background: bool,
}

impl ParsedSetting {
    fn parse(setting: Setting) -> ParsedSetting {
        ParsedSetting {
            id: setting.id,
            sync: i16_to_bool(setting.sync),
            run_on_background: i16_to_bool(setting.run_on_background),
        }
    }
}

#[tauri::command]
pub fn get_setting(state: State<DatabaseManager<SqliteManager>>) -> Result<ParsedSetting, String> {
    let connection = &mut state.pool.get().map_err(|err| err.to_string())?;

    let result = settings
        .select(Setting::as_select())
        .first(connection)
        .optional()
        .map_err(|err| err.to_string())?;

    let setting = match result {
        Some(setting) => setting,
        None => create_setting(true, true, state)?,
    };

    Ok(ParsedSetting::parse(setting))
}

#[tauri::command]
pub fn set_setting(
    sync: bool,
    run_on_background: bool,
    state: State<DatabaseManager<SqliteManager>>,
) -> Result<ParsedSetting, String> {
    let connection = &mut state.pool.get().map_err(|err| err.to_string())?;

    let updated_setting = diesel::update(settings.filter(setting_id.eq(1)))
        .set((
            setting_sync.eq(bool_to_i16(sync)),
            setting_run_on_background.eq(bool_to_i16(run_on_background)),
        ))
        .returning(Setting::as_returning())
        .get_result(connection)
        .map_err(|err| err.to_string())?;

    Ok(ParsedSetting::parse(updated_setting))
}

fn create_setting(
    sync: bool,
    run_on_background: bool,
    state: State<DatabaseManager<SqliteManager>>,
) -> Result<Setting, String> {
    let connection = &mut state.pool.get().map_err(|err| err.to_string())?;

    let result = insert_into(settings)
        .values((
            setting_sync.eq(bool_to_i16(sync)),
            setting_run_on_background.eq(bool_to_i16(run_on_background)),
        ))
        .returning(Setting::as_returning())
        .get_result(connection)
        .map_err(|err| err.to_string())?;

    Ok(result)
}

fn bool_to_i16(v: bool) -> i16 {
    match v {
        true => 1,
        false => 0,
    }
}

fn i16_to_bool(v: i16) -> bool {
    match v {
        1 => true,
        _ => false,
    }
}
