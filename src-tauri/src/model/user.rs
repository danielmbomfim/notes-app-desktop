use diesel::prelude::*;
use serde::Serialize;

#[derive(Serialize, Queryable, Selectable)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct User {
    pub id: i32,
    pub name: String,
    pub email: String,
    pub image: String,
    pub google_id: String,
}
