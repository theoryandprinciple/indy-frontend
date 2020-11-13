# Indy Renter Help

This is the front end for [Indy Renter Help](https://indyrenterhelp.org/) which is a web app that will help struggling renters obatin protection they are entitled to under the current CDC Federal Eviction Moratorium.

## Geting started

```bash
$ git clone --depth=1 --origin=indy-original git@github.com:theoryandprinciple/indy-frontend.git my-project
$ cd my-project
$ git checkout --orphan master # New branch without history
$ npm install
$ echo REACT_APP_API_HOST=https://your-url-here.org/ > .env
$ npm start
```

## In order to run as a plugin under the API server
```bash
$ npm link
$ npm run build
```
This will build a static version of the site that can be served by the API.

## More Info
This boilerplate is built using [create-react-app](https://github.com/facebook/create-react-app) so you will want to read the User Guide for more goodies.
