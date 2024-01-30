use diesel::{connection::SimpleConnection, r2d2::ConnectionManager, SqliteConnection};
use r2d2::{ManageConnection, Pool};

pub mod note;
pub mod user;

pub type SqliteManager = ConnectionManager<SqliteConnection>;

pub struct DatabaseManager<T: ManageConnection> {
    pub pool: Pool<T>,
}

impl DatabaseManager<SqliteManager> {
    pub fn new(pool: Pool<SqliteManager>) -> DatabaseManager<SqliteManager> {
        DatabaseManager { pool }
    }

    pub fn sync_schema(&self) -> Result<(), String> {
        let connection = &mut self.pool.get().map_err(|err| err.to_string())?;

        connection
            .batch_execute(
                "
            create table if not exists notes (
                id integer primary key not null,
                title text not null,
                content text not null
            );
            create table if not exists users (
                id integer primary key not null,
                name text not null,
                email text not null,
                image text not null,
                google_id text not null
            );
        ",
            )
            .map_err(|err| err.to_string())?;

        Ok(())
    }
}

pub fn get_connection_pool(database_path: &str) -> Pool<ConnectionManager<SqliteConnection>> {
    let manager: ConnectionManager<SqliteConnection> =
        ConnectionManager::<SqliteConnection>::new(database_path);

    Pool::builder()
        .test_on_check_out(true)
        .build(manager)
        .expect("Could not build connection pool")
}
