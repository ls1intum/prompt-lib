# prompt-lib

Shared libraries for the PROMPT project

This repository contains two npm packages:

- `@tumaet/prompt-shared-state` - Shared state management and interfaces
- `@tumaet/prompt-ui-components` - Reusable UI components

## 📦 Publishing Packages

Both packages are automatically published to npm when you create a GitHub release. Follow these steps:

### 1. Update Package Versions

Before creating a release, ensure both `package.json` files have the same version number that matches your intended release tag:

```bash
# Update prompt-shared-state/package.json
{
  "name": "@tumaet/prompt-shared-state",
  "version": "1.2.3",  // ← This version
  ...
}

# Update prompt-ui-components/package.json  
{
  "name": "@tumaet/prompt-ui-components", 
  "version": "1.2.3",  // ← Must match exactly
  ...
}
```

### 2. Create a GitHub Release

1. Go to the [Releases page](../../releases)
2. Click "Create a new release"
3. Create a new tag with the format `v{version}` (e.g., `v1.2.3`)
4. Set the release title (e.g., "Release v1.2.3")
5. Add release notes describing the changes
6. Click "Publish release"

### 3. Automated Publishing

Once you publish the release:

- The GitHub Action workflow will automatically trigger
- It validates that each package.json version matches the release tag (in parallel)
- Both packages are built and published to npm simultaneously in parallel
- If there's a version mismatch, the workflow will fail with a clear error message for the specific package

### 4. Version Requirements

⚠️ **Important**: The workflow will fail if:

- The release tag version doesn't match `prompt-shared-state/package.json` version
- The release tag version doesn't match `prompt-ui-components/package.json` version
- Either package fails to build

### Example Error Message

If versions don't match, you'll see:

```text
❌ ERROR: Version mismatch in prompt-shared-state!
   Release tag version: 1.2.3
   Package.json version: 1.2.2

Please update the version in prompt-shared-state/package.json to match the release tag.
Expected: "version": "1.2.3"
```

## 🚀 CI/CD Workflows

This repository uses GitHub Actions for automated building and publishing:

### Build Workflow (`build-packages.yml`)

- **Trigger**: On pull requests to main branch
- **Purpose**: Validates that both packages build successfully

### Publish Workflow (`publish-packages.yml`)

- **Trigger**: On GitHub releases
- **Purpose**: Validates versions and publishes both packages to npm
- **Strategy**: Two-stage process with matrix builds
  1. **Validate stage**: Checks version consistency in parallel
  2. **Publish stage**: Builds and publishes both packages in parallel

## 🛠 Development

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

### Testing Before Release

Before creating a release, always test that both packages build successfully:

```bash
# Test both packages
cd prompt-shared-state && yarn build && cd ../prompt-ui-components && yarn build
```

## 📋 Package Information

| Package | Latest Version | Description |
|---------|---------------|-------------|
| [@tumaet/prompt-shared-state](https://www.npmjs.com/package/@tumaet/prompt-shared-state) | ![npm](https://img.shields.io/npm/v/@tumaet/prompt-shared-state) | Shared state management and TypeScript interfaces |
| [@tumaet/prompt-ui-components](https://www.npmjs.com/package/@tumaet/prompt-ui-components) | ![npm](https://img.shields.io/npm/v/@tumaet/prompt-ui-components) | Reusable React UI components |
