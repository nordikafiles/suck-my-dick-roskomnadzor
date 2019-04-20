#ifndef DNS_H
#define DNS_H

#include <string>
#include <vector>
#include "cmd.h"
#include "string_utils.h"

std::vector<std::string> get_ip(const std::string& domain) {
    std::vector<std::string> result;
    std::string dig_output = exec("dig +short " + domain);
    return split(dig_output);
}

std::string init_dns() {
    return exec(get_route_cmd("8.8.8.8"));
}

#endif
