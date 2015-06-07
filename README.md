# Superpowers Documentation

This is the repository for [docs.sparklinlabs.com](http://docs.sparklinlabs.com)

## How to contribute

[Fork this repository](https://bitbucket.org/superpowers/docs.sparklinlabs.com/fork), commit your changes in a new branch and push them to your fork,  then send a pull request.

## How to run the website locally

Make sure you have [Node.js](https://nodejs.org) installed. Clone the repository, open it in a terminal and run:

    npm install
    cd src/
    tsc
    cd ..

Create a file named `config.json` at the root of the repository and put the following content in it:

    {
      "port": 9051
    }

You can use any value you want for the port. To start the server, run:

    node src/index.js

And go to http://localhost:9051
