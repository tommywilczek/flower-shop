# FlowerShop

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Best Practices

This project uses the following practices:

- Test and Behavior Driven Development
  - Using Karma and Jasmine for Angular front-end
  <!-- - Using Mocha (JavaScript testing framework) and Chai (assertion library) for isolated MongoDB tests -->
  - Test suite listens to changes in files and runs each time a file is saved
- Version control *committing early and often!*
- Continuous integration
  - Whenever code is pushed to github, TravisCI is configured to run an automated build, lint, and test
- Code Coverage
  - Run `ng test --code-coverage` for the coverage summary 
- Cross-browser testing
  - All tests were run in Chrome, Safari, and Firefox

## Testing

To run the unit tests, use `ng test`. This will run the test suite in Chrome.

For cross-browser testing, navigate to `http://localhost:9876` in Safari and Firefox.
