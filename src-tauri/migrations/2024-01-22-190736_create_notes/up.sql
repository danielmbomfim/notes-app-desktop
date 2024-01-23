-- Your SQL goes here
create table if not exists notes (
    id integer primary key not null,
    title text not null,
    content text not null
);