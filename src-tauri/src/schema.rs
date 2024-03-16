diesel::table! {
    settings (id) {
        id -> Integer,
        run_on_background -> SmallInt,
        sync -> SmallInt,
    }
}
