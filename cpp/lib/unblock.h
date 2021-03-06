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

std::string unblock_ip(const std::string& ip, const std::string& interface = "utun1") {
    return exec(get_route_cmd(ip, interface));
}

std::vector<std::string> unblock_domain(const std::string& domain,
    const std::string& interface = "utun1") {
    std::vector<std::string> result;
    for (auto& ip : get_ip(domain)) {
        result.push_back(unblock_ip(ip, interface));
    }
    return result;
}
