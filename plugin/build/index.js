{
    "name": "helmhub-plugin",
    "version": "0.0.1",
    "description": "The plugin for helmhub",
    "main": "index.js",
    "repository": "https://helmhub.com",
    "author": "Alex Gilleran",
    "license": "Apache 2.0",
    "private": false,
    "dependencies": {
        "commander": "^2.17.1",
        "firebase": "^5.4.1",
        "firebase-admin": "^6.0.0",
        "inquirer": "^6.2.0"
    },
    "devDependencies": {
        "@types/commander": "^2.12.2",
        "@types/inquirer": "^0.0.43",
        "@types/node": "^10.9.1",
        "ts-node": "^7.0.1",
        "typescript": "^3.0.1"
    },
    "scripts": {
        "dev": "ts-node src/index.ts"
    }
}