import { defineConfig } from 'cypress';

import { seed } from './prisma/seed-test';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // setupNodeEvents() -> It is the method offers by cypress to register the events that has to be handled if they are not run in the browser.
      // here 'seedDatabase' is the name given to the task.
      on('task', {
        async seedDatabase() {
          await seed();
          return null;
        }
      })
    },
  },
});
