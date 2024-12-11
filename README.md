# News-Inc

Thank you for taking the time to review this submission.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.2.

## Step to install and run

To install

```bash
npm i
```

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Running unit tests (jest)

To execute unit tests with the Jest test runner, use the following command:

```bash
npm run test
```

To view the test coverage run:

```bash
npm run test coverage
```

I chose Jest as this is the framework with I'm most familiar. Stories.component has less tests that I would like, but I sacrificed this to work on a clean UX.

## E2E tests

I assumed that the test coverage only applied to unit tests and for that reason I didn't invest any time in hooking up cypress or playwright for E2E tests

## Other conciderations

I took a responsive approach to the UI layout, so that cards take up more screen real estate when viewed on smaller viewports.

Potential improvements:

- Add more unit tests for the breakpoints.
- Adding animations & transitions when the layout changes to improve visual feedback during viewport resizing. Along with skeleton screens for loading.

I did consider an auto refresh of the cards, so that the latest stories would be automatically displayed on the screen. In the end I decided against this, as it could be jarring if the cards get reshuffled.

Potential improvements:

- Add an an icon/button so the user can manually refresh.
- "new stories available" indicator (e.g., a small badge) that prompts users to refresh if new content is available. This could bridge the gap between live updates and user control.

I stuck with the colors used in the hacker-news website in case they were associated with the brand.

Potential improvements:

- Subtle changes, like improving contrast or using slightly softer tones, as long as the colors remain recognizable.
- I did not check how to color scheme works for users with visual impairements, I think it should be ok, but that is something I would have liked to have tested.

## Screen shots

![Large Screen](../news-inc/large.png?raw=true)
![Medium Screen](../news-inc/medium.png?raw=true)
![Small Screen](../news-inc/small.png?raw=true)
