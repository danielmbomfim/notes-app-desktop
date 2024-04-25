cmake_minimum_required(VERSION 3.15)

project(RealmRs)

set(CMAKE_CXX_FLAGS "-fpermissive")

if(CMAKE_SYSTEM_NAME STREQUAL "Linux")
  set(CMAKE_CXX_FLAGS "-fpermissive -Wchanges-meaning")
endif()

set(CMAKE_CXX_STANDARD 17)
set(REALM_CPP_NO_TESTS ON)

# In a Windows install, set these compiler flags:
if(MSVC)
  set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} /Zc:preprocessor /bigobj")
endif()

# Include the FetchContent module so you can download the C++ SDK
Include(FetchContent)

# Declare the version of the C++ SDK you want to download
FetchContent_Declare(
  cpprealm
  GIT_REPOSITORY https://github.com/danielmbb/realm-cpp.git
  GIT_TAG        "origin/main"
)

# The MakeAvailable command ensures the named dependencies have been populated
FetchContent_MakeAvailable(cpprealm)

add_library(realm_rs STATIC main.cpp)

target_link_libraries(realm_rs PRIVATE cpprealm)

set_target_properties(realm_rs PROPERTIES PUBLIC_HEADER realm_rs.h)