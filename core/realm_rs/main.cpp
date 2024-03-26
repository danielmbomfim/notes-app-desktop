#include <cpprealm/sdk.hpp>

#if __APPLE__
#include <CoreFoundation/CoreFoundation.h>
#else
#include <uv.h>
#endif

namespace realm {
    struct Note {
        realm::primary_key<realm::object_id> _id;
        std::optional<std::string> title;
        std::optional<std::string> content;
        std::string owner_id;
    };

    REALM_SCHEMA(Note, _id, title, content, owner_id)
}

realm::App get_app(std::string path) {
    auto app_config = realm::App::configuration();
    app_config.app_id = "notes-app-cnyvm";
    app_config.path = path;
    auto app = realm::App(app_config);

    return app;
}

class RealmManager {
    protected:
        RealmManager() {}

        static RealmManager* realm_manager_;
        realm::user user;
        std::optional<realm::db> synced_realm;

    public:
        RealmManager(RealmManager &other) = delete;
        void operator=(const RealmManager &) = delete;
        static RealmManager *GetInstance();

        void authenticate_user(std::string token, std::string path) {
            auto app = get_app(path);
            auto user = app.login(realm::App::credentials::custom(token)).get();
            auto config = user.flexible_sync_configuration();

            auto synced_realm = realm::db(std::move(config));

            auto update_success = synced_realm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
                subs.add<realm::Note>("notes");
            }).get();

            synced_realm.get_sync_session()->wait_for_upload_completion().get();
            synced_realm.get_sync_session()->wait_for_download_completion().get();

            synced_realm.refresh();

            this->user = user;
            this->synced_realm = synced_realm;
        }

        realm::user get_user() {
            return this->user;
        }

        std::optional<realm::db> get_synced_realm() {
            return this->synced_realm;
        }

        realm::db get_unsynced_realm() {
            auto config = this->user.flexible_sync_configuration();

            auto realm = realm::open<realm::Note>(std::move(config));
            
            return realm;
        }
};

RealmManager* RealmManager::realm_manager_= nullptr;

RealmManager *RealmManager::GetInstance() {
    if (realm_manager_ == nullptr){
        realm_manager_ = new RealmManager();
    }

    return realm_manager_;
}

void _login(std::string token, std::string path) {
    auto manager = RealmManager::GetInstance();
    manager->authenticate_user(token, path);
}

void _logout() {
    auto manager = RealmManager::GetInstance();
    auto user = manager->get_user();

    user.log_out().get();
}

realm::Note _create_note(std::optional<std::string> title, std::optional<std::string> content) {
    auto manager = RealmManager::GetInstance();
    auto _realm = manager->get_unsynced_realm();
    auto user = manager->get_user();

    realm::Note draft {
        ._id = realm::object_id::generate(),
        .title = title,
        .content = content,
        .owner_id = user.identifier(),
    };

    auto note = _realm.write([&_realm, &draft]() {
        return _realm.add(std::move(draft));
    });

    return note.detach();
}

std::vector<realm::Note> _get_notes(std::optional<std::string> search_text) {
    auto manager = RealmManager::GetInstance();
    auto _realm = manager->get_unsynced_realm();

    std::vector<realm::Note> results;
    auto managed_notes = _realm.objects<realm::Note>();

    if (search_text.has_value()) {
        auto filtered_notes = managed_notes.where([&search_text](auto &note) {
            auto filter = search_text.value();

            return note.title.contains(filter) || note.content.contains(filter);
        });

        for (size_t i = 0; i < filtered_notes.size(); i++) {
            results.push_back(filtered_notes[i].detach());
        }
    } else {
        for (size_t i = 0; i < managed_notes.size(); i++) {
            results.push_back(managed_notes[i].detach());
        }
    }
                
    return results;
}

realm::Note _get_note(std::string id) {
    auto manager = RealmManager::GetInstance();
    auto _realm = manager->get_unsynced_realm();

    auto notes = _realm.objects<realm::Note>();

    auto selected_note = notes.where([&id](auto& note) {
        return note._id == realm::object_id(id);
    })[0];

    return selected_note.detach();
}

realm::Note _update_note(std::string id, std::optional<std::string> title, std::optional<std::string> content) {
    auto manager = RealmManager::GetInstance();
    auto _realm = manager->get_unsynced_realm();
    
    auto notes = _realm.objects<realm::Note>();

    auto selected_notes = notes.where([&id](auto& note) {
        return note._id == realm::object_id(id);
    });

    auto note = selected_notes[0];

    _realm.write([&note, &title, &content] {
        note.title = title;
        note.content = content;
    });

    return note.detach();
}

void _delete_note(std::string id) {
    auto manager = RealmManager::GetInstance();
    auto _realm = manager->get_unsynced_realm();

    auto notes = _realm.objects<realm::Note>();

    auto selected_notes = notes.where([&id](auto& note) {
        return note._id == realm::object_id(id);
    });

    auto note = selected_notes[0];

    _realm.write([&_realm, &note] {
        _realm.remove(note);
    });
}

void _delete_notes() {
    auto manager = RealmManager::GetInstance();
    auto _realm = manager->get_unsynced_realm();
    
    auto notes = _realm.objects<realm::Note>();

    _realm.write([&_realm, &notes] {
        for (size_t i = notes.size(); i > 0; i--) {
            auto note = notes[i - 1];
            _realm.remove(note);
        }
    });
}

void _close_realm() {
    auto manager = RealmManager::GetInstance();
    auto _realm = *std::move(manager->get_synced_realm());

    _realm.close();
}
