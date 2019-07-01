# FlowerShop

The Flower Shop is a simple Angular web app to practice Test-Driven Development and other best practices used in modern, professional development teams.

## Best Practices

This project uses the following practices:

- Test and Behavior Driven Development
  - Using Karma and Jasmine for Angular front-end
  <!-- - Using Mocha (JavaScript testing framework) and Chai (assertion library) for isolated MongoDB tests -->
  - Test suite listens to changes in files and runs each time a file is saved
  - Cross-browser testing
    - All tests were run in Chrome, Safari, and Firefox to ensure cross-browser compatibility
  - Test-driving Styles
    - I also experimented with TDD and CSS, to emulate codifying business requrements into tests. This allowed me to implement the usage of [Angular Material](https://material.angular.io/)
- Continuous integration and Continuous Delivery pipeline
  - Whenever code is pushed to GitHub, TravisCI is configured to run an automated build, lint, and run all tests
  - If the build passes, it is deployed to GitHub Pages
- Version control *committing early and often!*
- Code Coverage
  - Run `ng test --code-coverage` for the coverage summary 
- Code Quality
  - Created a bash script, `auto-lint.sh` that runs lint automatically. If linting fails, it plays an annoying sound to notify you

## Accessibility

Accessibility tests such as those that test `aria-label` were used in UI components.

Additionally, manual testing with a screen reader was used.

## Up and Running

In a new terminal, run `ng serve --open` for a dev server that opens a new browser to `http://localhost:4200/`.

## Testing

To run the unit tests, use `npm test`. This will run the test suite in Chrome and include a code coverage report.

For cross-browser testing, navigate to `http://localhost:9876` in Safari and Firefox.
