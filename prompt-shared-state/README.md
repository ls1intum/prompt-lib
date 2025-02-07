# prompt-shared-state 
A shared library for the **AET Prompt2** system that provides common interfaces and state management (via [Zustand](https://github.com/pmndrs/zustand)) across multiple microfrontends. 

## Overview 
The **prompt-shared-state** package is designed to help multiple microfrontends share:
- **Data** and **state** through a global [Zustand](https://github.com/pmndrs/zustand) store. 
- **Common TypeScript interfaces** for consistent data modeling 

By using this library, you ensure that all microfrontends reference the same store instance and interfaces, avoiding inconsistencies and duplication. 

## Features 
- **Shared Interfaces**: Commonly used interfaces that can be referenced by any microfrontend, ensuring a single source of truth for data structures. These shall also reflect the data structures used by the core API.
- **Global State Management**: A single Zustand store instance shared across microfrontends. 
- **Easy Integration**: Works seamlessly with Module Federation (Webpack 5), Yarn, and npm. 

## Installation 
Install the package with your preferred package manager: 

```bash 
# Using Yarn 
yarn add @tumaet/prompt-shared-state 

# Or using npm 
npm install @tumaet/prompt-shared-state 
```

## Usage 
### Shared Interfaces 
All TypeScript interfaces needed by multiple microfrontends reside here. For example: 

```ts 
import { SomeSharedInterface } from '@tumaet/prompt-shared-state'; 

// Use this interface in your code const data: SomeSharedInterface = { // ... }; 
``` 
**Note**: If an interface is only relevant to one microfrontend, keep it local to that microfrontend rather than placing it here. 

### Global Zustand Store 
The package provides a shared Zustand store that can be imported and used by any microfrontend. For example: 

```ts 
import { useSharedStore } from '@tumaet/prompt-shared-state'; 

function MyComponent() { 
    const [sharedValue, setSharedValue] = useSharedStore((state) => [ 
        state.sharedValue, state.setSharedValue, 
    ]); 
    
    return ( 
        <div> 
            <p>Shared Value: {sharedValue}</p> 
            <button onClick={() => setSharedValue('New Value')}> 
                Update Shared Value 
            </button> 
        </div> 
    ); 
} 
``` 
Any changes to the store will be reflected across all microfrontends using this library. 

### Module Federation Configuration 
For the state to be truly _shared_ among all microfrontends, configure **Module Federation** to treat `@tumaet/prompt-shared-state` as a singleton: 

```js 
new ModuleFederationPlugin({ 
    name: 'your-module', 
    shared: { 
        '@tumaet/prompt-shared-state': { 
            singleton: true, 
            requiredVersion: deps['@tumaet/prompt-shared-state'], 
        }, 
    // ...other shared dependencies 
    }, 
}); 
``` 
This ensures there is only **one** instance of the shared state library at runtime.

## Best Practices 
1. **Store Only Truly Shared Data** Keep only data in the global Zustand store that needs to be accessed by multiple microfrontends. 
2. **Keep Interfaces Organized** Place only _truly global_ interfaces in this package. Any interface specific to a single module should remain in that module. 
3. **Version Synchronization** Make sure all microfrontends use the same version of the shared package to avoid any incompatibilities.
4. **Avoid Overexposing State** If you have sensitive or security-related information, think carefully about whether it needs to be available globally. --- 

## Publishing Process

As a member of the AET team, please contribute your changes by creating a pull request.
Once your changes are reviewed and merged into the `main` branch, a GitHub workflow will automatically:

1. Bump the package version (according to the keyword in your commit message).
2. Publish the updated package to the npm registry.

### Commit Message Keywords
Include **one** of the following keywords in your commit message to indicate how the version should be bumped:

- **major**  
  - Increments the major version (e.g. `1.2.3` → `2.0.0`).
- **minor**  
  - Increments the minor version (e.g. `1.2.3` → `1.3.0`).
- **(no keyword) or "patch"**  
  - Increments the patch version by default (e.g. `1.2.3` → `1.2.4`).

If you do not include `major` or `minor` in your commit message, the workflow will assume a **patch** update.

When the publishing worked, then a PR with a new version number has been opened. This shall be merged immediately. 
