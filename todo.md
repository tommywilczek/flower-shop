- Overall app
  - "todo list" style app, single page, able to click plus to add, and something else to edit

- flower-repository
  - !!! DID NOT TEST: gets all raw flowers, hung up on the Observables

- in create-flower.component 
    !!! DID NOT TEST: Can't figure out how to make sure text inputted gets to the ngModel ex)input in the name field should make that word the flower.name
    - make input fields stacked on top of each other
        - test drive the css
    - clear radio button on submit
    - show mat-snackbar when saved
    - inputs should be required (https://stackblitz.com/angular/xaaqjkmnmbqa) using the [hidden]
        - possibly <button type="submit" [disabled]="!form.valid">Save</button>

DONE: notes

Followed the guide in this [Medium article for TDD in Angular](https://medium.com/@johncol/test-driven-development-and-angular-9110d62ce7ec)

Follow my thought process below in excruciating detail:

- First, I need to show the list of all flowers
  - Generate component `show-flowers`
  - Create a service to fetch the flowers
    - Write a test in `show-flowers` calling this service that hasn't been created yet
    - Generated `FlowerService`
    - Write a test calling `FlowerService`'s `getAllFlowers` method that doesn't exist yet and expecting a `Flower` object that is an Observable (because it's being called asyncronously) that doesn't exist
    - Create a `Flower` model
    - Create `getAllFlowers` method in `FlowerService` that returns an empty array for now
    - Next, we know that the list of flowers will be fetched from an external source, a rest API, but as our application grows we don’t know if this will always be true, eventually we may need to get this list from the browser cache, IndexedDb, or again, an http resource. We don’t want to deal with these matters in the FlowersService, so we will delegate this responsibility to a `FlowerRepository`. It will know where to get the flowers from.
    - Create `FlowerRepository` to get the flowers from the database
    - Since the `FlowerService` now depends on `FlowerRepository`, we want to isolate the service, so we'll use a `Jasmine spy` that allows us to configure mock objects instead of the real ones from `FlowerRepository`
    - Next, let’s test that the service returns a list of flowers with a name to display, an number of petals, and scent. We'll do this by having our spy of `FlowerRepository`'s `getRawFlowers` function return the list we tell it to.
    - The final requirement for `flower-service` is that the list should only contain flowers that are in stock. Let's create a new attribute called `inStock` in the `RawFlower` model (test-driven, of course)
  - `show-flowers` should show a list of flowers
    - Have the component take objects from the `flower-service` and put them into the component's `flowers` array
    - The component should call it's `getFlowers()` method when it is created
    - Have Jasmine look at the component's html to see if the list of flowers can be seen
- Now it's time to let the user create flowers
  - I'll start by test-driving the UI to have input fields use Angular Material
  - Now time to connect the component to the service with `saveFlowers()` method