use diesel::insert_into;
use diesel::prelude::*;
use diesel::SelectableHelper;
use tauri::State;

use crate::{
    model::{user::User, DatabaseManager, SqliteManager},
    schema::users::dsl::email as user_email,
    schema::users::dsl::google_id as user_google_id,
    schema::users::dsl::id as user_id,
    schema::users::dsl::image as user_image,
    schema::users::dsl::name as user_name,
    schema::users::dsl::users,
};

#[tauri::command]
pub fn get_user(id: i32, state: State<DatabaseManager<SqliteManager>>) -> Result<User, String> {
    let connection = &mut state.pool.get().map_err(|err| err.to_string())?;

    let user = users
        .select(User::as_select())
        .filter(user_id.eq(id))
        .first(connection)
        .map_err(|err| err.to_string())?;

    Ok(user)
}

#[tauri::command]
pub fn create_user(
    name: &str,
    email: &str,
    image: &str,
    google_id: &str,
    state: State<DatabaseManager<SqliteManager>>,
) -> Result<User, String> {
    let connection = &mut state.pool.get().map_err(|err| err.to_string())?;

    let inserted_user = insert_into(users)
        .values((
            user_name.eq(name),
            user_email.eq(email),
            user_image.eq(image),
            user_google_id.eq(google_id),
        ))
        .returning(User::as_returning())
        .get_result(connection)
        .map_err(|err| err.to_string())?;

    Ok(inserted_user)
}
