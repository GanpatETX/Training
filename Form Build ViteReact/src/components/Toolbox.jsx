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