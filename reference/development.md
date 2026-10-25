# General development guidelines

- Use pnpm
- Break up your code into small components
- Use React components only when interactivity is required, otherwise use Astro components
- Make use of Astro's islands architecture where appropriate
- Install libraries wherever needed to solve UI problems. Avoid writing complicated code from scratch. For example, use a library for a date picker or drag and drop functionality instead of implementing it yourself.

# Project-specific guidelines

- The interactive blocks inside articles don't need to be reusable. Each block can be a separate component.
