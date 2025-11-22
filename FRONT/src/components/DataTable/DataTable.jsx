import './DataTable.css'

function DataTable({ data, columns }) {
  if (!data || data.length === 0) {
    return (
      <div className="data-table-empty">
        <p>No hay datos para mostrar</p>
      </div>
    )
  }

  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row._id || row.id || index}>
              {columns.map((column) => {
                const value = row[column.key]
                return (
                  <td key={column.key}>
                    {column.format ? column.format(value, row) : value}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable

