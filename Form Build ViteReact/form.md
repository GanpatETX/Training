# React + Vite Dynamic Form Builder With 2/3 Column Layout Support

This implementation replaces the older CRA + jQuery setup with a cleaner:

* React
* Vite
* Tailwind CSS
* Pure React architecture
* Dynamic JSON-based form rendering
* 2-column and 3-column layouts
* Drag/drop-ready architecture

This is NOT dependent on jQuery.

---

# 1. Create New Vite Project

Open terminal:

```bash
npm create vite@latest form-builder
```

Choose:

```txt
React
JavaScript
```

Then:

```bash
cd form-builder
npm install
```

---

# 2. Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

# 3. Configure Tailwind

## Replace `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

# 4. Replace `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background: #f3f4f6;
}
```

---

# 5. Create Folder Structure

```txt
src/
 ├── components/
 │    ├── FormBuilder.jsx
 │    ├── FormRenderer.jsx
 │    ├── Toolbox.jsx
 │    └── FieldRenderer.jsx
 │
 ├── data/
 │    └── initialData.js
 │
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

---

# 6. Create `src/data/initialData.js`

```js
export const initialData = [
  {
    id: 1,
    type: 'text',
    label: 'Name',
    colSpan: 6,
  },
  {
    id: 2,
    type: 'text',
    label: 'Email',
    colSpan: 6,
  },
  {
    id: 3,
    type: 'textarea',
    label: 'Description',
    colSpan: 12,
  },
]
```

---

# 7. Create `src/components/FieldRenderer.jsx`

```jsx
const FieldRenderer = ({ field }) => {
  switch (field.type) {
    case 'text':
      return (
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            {field.label}
          </label>

          <input
            type="text"
            className="w-full border rounded p-2"
          />
        </div>
      )

    case 'textarea':
      return (
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            {field.label}
          </label>

          <textarea
            className="w-full border rounded p-2"
            rows={4}
          />
        </div>
      )

    case 'number':
      return (
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            {field.label}
          </label>

          <input
            type="number"
            className="w-full border rounded p-2"
          />
        </div>
      )

    case 'select':
      return (
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            {field.label}
          </label>

          <select className="w-full border rounded p-2">
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div>
      )

    default:
      return null
  }
}

export default FieldRenderer
```

---

# 8. Create `src/components/FormRenderer.jsx`

```jsx
import FieldRenderer from './FieldRenderer'

const FormRenderer = ({ fields }) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      {fields.map((field) => (
        <div
          key={field.id}
          className={`col-span-${field.colSpan}`}
        >
          <FieldRenderer field={field} />
        </div>
      ))}
    </div>
  )
}

export default FormRenderer
```

---

# 9. Create `src/components/Toolbox.jsx`

```jsx
const Toolbox = ({ addField }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">
        Toolbox
      </h2>

      <div className="space-y-2">
        <button
          onClick={() => addField('text', 12)}
          className="w-full border p-2 rounded"
        >
          Full Width Text
        </button>

        <button
          onClick={() => addField('text', 6)}
          className="w-full border p-2 rounded"
        >
          2 Column Text
        </button>

        <button
          onClick={() => addField('text', 4)}
          className="w-full border p-2 rounded"
        >
          3 Column Text
        </button>

        <button
          onClick={() => addField('textarea', 12)}
          className="w-full border p-2 rounded"
        >
          Text Area
        </button>

        <button
          onClick={() => addField('number', 6)}
          className="w-full border p-2 rounded"
        >
          Number
        </button>

        <button
          onClick={() => addField('select', 6)}
          className="w-full border p-2 rounded"
        >
          Select
        </button>
      </div>
    </div>
  )
}

export default Toolbox
```

---

# 10. Create `src/components/FormBuilder.jsx`

```jsx
import { useState } from 'react'
import FormRenderer from './FormRenderer'
import Toolbox from './Toolbox'
import { initialData } from '../data/initialData'

const FormBuilder = () => {
  const [fields, setFields] = useState(initialData)

  const addField = (type, colSpan) => {
    const newField = {
      id: Date.now(),
      type,
      label: `${type} field`,
      colSpan,
    }

    setFields((prev) => [...prev, newField])
  }

  const exportJSON = () => {
    console.log(fields)

    alert('Check browser console for JSON')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <div className="bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-6">
              Global Form Engine
            </h1>

            <FormRenderer fields={fields} />

            <button
              onClick={exportJSON}
              className="mt-6 bg-black text-white px-4 py-2 rounded"
            >
              Export JSON
            </button>
          </div>
        </div>

        <div className="col-span-3">
          <Toolbox addField={addField} />
        </div>
      </div>
    </div>
  )
}

export default FormBuilder
```

---

# 11. Replace `src/App.jsx`

```jsx
import FormBuilder from './components/FormBuilder'

function App() {
  return <FormBuilder />
}

export default App
```

---

# 12. Replace `src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

# 13. Start Project

```bash
npm run dev
```

Open:

```txt
http://localhost:5173
```

---

# 14. Result

You now have:

* React + Vite project
* Dynamic form builder
* 2-column layout
* 3-column layout
* JSON export
* Tailwind styling
* Scalable architecture
* No jQuery dependency

---

# 15. Example Generated JSON

```json
[
  {
    "id": 1,
    "type": "text",
    "label": "Name",
    "colSpan": 6
  },
  {
    "id": 2,
    "type": "text",
    "label": "Email",
    "colSpan": 6
  },
  {
    "id": 3,
    "type": "textarea",
    "label": "Description",
    "colSpan": 12
  }
]
```

---

# 16. Future Improvements

You can later add:

* Drag/drop using dnd-kit
* Nested sections
* Table fields
* Validation
* API save/load
* Conditional fields
* Tabs
* Accordion sections
* Form preview mode
* Database persistence
* Backend integration
* Schema versioning

---

# 17. Why This Architecture Is Better

Compared to jQuery formBuilder:

| Old Architecture        | New Architecture       |
| ----------------------- | ---------------------- |
| jQuery DOM manipulation | Pure React rendering   |
| Flat plugin system      | Component architecture |
| Hard to scale           | Easier to scale        |
| Difficult layouts       | Easy grid layouts      |
| Legacy approach         | Modern frontend        |
| Limited customization   | Full control           |

---

# 18. Recommended Next Step

After this works:

Install drag/drop library:

```bash
npm install @dnd-kit/core
```

Then implement:

* draggable toolbox
* droppable canvas
* sortable fields

That would move this toward a real ERP-grade form engine.
