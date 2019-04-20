#include <iostream>
#include <string>

#include "lib/cmd.h"
#include "lib/dns.h"
#include "lib/unblock.h"

int main() {
    std::string domain;
    while (std::cin >> domain) {
        std::cout << "Trying to unblock domain " << domain << "...\n";
        for (auto res : unblock_domain(domain))
            std::cout << res;
    }
    return 0;
}
