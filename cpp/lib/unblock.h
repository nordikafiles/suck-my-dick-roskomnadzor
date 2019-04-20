#pragma once

#include <array>
#include <cstdio>
#include <iostream>
#include <memory>
#include <sstream>
#include <stdexcept>
#include <string>
#include <tuple>
#include <utility>
#include <vector>

#include "cmd.h"
#include "dns.h"

std::string unblock_ip(const std::string& ip) {
    return exec(get_route_cmd(ip));
}

std::vector<std::string> unblock_domain(const std::string& domain) {
    std::vector<std::string> result;
    for (auto& ip : get_ip(domain)) {
        result.push_back(unblock_ip(ip));
    }
    return result;
}
