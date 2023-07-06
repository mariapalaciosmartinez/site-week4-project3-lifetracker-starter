import * as React from "react"
import { Link } from "react-router-dom";

export default function Landing() {
    return (
      <div className="landing">
        <Link to={`/login`}>
            <button className="Login">
                <i>Login</i>
            </button>
        </Link>     
        <Link to={`/register`}>
            <button className="Register">
                <i>Register</i>
            </button>
        </Link>  
      </div>
    );
}