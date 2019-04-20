#ifndef CMD_H
#define CMD_H

#include <array>
#include <cstdio>
#include <iostream>
#include <memory>
#include <stdexcept>
#include <string>
#include <sstream>

std::string exec(const char* cmd) {
    std::array<char, 128> buffer;
    std::string result;
    std::unique_ptr<FILE, decltype(&pclose)> pipe(popen(cmd, "r"), pclose);
    if (!pipe) {
        throw std::runtime_error("popen() failed!");
    }
    while (fgets(buffer.data(), buffer.size(), pipe.get()) != nullptr) {
        result += buffer.data();
    }
    return result;
}

std::string exec(const std::string& str) {
    return exec(str.c_str());
}

enum os_type { MAC, UBUNTU };

std::string get_route_cmd(const std::string& host, os_type os = MAC,
    const std::string& interface = "utun1") {
    std::ostringstream result;
    switch (os) {
        case MAC:
            result << "route add -host " << host << " -interface " << interface;
        break;
        case UBUNTU:
            result << "ip route add " << host << " dev " << interface;
        break;
    }
    return result.str();
}

#endif
