# prompt-ui-components

A shared UI component library for the **AET Prompt** system, built on [shadcn/ui](https://ui.shadcn.dev/).

Components are loaded as **Module Federation singletons**, which ensures:
- A **consistent UI experience** across all microfrontends
- **Reduced bundle size** by avoiding duplicate component loading
- **Unified UI state** (e.g., global toast notifications shared across apps)

## Installation

```bash
# Using Yarn
yarn add @tumaet/prompt-ui-components

# Using npm
npm install @tumaet/prompt-ui-components
```

### Import CSS

Import the stylesheet in your app's entry point to include component styles:

```ts
import '@tumaet/prompt-ui-components/index.css'

// If using the rich text editor, also import its styles:
import '@tumaet/prompt-ui-components/minimal-tiptap/index.css'
```

---

## Components

### shadcn/ui Base Components

All standard shadcn/ui components are re-exported from this package:

```ts
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  // ...and many more
} from '@tumaet/prompt-ui-components'
```

Available components include: Accordion, Alert, Alert Dialog, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Checkbox, Collapsible, Command, Dialog, Dropdown Menu, Form, Input, Label, Popover, Progress, Radio Group, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton, Switch, Table, Tabs, Textarea, Toast/Toaster, Toggle, Toggle Group, and Tooltip.

---

### PromptTable

An advanced data table built on [TanStack Table](https://tanstack.com/table), with sorting, filtering, pagination, row selection, and bulk actions.

```tsx
import { PromptTable } from '@tumaet/prompt-ui-components'

<PromptTable
  data={students}
  columns={studentColumns}
  filters={[
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
  ]}
  actions={[
    {
      label: 'Delete',
      icon: <TrashIcon />,
      onAction: (selectedRows) => deleteStudents(selectedRows),
      confirm: {
        title: 'Delete students?',
        description: 'This action cannot be undone.',
      },
    },
  ]}
  onRowClick={(row) => navigate(`/students/${row.id}`)}
  pageSize={20}
/>
```

**Props:**

| Prop | Type | Description |
|---|---|---|
| `data` | `T[]` | Array of row data objects (must have an `id` field) |
| `columns` | `ColumnDef<T>[]` | TanStack column definitions (auto-generated if omitted) |
| `filters` | `TableFilter[]` | Filter configurations (select or numeric range) |
| `actions` | `RowAction<T>[]` | Bulk row action buttons |
| `onRowClick` | `(row: T) => void` | Callback when a row is clicked |
| `pageSize` | `number` | Rows per page (default: `20`) |
| `initialState` | `InitialTableState` | Initial sorting/filter state |
| `onSortingChange` | `(sorting) => void` | Callback on sort change |
| `onSearchChange` | `(search: string) => void` | Callback on search input change |
| `onColumnFiltersChange` | `(filters) => void` | Callback on filter change |

**Features:**
- Global search input
- Column sorting (click headers)
- Filter menu with active filter badges
- Checkbox row selection
- Configurable bulk actions with optional confirmation dialog
- Column visibility toggling
- Pagination with configurable page size

---

### PromptTableURL

Extends `PromptTable` to synchronize table state (sorting, filters, search) with URL query parameters. Table state persists across page reloads and is shareable via URL.

```tsx
import { PromptTableURL } from '@tumaet/prompt-ui-components'

<PromptTableURL
  data={students}
  columns={studentColumns}
  filters={filters}
  // All PromptTable props are supported
/>
```

URL query parameters used: `sorting`, `filters`, `search` (configurable).

---

### MinimalTiptapEditor

A WYSIWYG rich text editor based on [Tiptap v2](https://tiptap.dev/).

```tsx
import { MinimalTiptapEditor } from '@tumaet/prompt-ui-components'
import '@tumaet/prompt-ui-components/minimal-tiptap/index.css'

function MyForm() {
  const [content, setContent] = useState('')

  return (
    <MinimalTiptapEditor
      value={content}
      onChange={setContent}
      className="min-h-[200px]"
    />
  )
}
```

**Props:**

| Prop | Type | Description |
|---|---|---|
| `value` | `Content` | Current editor content (HTML string or Tiptap JSON) |
| `onChange` | `(value: Content) => void` | Called when content changes |
| `className` | `string` | CSS class for the outer wrapper |
| `editorContentClassName` | `string` | CSS class for the editor content area |

**Toolbar features:**
- Headings (H1–H6)
- Bold, italic, underline, strikethrough, inline code, clear formatting
- Text color
- Ordered and unordered lists
- Code blocks with syntax highlighting (via highlight.js)
- Blockquotes and horizontal rules
- Image insertion with resize handles
- Link management
- Undo/redo

Variants for specific contexts:
- `FormDescriptionTiptap` — compact variant for form description fields
- `MailingTiptap` — variant configured for email content

---

### DatePicker

A calendar-based date picker using a Popover.

```tsx
import { DatePicker } from '@tumaet/prompt-ui-components'

<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
/>
```

---

### DateRangePicker

Selects a start and end date.

```tsx
import { DateRangePicker } from '@tumaet/prompt-ui-components'

<DateRangePicker
  value={dateRange}
  onChange={setDateRange}
/>
```

---

### MultiSelect

A multi-value select component with animations and variant support.

```tsx
import { MultiSelect } from '@tumaet/prompt-ui-components'

<MultiSelect
  options={[
    { label: 'React', value: 'react' },
    { label: 'TypeScript', value: 'ts' },
  ]}
  value={selected}
  onChange={setSelected}
  placeholder="Select frameworks..."
/>
```

---

### DeleteConfirmationDialog

A confirmation dialog specifically for destructive delete actions.

```tsx
import { DeleteConfirmationDialog } from '@tumaet/prompt-ui-components'

<DeleteConfirmationDialog
  open={showDialog}
  onOpenChange={setShowDialog}
  onConfirm={handleDelete}
  description="This will permanently delete the course."
/>
```

---

### SaveChangesAlert

A fixed-position alert bar shown when there are unsaved changes, with Save and Revert buttons.

```tsx
import { SaveChangesAlert } from '@tumaet/prompt-ui-components'

<SaveChangesAlert
  show={isDirty}
  onSave={handleSave}
  onRevert={handleRevert}
/>
```

---

### ScoreLevelSelector

A selector for the five assessment score levels (VeryGood, Good, Ok, Bad, VeryBad).

```tsx
import { ScoreLevelSelector } from '@tumaet/prompt-ui-components'
import { ScoreLevel } from '@tumaet/prompt-shared-state'

<ScoreLevelSelector
  value={ScoreLevel.Good}
  onChange={(level) => setScore(level)}
/>
```

---

### Page Components

Pre-built full-page components for common application states:

```tsx
import {
  ErrorPage,
  LoadingPage,
  UnauthorizedPage,
  ManagementPageHeader,
} from '@tumaet/prompt-ui-components'

// Loading state
<LoadingPage />

// Error state
<ErrorPage message="Something went wrong." />

// Unauthorized access
<UnauthorizedPage />

// Management page header with title and optional actions
<ManagementPageHeader title="Course Management">
  <Button>Add Course</Button>
</ManagementPageHeader>
```

---

## Hooks

```ts
import {
  useToast,
  useIsMobile,
  useCustomElementWidth,
  useScreenSize,
} from '@tumaet/prompt-ui-components'

// Toast notifications
const { toast } = useToast()
toast({ title: 'Saved!', description: 'Your changes have been saved.' })

// Detect mobile viewport
const isMobile = useIsMobile()

// Get an element's current width
const { ref, width } = useCustomElementWidth()

// Get current responsive breakpoint
const { isSmall, isMedium, isLarge } = useScreenSize()
```

---

## Utilities

```ts
import { cn } from '@tumaet/prompt-ui-components'

// Merge Tailwind classes safely (clsx + tailwind-merge)
const className = cn('base-class', condition && 'conditional-class', 'override-class')
```

---

## Module Federation Configuration

To ensure components and state are shared as singletons in a Module Federation setup:

```js
new ModuleFederationPlugin({
  name: 'your-module',
  shared: {
    '@tumaet/prompt-ui-components': {
      singleton: true,
      requiredVersion: deps['@tumaet/prompt-ui-components'],
    },
    '@tumaet/prompt-shared-state': {
      singleton: true,
      requiredVersion: deps['@tumaet/prompt-shared-state'],
    },
    react: { singleton: true, requiredVersion: deps.react },
    'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
  },
})
```

---

## Contributing

As a member of the AET team, contribute changes by opening a pull request. Once merged into `main`, a GitHub Actions workflow automatically bumps the package version and publishes it to npm.

### Commit Message Keywords

| Keyword | Effect | Example |
|---|---|---|
| `major` | `1.2.3` → `2.0.0` | Breaking API change |
| `minor` | `1.2.3` → `1.3.0` | New feature, backwards compatible |
| _(none)_ / `patch` | `1.2.3` → `1.2.4` | Bug fix or small improvement |

After a successful publish, a PR with the new version number will be opened automatically — merge it immediately.
