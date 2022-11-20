
export default function CardView({title, thumbnail, desc}) {
  return (
    <div className="col gy-3">
        <div className="card"  style={{ minHeight: "16rem" }}>
          <img src={thumbnail} className="card-img-top" alt="product-thumbnail" />
          <div className="card-body">
            <h5>{title}</h5>
            <p>{desc}</p>
          </div>
        </div>
    </div>
  )
}
