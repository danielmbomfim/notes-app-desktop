#[cxx::bridge]
pub mod ffi {
    struct RustNote {
        _id: String,
        title: String,
        content: String,
    }

    unsafe extern "C++" {
        include!("notes-core/src/cpp/bridge.h");

        pub fn login(token: String, path: String);

        pub fn logout();

        pub fn create_note(title: String, content: String) -> RustNote;

        pub fn get_note(id: String) -> RustNote;

        pub fn get_notes() -> Vec<RustNote>;

        pub fn update_note(id: String, title: String, content: String) -> RustNote;

        pub fn delete_note(id: String);

        pub fn delete_notes();

        pub fn close_realm();
    }
}
