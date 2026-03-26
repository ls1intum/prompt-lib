# prompt-shared-state

A shared library for the **AET Prompt** system that provides common TypeScript interfaces and state management (via [Zustand](https://github.com/pmndrs/zustand)) across multiple microfrontends.

## Overview

The **prompt-shared-state** package ensures that all microfrontends share:

- **Global state** through Zustand stores for authentication, course management, and more
- **Common TypeScript interfaces** for consistent data modeling that mirrors the core API

By using this library, all microfrontends reference the same store instances and type definitions, eliminating state inconsistencies and data model duplication.

## Installation

```bash
# Using Yarn
yarn add @tumaet/prompt-shared-state

# Using npm
npm install @tumaet/prompt-shared-state
```

---

## Zustand Stores

### useAuthStore

Manages authentication state and user permissions.

```tsx
import { useAuthStore } from '@tumaet/prompt-shared-state'

function MyComponent() {
  const { user, permissions, setUser, logout } = useAuthStore()

  return (
    <div>
      <p>Logged in as: {user?.firstName} {user?.lastName}</p>
      <button onClick={() => logout()}>Log out</button>
    </div>
  )
}
```

**State & Actions:**

| Name | Type | Description |
|---|---|---|
| `user` | `User \| undefined` | The currently authenticated user |
| `permissions` | `string[]` | List of permission strings for the current user |
| `setUser(user)` | `(user: User) => void` | Set the authenticated user |
| `clearUser()` | `() => void` | Clear the current user |
| `setPermissions(permissions)` | `(permissions: string[]) => void` | Set user permissions |
| `clearPermissions()` | `() => void` | Clear all permissions |
| `logout(redirectUri?)` | `(redirectUri?: string) => void` | Log out and optionally redirect |
| `setLogoutFunction(fn)` | `(logoutFunction: (redirectUri?: string) => void) => void` | Register the logout handler |

---

### useCourseStore

Manages course data and the currently selected course. Course selection is persisted to localStorage.

```tsx
import { useCourseStore } from '@tumaet/prompt-shared-state'

function CourseSelector() {
  const { courses, getSelectedCourseID, setSelectedCourseID } = useCourseStore()

  return (
    <select
      value={getSelectedCourseID() ?? ''}
      onChange={(e) => setSelectedCourseID(e.target.value)}
    >
      {courses.map((course) => (
        <option key={course.id} value={course.id}>
          {course.name}
        </option>
      ))}
    </select>
  )
}
```

**State & Actions:**

| Name | Type | Description |
|---|---|---|
| `courses` | `Course[]` | All available courses |
| `ownCourseIDs` | `string[]` | IDs of courses the user is enrolled in |
| `setCourses(courses)` | `(courses: Course[]) => void` | Set the full course list |
| `setOwnCourseIDs(ids)` | `(ids: string[]) => void` | Set IDs of the user's own courses |
| `getSelectedCourseID()` | `() => string \| null` | Get the currently selected course ID |
| `setSelectedCourseID(id)` | `(id: string) => void` | Select a course (persisted to localStorage) |
| `removeSelectedCourseID()` | `() => void` | Clear the selected course |
| `isStudentOfCourse(id)` | `(id: string) => boolean` | Check if the user is a student in a course |
| `updateCourse(id, patch)` | `(id: string, patch: Partial<Course>) => void` | Partially update a course |

---

## TypeScript Interfaces

All interfaces are exported from the package root and organized into categories:

```ts
import {
  Course,
  Student,
  User,
  CoursePhaseWithMetaData,
  PassStatus,
  Role,
  ScoreLevel,
} from '@tumaet/prompt-shared-state'
```

### Available Interfaces

| Category | Key Exports | Description |
|---|---|---|
| **Course** | `Course`, `UpdateCourse`, `CourseType` | Course data and operations |
| **Course Phase** | `CoursePhaseWithMetaData`, `CoursePhaseWithType`, `CreateCoursePhase`, `UpdateCoursePhase` | Course phase data and operations |
| **Course Phase Type** | `CoursePhaseType`, `CoursePhaseTypeMetaDataItem` | Phase type metadata |
| **Course Phase Participation** | `CoursePhaseParticipationWithStudent`, `CoursePhaseParticipationsWithResolution`, `UpdateCoursePhaseParticipation`, `UpdateCoursePhaseParticipationStatus` | Student participation in phases |
| **Student** | `Student`, `Gender`, `StudyDegree` | Student profile data |
| **User** | `User` | Authenticated user data |
| **Person** | `Person` | Base person interface |
| **Roles** | `Role`, `getPermissionString` | Role enum and permission utilities |
| **Assessment** | `ScoreLevel`, `mapScoreLevelToNumber`, `mapNumberToScoreLevel` | Assessment score levels and mapping |
| **Mailing** | `CourseMailingSettings`, `CoursePhaseMailingConfigData`, `MailingReport`, `SendStatusMail` | Email configuration and reporting |
| **Application** | `ExportedApplicationAnswer` | Application submission data |
| **Team** | `Team` | Team definitions |

### Score Levels

```ts
import { ScoreLevel, mapScoreLevelToNumber, mapNumberToScoreLevel } from '@tumaet/prompt-shared-state'

// Enum values: VeryGood, Good, Ok, Bad, VeryBad
const level = ScoreLevel.Good
const numeric = mapScoreLevelToNumber(ScoreLevel.Good)   // → number
const back = mapNumberToScoreLevel(numeric)               // → ScoreLevel
```

### Roles

```ts
import { Role } from '@tumaet/prompt-shared-state'

// Enum members: PROMPT_ADMIN, PROMPT_LECTURER, COURSE_LECTURER, COURSE_EDITOR, COURSE_STUDENT
if (user.role === Role.PROMPT_ADMIN) {
  // show admin UI
}
```

---

## Module Federation Configuration

For the state to be truly shared across all microfrontends, configure **Module Federation** to treat `@tumaet/prompt-shared-state` as a singleton:

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
})
```

This ensures there is only **one** instance of the shared state library at runtime. Without this, each microfrontend would have its own store and state changes would not propagate across apps.

---

## Best Practices

1. **Store only truly shared data** — Only add state to Zustand stores that needs to be accessed by multiple microfrontends. Keep module-local state in the microfrontend itself.
2. **Keep interfaces organized** — Only place interfaces in this package if they are used across multiple microfrontends. Module-specific interfaces should stay in that module.
3. **Synchronize versions** — All microfrontends should use the same version of this package to avoid type and runtime incompatibilities.
4. **Avoid overexposing sensitive state** — Think carefully before storing security-sensitive data in a globally shared store.

---

## Contributing

As a member of the AET team, contribute changes by opening a pull request. Once merged, follow the release process described in the [repository root README](../README.md) to publish a new version.

### Versioning & Publishing

Publishing is triggered by creating a **GitHub Release**. The steps are:

1. Update the version in both `prompt-shared-state/package.json` and `prompt-ui-components/package.json` to the same value (or run `bump-version` via the manual GitHub Actions workflow).
2. Create a GitHub Release with the tag `v{version}` (e.g., `v1.2.3`).
3. The publish workflow automatically validates the version and publishes both packages to npm.

See the [root README](../README.md) for full details.
