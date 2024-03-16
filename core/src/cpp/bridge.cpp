#include <vector>
#include <string>
#include <optional>
#include "rust/cxx.h"
#include "../../realm_rs/realm_rs.h"

using std::vector;
using std::string;

struct Note {
    string _id;
    string title;
    string content;
};

void login(rust::String token) {
    return _login(string(token));
}

void logout() {
    return _logout();
}

Note create_note(rust::String title, rust::String content) {
    std::optional<string> _title = title.empty() ? nullptr : string(title);
    std::optional<string> _content = content.empty() ? nullptr : string(content);

    return _create_note(_title, _content);
}

Note get_note(rust::String id) {
    return _get_note(string(id));
}

rust::Vec<Note> get_notes() {
    vector<Note> notes = _get_notes();
    rust::Vec<Note> results;

    for (unsigned i = 0; i < notes.size(); i++) {
        results.push_back(notes[i]);
    }
                
    return results;
}

Note update_note(rust::String id, rust::String title, rust::String content) {
    std::optional<string> _title = title.empty() ? nullptr : string(title);
    std::optional<string> _content = content.empty() ? nullptr : string(content);

    return _update_note(string(id), _title, _content);
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
