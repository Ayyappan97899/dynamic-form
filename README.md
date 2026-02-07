# Dynamic Form - User Management

A responsive React app for managing users with CRUD operations, form validation, and mock API.

## 🚀 Live Demo

**[https://userdash-app.netlify.app/](https://userdash-app.netlify.app/)**

## Features

- ✅ Create, Read, Update, Delete users
- ✅ Real-time form validation (email, Indian phone format)
- ✅ Responsive mobile design
- ✅ Pagination (6 items/page)
- ✅ Modal-based forms
- ✅ Mock API with json-server
- ✅ Extensible field system (easily add new fields)

## Tech Stack

- React 18 + TypeScript
- Material-UI (MUI)
- React Query (TanStack)
- Axios
- json-server

## Installation

```bash
npm install
npm install -g json-server
```

## Running

**Terminal 1 - Mock API:**

```bash
npm run mock-api
```

**Terminal 2 - React App:**

```bash
npm run dev
```

App: `http://localhost:5173`
API: `http://localhost:3001`

## Project Structure

```
src/
├── components/
│   ├── ui/          (AppFields, AppInput, AppModal)
│   ├── AppUserForm.tsx
│   └── AppUserList.tsx
├── hooks/           (useOnChangeHandler, useUsers)
├── services/        (userService)
├── types/
├── constant/
├── page/            (home.tsx)
└── main.tsx
```

## Form Validation

| Field      | Rules                           |
| ---------- | ------------------------------- |
| First Name | Required                        |
| Last Name  | Required                        |
| Phone      | Required, 10 digits (6-9 start) |
| Email      | Required, valid format          |

## API Endpoints

- `GET /users` - Fetch all
- `POST /users` - Create
- `PUT /users/:id` - Update
- `DELETE /users/:id` - Delete

## Usage

1. **Add User** - Click "Add User" button
2. **Edit User** - Click "Edit" on card
3. **Delete User** - Click "Delete" on card
4. **Paginate** - Click page numbers

## Mobile Responsive

- Mobile: 3 items/page
- Desktop: 6 items/page
- Adaptive spacing & typography
- Touch-friendly buttons

## Database

`db.json` - 10 dummy users included

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run mock-api   # Start json-server
```

## Adding New Fields

### Quick Guide

To add a new field (e.g., "Date of Birth", "Address"):

### Step 1: Update Types

```typescript
// src/types/index.ts
export interface User {
  id?: string | number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dateOfBirth?: string; // New field
  address?: string; // New field
}
```

### Step 2: Update Form Fields Config

```typescript
// src/constant/index.tsx
export const userFormFields = [
  // ... existing fields
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    required: false,
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    required: false,
  },
];
```

### Step 3: Update Default Values

```typescript
// src/components/AppUserForm.tsx
const defaultValues: FormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  dateOfBirth: "", // New field
  address: "", // New field
};
```

### Step 4: Add Validation (Optional)

```typescript
// src/components/AppUserForm.tsx
const validateField = (name: string, value: string | number): string => {
  // ... existing validation

  if (name === "dateOfBirth" && str) {
    const dob = new Date(str);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();

    if (age < 18) {
      return "Must be at least 18 years old";
    }
  }

  if (name === "address" && str && str.length < 5) {
    return "Address must be at least 5 characters";
  }

  return "";
};
```

### Step 5: Update Form Setup

```typescript
// src/components/AppUserForm.tsx
useEffect(() => {
  if (open) {
    if (initialValues) {
      setValues({
        // ... existing fields
        dateOfBirth: initialValues.dateOfBirth || "",
        address: initialValues.address || "",
      });
    }
  }
}, [open, initialValues, setValues, resetValues]);
```

### Step 6: Update handleSave

```typescript
// src/components/AppUserForm.tsx
const handleSave = () => {
  if (!validateAll()) return;

  const user: User = {
    // ... existing fields
    dateOfBirth: values.dateOfBirth ? String(values.dateOfBirth) : undefined,
    address: values.address ? String(values.address) : undefined,
  };

  onSave(user);
  // ... rest of code
};
```

### Step 7: Update Database

```json
// db.json
{
  "users": [
    {
      "id": "1",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "9876543210",
      "email": "john@example.com",
      "dateOfBirth": "1990-05-15",
      "address": "123 Main Street, New York"
    }
  ]
}
```

### Step 8: Update UI Display (Optional)

```typescript
// src/components/AppUserList.tsx
{
  user.dateOfBirth && (
    <Typography variant="caption" color="text.secondary">
      <strong>DOB:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}
    </Typography>
  );
}
{
  user.address && (
    <Typography variant="caption" color="text.secondary">
      <strong>Address:</strong> {user.address}
    </Typography>
  );
}
```

### Summary: 8 Steps to Add Any Field

1. ✅ Add to `User` interface (types)
2. ✅ Add to `userFormFields` constant
3. ✅ Add to `defaultValues`
4. ✅ Add validation rules (if needed)
5. ✅ Add to `useEffect` form setup
6. ✅ Add to `handleSave` user object
7. ✅ Update database schema (db.json)
8. ✅ Update UI display (optional)

**Service & API automatically handle new fields!**
