// Style with Bootstrap card
export function Card(props) {
  return (
    // If title and text exist, then conditionally render element
    <div
      className="card text-black bg-light mb-3"
      style={{ maxWidth: "18rem" }}
    >
      <h6 className="card-header">{props.header}</h6>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.image}
        {props.status}
      </div>
    </div>
  );
}
