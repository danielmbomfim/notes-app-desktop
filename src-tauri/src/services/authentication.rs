use notes_core::ffi::{close_realm, login as realm_login, logout as realm_logout};
use reqwest::Error;
use serde::{Deserialize, Serialize};
use std::{borrow::Cow, collections::HashMap, ffi::OsString};
use tauri::{api::path::config_dir, Window};
use tauri_plugin_oauth::{start_with_config, OauthConfig};

#[derive(Deserialize, Serialize, Clone, Debug)]
pub struct User {
    #[serde(rename(deserialize = "sub"))]
    id: String,
    name: String,
    email: String,
    #[serde(rename(deserialize = "picture"))]
    image: String,
    token: String,
}

#[derive(Deserialize)]
struct RefreshData {
    token: String,
}

#[derive(Serialize, Clone)]
struct LoginPayload {
    step: String,
    user: Option<User>,
    error: Option<String>,
}

impl LoginPayload {
    fn default() -> LoginPayload {
        LoginPayload {
            step: "start".to_owned(),
            error: None,
            user: None,
        }
    }

    fn from_error(error: &Error) -> LoginPayload {
        LoginPayload {
            error: Some(error.to_string()),
            user: None,
            step: "end".to_owned(),
        }
    }

    fn new(user: User) -> LoginPayload {
        LoginPayload {
            user: Some(user),
            error: None,
            step: "end".to_owned(),
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
        let _ = window.emit("authentication", LoginPayload::default());

        let start_position = url.find("access_token=").unwrap_or(0);
        let end_position = url.find("&token_type").unwrap_or(url.len());

        let access_token = &url[start_position + 13..end_position];
        let url: &str = "http://localhost:8000/authentication";

        let mut body = HashMap::new();
        body.insert("code", access_token);

        let client = reqwest::blocking::Client::new();
        let res = client.post(url).json(&body).send();

        match res {
            Ok(response) => {
                let body: Result<User, Error> = response.json();

                match body {
                    Ok(user) => {
                        let config_dir = config_dir()
                            .expect("It was not possible to obtain the configuration directory");

                        let mut path: OsString = OsString::from(config_dir);
                        path.push("/simple-notes");

                        realm_login(user.token.to_owned(), path.to_str().unwrap().to_owned());

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

#[tauri::command(async)]
pub async fn restore_session(token: String) -> Result<String, String> {
    let url: &str = "http://localhost:8000/refresh";

    let client = reqwest::Client::new();
    let res = client
        .get(url)
        .header("Authorization", format!("Bearer {}", token))
        .send()
        .await
        .map_err(|err| err.to_string())?;

    let data: RefreshData = res.json().await.map_err(|err| err.to_string())?;

    let config_dir =
        config_dir().expect("It was not possible to obtain the configuration directory");

    let mut path: OsString = OsString::from(config_dir);
    path.push("/simple-notes");

    realm_login(data.token.to_owned(), path.to_str().unwrap().to_owned());

    Ok(data.token)
}

#[tauri::command]
pub fn logout() -> Result<(), String> {
    realm_logout();
    close_realm();
    Ok(())
}
