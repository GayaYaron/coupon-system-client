import {useNavigate} from "react-router-dom";

export function CompanyCard(props) {

    const navigate = useNavigate();

    const deleteCompanyCard = (id) => {
        props.deleteCompanyCard(id);
    }
    return(
        <div className="card" style={{width: '14rem'}}>
            <div className="card-header">
                Company
            </div>
            <ul className="list-group list-group-flush">
                <li  className="list-group-item">name : {props.name}</li>
                <li  className="list-group-item">email : {props.email}</li>
                <li  className="list-group-item">pass : {props.password}</li>
            </ul>
            <div style={{display:'flex', justifyContent : 'space-between'}}>
                <button type="button" onClick={() => {navigate(props.id.toString())}} className="btn btn-info" ><i className="fas fa-edit"/></button>
                <button type="button" onClick={() => {navigate("detail/" + props.id.toString())}} className={"btn btn-dark"}><i className="fas fa-eye"/></button>
                <button type="button" onClick={() => deleteCompanyCard(parseInt(props.id))} className="btn btn-danger delete-button"><i className="fas fa-trash-alt"/></button>
            </div>
        </div>
    )
}