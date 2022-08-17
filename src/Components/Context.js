import { createContext } from "react";

// Add context
export const UserContext = createContext(null);
export const CurrentUserContext = createContext(null);

// Style with Bootstrap card
export function Card(props) {
  // Assign background and text colors using Bootstrap classes
  function classes() {
    const bg = props.bgcolor ? " bg-" + props.bgcolor : "";
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-3 " + bg + txt;
  }

  return (
    // If title and text exist, then conditionally render element
    <div className={classes()} style={{ maxWidth: "18rem" }}>
      <h6 className="card-header">{props.header}</h6>
      <div className="card-body">
        {props.title && <h5 className="card-title">{props.title}</h5>}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status}
      </div>
    </div>
  );
}
