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