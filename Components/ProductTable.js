

export default function ProductTable({body}) {
  return (
    <div className="table-responsive">
        <table className="table container">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Short Description</th>
                    <th scope="col">Thumbnail</th>
                    <th scope="col">Category</th>
                    <th scope="col">Type</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {body}
            </tbody>
        </table>
    </div>
  )
}
