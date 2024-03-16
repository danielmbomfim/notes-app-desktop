use cmake::Config;

fn main() {
    let lib = Config::new("realm_rs")
        .cxxflag("-fpermissive")
        .cxxflag("-Wchanges-meaning")
        .cxxflag("-fPIC")
        .env("REALM_CPP_NO_TESTS", "ON")
        .env("CMAKE_CXX_STANDARD", "17")
        .very_verbose(true)
        .build();

    println!("cargo:rustc-link-search=native={}/build/", lib.display());
    println!("cargo:rustc-link-lib=dylib=realm_rs");

    cxx_build::bridge("src/lib.rs")
        .file("src/cpp/bridge.cpp")
        .include("realm_rs")
        .flag_if_supported("-std=c++17")
        .compile("cxx-bridge");

    println!("cargo:rerun-if-changed=src/lib.rs");
    println!("cargo:rerun-if-changed=src/cpp/bridge.cpp");
    println!("cargo:rerun-if-changed=src/cpp/bridge.h");
}
