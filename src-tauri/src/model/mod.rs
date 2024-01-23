use diesel::{r2d2::ConnectionManager, SqliteConnection};
use dotenvy::dotenv;
use r2d2::{ManageConnection, Pool};
use std::env;

pub mod note;

pub type SqliteManager = ConnectionManager<SqliteConnection>;

pub struct DatabaseManager<T: ManageConnection> {
    pub pool: Pool<T>,
}

impl DatabaseManager<SqliteManager> {
    pub fn new(pool: Pool<SqliteManager>) -> DatabaseManager<SqliteManager> {
        DatabaseManager { pool }
    }
}

pub fn get_connection_pool() -> Pool<ConnectionManager<SqliteConnection>> {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let manager = ConnectionManager::<SqliteConnection>::new(database_url);

    Pool::builder()
        .test_on_check_out(true)
        .build(manager)
        .expect("Could not build connection pool")
}
