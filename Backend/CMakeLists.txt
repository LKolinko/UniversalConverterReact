cmake_minimum_required(VERSION 3.26.4)
project(UniversalConverter)

set(CMAKE_CXX_STANDARD 17)

add_executable(UniversalConverter main.cpp
        core/BigInteger.h
        src/BigInteger.cpp
        core/Fraction.h
        src/Fraction.cpp)

include_directories(./cpp-httplib/)
target_link_libraries(UniversalConverter jsoncpp)