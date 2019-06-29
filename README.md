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
- Continuous integration and Continuous Delivery pipeline
  - Whenever code is pushed to GitHub, TravisCI is configured to run an automated build, lint, and run all tests
  - If the build passes, it is deployed to GitHub Pages
- Version control *committing early and often!*
- Code Coverage
  - Run `ng test --code-coverage` for the coverage summary 

## Up and Running

In a new terminal, run `ng serve --open` for a dev server that opens a new browser to `http://localhost:4200/`.

## Testing

To run the unit tests, use `npm test`. This will run the test suite in Chrome and include a code coverage report.

For cross-browser testing, navigate to `http://localhost:9876` in Safari and Firefox.

## Approach

Followed the guide in this [Medium article for TDD in Angular](https://medium.com/@johncol/test-driven-development-and-angular-9110d62ce7ec)

- First, I need to show the list of all flowers
  - Generate component show-flowers
  - Create a service to fetch the flowers
    - Write a test in show-flowers calling this service that hasn't been created yet
    - Generated FlowerService
    - Write a test calling FlowerService's getAllFlowers method that doesn't exist yet and expecting a Flower object that is an Observable (because it's being called asyncronously) that doesn't exist
    - Create a Flower model
    - Create getAllFlowers method in FlowerService that returns an empty array for now
    - Next, we know that the list of flowers will be fetched from an external source, a rest API, but as our application grows we don’t know if this will always be true, eventually we may need to get this list from the browser cache, IndexedDb, or again, an http resource. We don’t want to deal with these matters in the FlowersService, so we will delegate this responsibility to a FlowersRepository. It will know where to get the flowers from.
    - Create FlowersRepository to get the flowers from the database
    - Since the FlowerService now depends on FlowersRepository, we want to isolate the service, so we'll use a `Jasmine spy` that allows us to configure mock objects instead of the real ones from FlowerRepository