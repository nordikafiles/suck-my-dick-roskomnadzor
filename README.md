# SMDR
It's a tool that helps to smartly avoid blocks of ips/domains from internet provider. **Currently works only with Tunnelblick on macOs.**
# Installation
Clone this repo. Then install the deps:
```bash
git clone https://github.com/nordikafiles/suck-my-dick-roskomnadzor
cd suck-my-dick-roskomnadzor
npm install
# or with yarn
yarn install

```
# Usage
To start the service run the following commmand as root:
```bash
sudo node index.js

# or with pm2
sudo pm2 start index.js --name smdr
```
Now app is listening on **\*:3434** by default.
You can open **http://localhost:3434** in your browser and add hosts that are needed to unblock.