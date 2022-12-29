# Repository Search

This is a small React app that allows you to search for repositories on GitHub and view their details.

## Prerequisites

Before you begin, make sure you have the following installed:

Node.js and npm (comes with Node.js)

Git

## Getting started

To get started with the app, follow these steps:

Clone the repository to your local machine:

```
git clone https://github.com/Nicolas-Menettrier/repository-search.git
```

Navigate to the project directory:

```
cd repository-search
```

Install the dependencies:

```
npm install
```

Run the development server:

```
npm start
```

The app will now be running at http://localhost:3000.

## Configuring the GitHub API access

To access the GitHub API, you will need to provide a personal access token in the REACT_APP_GITHUB_TOKEN environment variable. To obtain a personal access token, follow these steps:

- Go to https://github.com/settings/tokens?type=beta
- Click on "Generate new token"
- Give your token a name
- Click on "Generate token"

Copy the generated token and set it as the value of the REACT_APP_GITHUB_TOKEN environment variable. You can do this by creating a .env file in the root of the project and adding the following line:

```
REACT_APP_GITHUB_TOKEN=YOUR_TOKEN_HERE
```

Replace YOUR_TOKEN_HERE with your actual personal access token.

## Built with

[React](https://fr.reactjs.org/) - JavaScript library for building user interfaces

[GitHub API](https://docs.github.com/en/rest/search?apiVersion=2022-11-28#search-repositories) - RESTful API for interacting with GitHub
