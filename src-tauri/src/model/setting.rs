use diesel::prelude::*;
use serde::Serialize;

#[derive(Serialize, Queryable, Selectable)]
#[diesel(table_name = crate::schema::settings)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Setting {
    pub id: i32,
    pub run_on_background: i16,
    pub sync: i16,
}
