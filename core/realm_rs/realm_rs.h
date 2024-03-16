#include <string>
#include <vector>
#include <optional>

using std::string;
using std::vector;

struct Note;

void _login(string token);

void _logout();

Note _create_note(std::optional<string> title, std::optional<string> content);

vector<Note> _get_notes();

Note _get_note(string id);

Note _update_note(string id, std::optional<string> title, std::optional<string> content);

void _delete_note(string id);

void _delete_notes();

void _close_realm();
