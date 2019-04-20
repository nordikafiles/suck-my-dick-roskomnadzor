#ifndef STRING_UTILS_H
#define STRING_UTILS_H

#include <sstream>
#include <string>
#include <vector>


std::vector<std::string> split(const std::string& s) {
    std::vector<std::string> result;
    std::stringstream ss(s);
    std::string line;
    while (std::getline(ss, line))
        result.push_back(line);
    return result;
}

#endif
