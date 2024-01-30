use reqwest::Error;
use serde::{Deserialize, Serialize};
use std::borrow::Cow;
use tauri::Window;
use tauri_plugin_oauth::{start_with_config, OauthConfig};

#[derive(Deserialize, Serialize, Clone, Debug)]
struct User {
    #[serde(rename = "sub")]
    google_id: String,
    name: String,
    email: String,
    #[serde(rename = "picture")]
    image: String,
}

#[derive(Serialize, Clone)]
struct LoginPayload {
    user: Option<User>,
    error: Option<String>,
}

impl LoginPayload {
    fn from_error(error: &Error) -> LoginPayload {
        LoginPayload {
            error: Some(error.to_string()),
            user: None,
        }
    }

    fn new(user: User) -> LoginPayload {
        LoginPayload {
            user: Some(user),
            error: None,
        }
    }
}

#[tauri::command]
pub fn login(window: Window) -> Result<u16, String> {
    let mut config = OauthConfig::default();
    config.response = Some(Cow::from(
        "<html><body>Login realizado com sucesso. Retorne ao Aplicativo</body></html>",
    ));

    start_with_config(config, move |url| {
        let start_position = url.find("access_token=").unwrap_or(0);
        let end_position = url.find("&token_type").unwrap_or(url.len());

        let access_token = &url[start_position..end_position];
        let url = "https://www.googleapis.com/oauth2/v3/userinfo";

        let res = reqwest::blocking::get(format!("{}?{}", url, access_token));

        match res {
            Ok(response) => {
                let body: Result<User, Error> = response.json();

                match body {
                    Ok(user) => {
                        let _ = window.emit("authentication", LoginPayload::new(user));
                    }
                    Err(err) => {
                        let _ = window.emit("authentication", LoginPayload::from_error(&err));
                    }
                };
            }
            Err(err) => {
                let _ = window.emit("authentication", LoginPayload::from_error(&err));
            }
        };
    })
    .map_err(|err| err.to_string())
}

pub fn logout() {
    todo!();
}

pub fn clear() {
    todo!();
}
