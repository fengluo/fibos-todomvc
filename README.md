# FIBOS TodoMVC
Todo DApp for FIBOS blockchain by React and fibos.js

## Installation

You need install FIBOS first:

```
curl -s https://fibos.io/download/installer.sh | sh
```

Then check FIBOS version:

```
~$ which fibos
/usr/local/bin/fibos

~$ fibos --version
v0.27.0-dev
```

Install packages:

```
npm install
```

## Setup and run

Launch FIBOS local net:

```
npm run start:fibos
```

Deploy the contract to FIBOS local net:

```
npm run deploy:contract
```

Run Todo DApp:

```
npm run start:dapp
```