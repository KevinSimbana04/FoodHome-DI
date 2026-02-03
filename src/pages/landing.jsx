import { Link } from "react-router-dom";

function Landing() {
    return (
        <div>
            <h1>Landing</h1>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/register"><button>Register</button></Link>
        </div>
    );
}
export default Landing;