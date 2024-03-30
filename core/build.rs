use cmake::Config;

fn main() {
    let profile = std::env::var("PROFILE").unwrap();

    let lib = Config::new("realm_rs")
        .cxxflag("-fpermissive")
        .cxxflag("-Wchanges-meaning")
        .cxxflag("-fPIC")
        .env("REALM_CPP_NO_TESTS", "ON")
        .env("CMAKE_CXX_STANDARD", "17")
        .very_verbose(true)
        .build();

    println!("cargo:rustc-link-search=native={}/build/", lib.display());
    println!("cargo:rustc-link-search=native={}/lib/", lib.display());
    println!("cargo:rustc-link-lib=curl");
    println!("cargo:rustc-link-lib=uv");
    println!("cargo:rustc-link-lib=z");
    println!("cargo:rustc-link-lib=static=realm_rs");

    match profile.as_str() {
        "debug" => {
            println!("cargo:rustc-link-lib=static=realm-dbg");
            println!("cargo:rustc-link-lib=static=realm-parser-dbg");
            println!("cargo:rustc-link-lib=static=realm-sync-dbg");
            println!("cargo:rustc-link-lib=static=realm-object-store-dbg");
            println!("cargo:rustc-link-lib=static=cpprealm-dbg");
            println!("cargo:rustc-link-lib=static=realm-ffi-static-dbg");
        }
        "release" => {
            println!("cargo:rustc-link-lib=static=realm");
            println!("cargo:rustc-link-lib=static=realm-parser");
            println!("cargo:rustc-link-lib=static=realm-sync");
            println!("cargo:rustc-link-lib=static=realm-object-store");
            println!("cargo:rustc-link-lib=static=cpprealm");
            println!("cargo:rustc-link-lib=static=realm-ffi-static");
        }
        _ => (),
    }

    cxx_build::bridge("src/lib.rs")
        .file("src/cpp/bridge.cpp")
        .include("realm_rs")
        .include(format!("{}/include", lib.display()))
        .flag_if_supported("-std=c++17")
        .flag_if_supported("-fpermissive")
        .flag_if_supported("-Wchanges-meaning")
        .compile("cxx-bridge");

    println!("cargo:rerun-if-changed=src/lib.rs");
    println!("cargo:rerun-if-changed=src/cpp/bridge.cpp");
    println!("cargo:rerun-if-changed=src/cpp/bridge.h");
    println!("cargo:rerun-if-changed=realm_rs/main.cpp");
    println!("cargo:rerun-if-changed=realm_rs/realm_rs.h");
}
