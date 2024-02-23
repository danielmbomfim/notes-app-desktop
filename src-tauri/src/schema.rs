diesel::table! {
    notes (id) {
        id -> Integer,
        title -> Text,
        content -> Text,
    }
}

diesel::table! {
    users (id) {
        id -> Integer,
        name -> Text,
        email -> Text,
        image -> Text,
        google_id -> Text,
    }
}

diesel::table! {
    settings (id) {
        id -> Integer,
        run_on_background -> SmallInt,
        sync -> SmallInt,
    }
}
