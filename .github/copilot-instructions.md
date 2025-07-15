# Instructions for GitHub Copilot

This repository contains code for a mobile application (Jetpack Compose in `mobile/`) and a web application (Angular in `web/`).

**For code in `web/` (Angular):**

- Generate modern and clean Angular v20+ code using signals and standalone components.
- Use `input()` and `output()` functions instead of decorators.
- Implement `ChangeDetectionStrategy.OnPush` for optimal performance.
- Use native control flow (`@if`, `@for`, `@switch`) instead of structural directives.
- Prefer `class` and `style` bindings over `ngClass` and `ngStyle`.
- Use `inject()` function instead of constructor injection in services.
- Use TypeScript with strict typing and avoid `any` type.
- Include unit tests with Jasmine and Karma when requested.
- Follow Angular style guide and use `computed()` for derived state.
- Use `effect()` for side effects and reactive programming.
- Implement lazy loading with `loadChildren` and dynamic imports.
- Use Angular Material 3 components when building UI.
- Follow reactive forms pattern with `FormBuilder` and validators.
- Implement proper error handling with `catchError` and `retry` operators.
- Use `AsyncPipe` for observable data in templates.
- Follow component composition over inheritance patterns.
- Use `trackBy` functions in `@for` loops for performance.
- Implement proper accessibility (a11y) attributes and ARIA labels.
- Use environment-specific configurations and feature flags.
- Follow security best practices: sanitize inputs, use HTTPS, CSP headers.

**For code in `mobile/` (Jetpack Compose):**

- Generate idiomatic and declarative Jetpack Compose code.
- Prioritize the use of reusable composables and Compose state pattern.
- Use Kotlin for the code.
- Include composable previews (`@Preview`) when possible.

**General rules:**

- Be concise in explanations.
- Always use double quotes for strings.
- Always try to offer usage or implementation examples.
- When I ask you to choose between multiple options, give me numbered options.
- Do not include comments in the generated code.
