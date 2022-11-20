export default function NewProductForm({ onSubmit, onChange }) {
  return (
    <div className="container-fluid">
      <div className="card mx-auto w-100 my-5" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <form className="" onSubmit={onSubmit}>
            <label htmlFor="product-name">Product Name</label>
            <input
              name="productName"
              onChange={onChange}
              className="form-control form-control-sm mb-2"
              placeholder="Input Product Name"
              type="text"
            />
            <label htmlFor="shortdesc">Short Description</label>
            <input
              name="shortdesc"
              className="form-control form-control-sm mb-2"
              onChange={onChange}
              placeholder="Input Short Description"
              type="text"
            />
            <label htmlFor="longdesc">Long Description</label>
            <textarea
              name="longdesc"
              className="form-control form-control-sm mb-2"
              onChange={onChange}
              placeholder="Input Long Description"
              rows="7"
              col="50"
            ></textarea>
            <label htmlFor="thumbnail">Thumbnail Link</label>
            <input
              name="thumbnail"
              className="form-control form-control-sm mb-2"
              onChange={onChange}
              placeholder="Input Thumbnail Link"
              type="text"
            />
            <label htmlFor="category">Product Category</label>
            <input
              name="category"
              className="form-control form-control-sm mb-2"
              onChange={onChange}
              placeholder="Input Product Category"
              type="text"
            />
            <label htmlFor="type">Product Type</label>
            <input
              name="type"
              className="form-control form-control-sm mb-2"
              onChange={onChange}
              placeholder="Input Product Type"
              type="text"
            />
            <div className="d-grid">
              <input type="submit" className="btn btn-primary" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
