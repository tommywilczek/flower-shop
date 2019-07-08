# FlowerShop

The Flower Shop is a simple Angular web app grown using Test-Driven Development and other best practices used in modern, professional development teams.

## Best Practices

This project uses the following practices:

- Test and Behavior Driven Development
  - Using Karma and Jasmine for Angular tests
  - Cross-browser testing
    - All tests were run in Chrome, Safari, and Firefox to ensure cross-browser compatibility
  - I test-drove everything. Including CSS
    - Yes, you read that correctly. Is it the right thing to do? I'm not sure. But I wanted to experiment with taking TDD to the extreme.
    - This allowed me to implement the usage of [Angular Material](https://material.angular.io/)
- Continuous integration and Continuous Delivery pipeline
  - Whenever code is pushed to GitHub, TravisCI is configured to run an automated build, lint, and run all tests
  - If the build passes, it is deployed to GitHub Pages
- Version control *committing early and often!*
- Code Coverage
  - Run `ng test --code-coverage` for the coverage summary 
- Code Quality
  - Created a bash script, `auto-lint.sh` that runs lint automatically. If linting fails, it plays an annoying sound to notify you

## Accessibility

Accessibility tests such as those that test `aria` attributes were used in UI components.

Ran [Axe](https://www.deque.com/axe/) tests to automate the testing of most accessibility features

Additionally, manual testing with a screen reader was used.

## Up and Running

In a new terminal, run `ng serve --open` for a dev server that opens a new browser to `http://localhost:4200/`.

## Testing

To run the unit tests, use `npm test`. This will run the test suite in Chrome and include a code coverage report.

For cross-browser testing, navigate to `http://localhost:9876` in Safari and Firefox.
