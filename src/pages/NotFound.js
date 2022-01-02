import {Link} from "react-router-dom";

export function NotFound(props) {
    return(
        <div>
            <h1>PAGE NOT FOUND</h1>
            <div>
                click here to go home
                <div>
                    <Link to={".."}>Go home</Link>
                </div>
            </div>
        </div>
    )
}