import React from "react";
import "./style.css";

function Nav(props) {

	// return navbar
  return (
    <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand" href="/">
        Who You
      </a>
			{props.navLinks.map(link =>(
				<a href={"/"+link.route}>
					{link.name}
				</a>
			))}
    </nav>
  );
}

export default Nav;
