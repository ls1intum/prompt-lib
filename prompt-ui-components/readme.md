# prompt-ui-components

A shared library for the **AET Prompt2** system that provides common UI components.

These components are built using [shadcn/ui](https://ui.shadcn.dev/) and are maintained centrally to enable loading via **Module Federation** as a **singleton**.  
This ensures:
- A **consistent UI experience** across microfrontends
- **Reduced bundle size** by avoiding duplicate component loading
- **Unified UI state management** (e.g., for global toast notifications)

## Overview

The **prompt-ui-components-lib** package is designed to allow multiple microfrontends to share:
- **Common, reusable UI components** with a unified look and feel
- **Shared UI state**, such as toasts and modals, across independently deployed apps

By using this library, all microfrontends rely on the same component instances and styling, preventing UI inconsistencies and improving maintainability.

## Features

- **Reusable UI Components**: Built on shadcn/ui, styled and configured for the Prompt2 system
- **Shared UI State**: Centralized management for features like toast notifications
- **Module Federation Ready**: Components are loaded as a singleton, preventing duplication
- **Consistent Design System**: Ensures the same visual language across all microfrontends

## Installation

Install the package with your preferred package manager:

```bash
# Using Yarn
yarn add @tumaet/prompt-ui-components-lib

# Or using npm
npm install @tumaet/prompt-ui-components-lib
```
