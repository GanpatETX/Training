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