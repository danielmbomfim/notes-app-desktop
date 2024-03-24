#include <string>
#include <vector>
#include <optional>
#include "rust/cxx.h"

using std::string;
using std::vector;

struct RustNote;

void login(rust::String token, rust::String path);

void logout();

RustNote create_note(rust::String title, rust::String content);

RustNote get_note(rust::String id);

rust::Vec<RustNote> get_notes();

RustNote update_note(rust::String id, rust::String title, rust::String content);

void delete_note(rust::String id);

void delete_notes();

void close_realm();
