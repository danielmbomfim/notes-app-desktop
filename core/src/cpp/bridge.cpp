#include <vector>
#include <string>
#include <optional>
#include "rust/cxx.h"
#include <cpprealm/sdk.hpp>
#include "../../realm_rs/realm_rs.h"

using std::vector;
using std::string;

struct Note {
    realm::primary_key<realm::object_id> _id;
    std::optional<string> title;
    std::optional<string> content;
    string owner_id;
};

struct RustNote {
    rust::String _id;
    rust::String title;
    rust::String content;
};

void login(rust::String token, rust::String path) {
    return _login(string(token), string(path));
}

void logout() {
    return _logout();
}

RustNote create_note(rust::String title, rust::String content) {
    std::optional<string> _title = title.empty() ? std::nullopt : std::optional<string> { string(title) };
    std::optional<string> _content = content.empty() ? std::nullopt : std::optional<string> { string(content) };

    auto note = _create_note(_title, _content);

    return RustNote {
        ._id = rust::String(note._id.value.to_string()),
        .title = rust::String(note.title.value_or("")),
        .content = rust::String(note.content.value_or("")),
    };
}

RustNote get_note(rust::String id) {
    auto note =_get_note(string(id));

    return RustNote {
        ._id = rust::String(note._id.value.to_string()),
        .title = rust::String(note.title.value_or("")),
        .content = rust::String(note.content.value_or("")),
    };
}

rust::Vec<RustNote> get_notes() {
    vector<Note> notes = _get_notes();
    rust::Vec<RustNote> results;

    for (unsigned i = 0; i < notes.size(); i++) {
        auto note = RustNote {
            ._id = rust::String(notes[i]._id.value.to_string()),
            .title = rust::String(notes[i].title.value_or("")),
            .content = rust::String(notes[i].content.value_or("")),
        };
        results.push_back(note);
    }
                
    return results;
}

RustNote update_note(rust::String id, rust::String title, rust::String content) {
    std::optional<string> _title = title.empty() ? nullptr : string(title);
    std::optional<string> _content = content.empty() ? nullptr : string(content);

    auto note = _update_note(string(id), _title, _content);

    return RustNote {
        ._id = rust::String(note._id.value.to_string()),
        .title = rust::String(note.title.value_or("")),
        .content = rust::String(note.content.value_or("")),
    };
}

void delete_note(rust::String id) {
    return _delete_note(string(id));
}

void delete_notes() {
    return _delete_notes();
}

void close_realm() {
    return _close_realm();
}
