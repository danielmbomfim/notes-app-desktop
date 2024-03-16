#include <string>
#include <vector>
#include <optional>
#include "rust/cxx.h"

using std::string;
using std::vector;

struct Note;
struct User;

void login(rust::String token);

void logout();

Note create_note(rust::String title, rust::String content);

Note get_note(rust::String id);

rust::Vec<Note> get_notes();

Note update_note(rust::String id, rust::String title, rust::String content);

void delete_note(rust::String id);

void delete_notes();

void close_realm();
