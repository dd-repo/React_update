# Blitz Monitoring - React+Redux

## Installation
1. Make sure you have NodeJS >= 6.0.0 installed on your machine.
2. Clone this repository to local directory - `git clone git@github.com:marca-development/blitz-monitoring-frontend.git`
3. Run `npm install` to install nescessary NPM dependecies

## Usage
* `npm start` - start development mode with Hot Reloading enabled
* `npm run deploy:prod` - compile source to the `dist` directory

### Non-modular SCSS
Attach SCSS files which shouldn't be modularized by Webpack (plugin style overrides for example) to `/styles/core.scss`.

## Used libraries
### General
* [React ^15.0.0](https://github.com/facebook/react) - Cornerstone rendering engine for the application
* [React Bootstrap ^0.30.7](https://github.com/react-bootstrap/react-bootstrap) - Port of Bootstrap 3 for React
* [Font Awesome ^4.6.3](https://github.com/FortAwesome/Font-Awesome) - Large set of various icons
* [React Router ^2.2.0](https://github.com/ReactTraining/react-router) - Provides routing within the application
* [Redux ^3.0.0](https://github.com/reactjs/redux) - Used for application state management
* [Velocity Animate ^1.2.3](https://github.com/julianshapiro/velocity) - Provides a solid animation system for some components
* [React Image Holder ^2.0.1](https://github.com/hiddentao/react-image-holder) - Adds placeholder support for the Image component
* [IsMobile ^0.4.0](https://github.com/kaimallea/isMobile) - Detects the device on which the application is running, so some components can adjust to the environment
* [Moment ^2.13.0](http://momentjs.com/) - Used for time modification and parsing
* [Numeral ^1.5.3](http://numeraljs.com/) - Provides formatting for number types
* [PerfectScrollbar ^0.6.13](https://github.com/noraesae/perfect-scrollbar) - Wrapped in a component, which adds styled scrollbars when nescessary
* [Pace 1.0.2](http://github.hubspot.com/pace/docs/welcome/) - Page loading indicator used mainly when a Webpack Code Split needs to be loaded 
* [TinyColor ^1.4.1](https://github.com/bgrins/TinyColor) - Fast color mixing library used in some components
* [Underscore ^1.8.3](http://underscorejs.org/) - Flexible functional data manegement library

### Build
* [Koa ^2.0.0-alpha.3](http://koajs.com/) - Web Server used for serving the application.
* [Webpack ^1.12.14](https://webpack.github.io/) - Advanced system used for modules management. It is backed by a multitude of smaller loaders which add nescessary functionalities.
* [Sass Loader ^3.0.0](https://github.com/jtangelder/sass-loader) - Webpack loader which allows the usage of SCSS modules.
* [Babel ^6.3.19](https://babeljs.io/) - Provides support for ES2015+ and JSX

### Demo
* [Blitz-monitoring](https://blitz-monitoring.herokuapp.com)
