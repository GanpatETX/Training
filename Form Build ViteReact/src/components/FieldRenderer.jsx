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