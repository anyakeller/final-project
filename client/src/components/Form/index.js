import React from "react";
import "./style.css";


// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="20" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} style={{ float: "none", marginLeft: 5, marginBottom: 10 }} className="btn">
      {props.children}
    </button>
  );
}


export function Label( {children} ) {
  return (
    <label> {children} </label>
  );
}