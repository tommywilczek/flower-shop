# FlowerShop

The Flower Shop is a simple Angular web app to practice Test-Driven Development and other best practices used in modern, professional development teams.

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

## Up and Running

In a new terminal, run `ng serve --open` for a dev server that opens a new browser to `http://localhost:4200/`.

## Testing

To run the unit tests, use `npm test`. This will run the test suite in Chrome and include a code coverage report.

For cross-browser testing, navigate to `http://localhost:9876` in Safari and Firefox.

## Approach

- First, I need to show the list of all flowers
  - Generate component show-flowers
  - Create a service to fetch the flowers
    - Write a test in show-flowers calling this service that hasn't been created yet