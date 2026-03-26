# prompt-lib

Shared libraries for the **AET Prompt** system — an educational platform for managing courses, assessments, and student participation.

This repository contains two npm packages:

| Package | Description |
|---|---|
| [`@tumaet/prompt-shared-state`](./prompt-shared-state) | Shared state management (Zustand) and TypeScript interfaces |
| [`@tumaet/prompt-ui-components`](./prompt-ui-components) | Reusable React UI components built on shadcn/ui |

Both packages are designed for use in **Module Federation** microfrontend architectures, where they must be loaded as singletons to ensure consistent state and UI across independently deployed apps.

---

## Packages

### @tumaet/prompt-shared-state

Provides:
- **Zustand stores** for authentication (`useAuthStore`), course management (`useCourseStore`), and demo use (`useDemoStore`)
- **TypeScript interfaces** covering courses, students, assessments, course phases, roles, mailing, and more

See the [prompt-shared-state README](./prompt-shared-state/README.md) for full documentation.

### @tumaet/prompt-ui-components

Provides:
- **36+ shadcn/ui base components** (buttons, dialogs, forms, tables, etc.)
- **PromptTable** — advanced data table with sorting, filtering, pagination, row selection, and URL-synced state
- **MinimalTiptapEditor** — rich text editor with toolbar, code highlighting, image support, and link management
- **Custom components** — date pickers, multi-select, management page headers, score level selectors, and more

See the [prompt-ui-components README](./prompt-ui-components/readme.md) for full documentation.

---

## Prerequisites

This project uses **Yarn 4** as specified in the `packageManager` field of each package.json. To work with this repository, enable Corepack, which will automatically use the correct Yarn version.

```bash
corepack enable
```

Corepack is included by default with Node.js 16.9+ and 14.19+. If you see an error like:

```text
error This project's package.json defines "packageManager": "yarn@4.1.0". However the current global version of Yarn is 1.22.22.
```

Run `corepack enable` to fix it.

---

## Development

### Building Locally

```bash
# Build prompt-shared-state
cd prompt-shared-state
yarn install
yarn build

# Build prompt-ui-components
cd prompt-ui-components
yarn install
yarn build
```

### Linting

```bash
# From within each package directory
yarn lint
```

### Testing Before Release

```bash
cd prompt-shared-state && yarn build && cd ../prompt-ui-components && yarn build
```

---

## Publishing Packages

Both packages are automatically published to npm when you create a GitHub release.

### 1. Update Package Versions

Ensure both `package.json` files have the same version number matching your intended release tag.

```bash
cd prompt-shared-state
yarn version patch   # 1.2.3 -> 1.2.4
# or: yarn version minor  (1.2.3 -> 1.3.0)
# or: yarn version major  (1.2.3 -> 2.0.0)

cd ../prompt-ui-components
yarn version patch   # Use the same increment type
```

Or edit the `package.json` files manually — both must have the exact same version.

### 2. Create a GitHub Release

1. Go to the [Releases page](../../releases)
2. Click **"Create a new release"**
3. Create a new tag with the format `v{version}` (e.g., `v1.2.3`)
4. Set the release title and add release notes
5. Click **"Publish release"**

### 3. Automated Publishing

Once you publish the release, the GitHub Actions workflow:

1. **Validates** that each `package.json` version matches the release tag (in parallel)
2. **Builds** both packages
3. **Publishes** both packages to npm simultaneously

If there's a version mismatch, the workflow fails with a clear error:

```text
❌ ERROR: Version mismatch in prompt-shared-state!
   Release tag version: 1.2.3
   Package.json version: 1.2.2

Please update the version in prompt-shared-state/package.json to match the release tag.
```

> **Important**: The workflow fails if the release tag version doesn't match either `package.json` version.

---

## CI/CD Workflows

### Build Workflow (`build-packages.yml`)

- **Trigger**: Pull requests to `main`
- **Purpose**: Validates that both packages build successfully

### Publish Workflow (`publish-packages.yml`)

- **Trigger**: GitHub releases
- **Purpose**: Validates versions and publishes both packages to npm
- **Strategy**: Two-stage process — validate in parallel, then build and publish in parallel

---

## Package Information

| Package | Latest Version | Description |
|---|---|---|
| [@tumaet/prompt-shared-state](https://www.npmjs.com/package/@tumaet/prompt-shared-state) | ![npm](https://img.shields.io/npm/v/@tumaet/prompt-shared-state) | Shared state management and TypeScript interfaces |
| [@tumaet/prompt-ui-components](https://www.npmjs.com/package/@tumaet/prompt-ui-components) | ![npm](https://img.shields.io/npm/v/@tumaet/prompt-ui-components) | Reusable React UI components |
