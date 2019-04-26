#include <iostream>
#include <sstream>

#include "lib/cmd.h"
#include "lib/direct.h"
#include "lib/dns.h"
#include "lib/unblock.h"

int main(int argc, char* argv[]) {
    if (argc > 1 && std::string(argv[1]) == "unblock") {
        std::string interface = "utun1";
        if (argc > 2) interface = argv[2];
        std::string domain;
        while (std::cin >> domain) {
            std::cout << "Trying to unblock domain " << domain << "...\n";
            for (auto res : unblock_domain(domain, interface))
                std::cout << res;
        }
    } else if (argc > 1 && std::string(argv[1]) == "direct") {
        std::string interface = "en0";
        if (argc > 2) interface = argv[2];
        std::string domain;
        while (std::cin >> domain) {
            std::cout << "Adding direct route for domain " << domain << "...\n";
            for (auto res : direct(domain, interface))
                std::cout << res;
        }
    } else {
        std::cout << "Usage:\n"
            << "  smdr unblock [interface] -- unblock resource\n"
            << "  smdr direct [interface] -- add direct routes through specific interface\n";
    }
    return 0;
}
