import { Link } from "react-router-dom"
import Cookies from 'js-cookie';



function Navbar() {



    return (<>

        <ul className="nav justify-content-end">
            <li className="nav-item">
                <Link className="nav-link active" to="/"> Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/login"> Log in</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
                <Link className="nav-link active" to="/" onClick={()=>Cookies.remove('token')}> Log out</Link>
            </li>
        </ul>

    </>)
}
export default Navbar