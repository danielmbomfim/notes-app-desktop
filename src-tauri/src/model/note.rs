use diesel::prelude::*;
use serde::Serialize;

#[derive(Serialize, Queryable, Selectable)]
#[diesel(table_name = crate::schema::notes)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Note {
    pub id: i32,
    pub title: String,
    pub content: String,
}
