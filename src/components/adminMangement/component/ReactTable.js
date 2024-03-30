import DataTable from "react-data-table-component"
const test = (list) => {
    console.log(list)
}

export const ReactTable = ({ columns , dataTable , handle=test}) => {

    return (
        <DataTable 
        className='table'
        columns={columns}
        data={dataTable}
        persistTableHead
        pagination
        onRowClicked={(e) => handle(e)}
        />
    )
}