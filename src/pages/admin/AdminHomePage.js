export function AdminHomePage(props){
    return(
        <div style={{display : "flex", justifyContent: "center", alignItems : "center", marginTop : "10%", flexDirection : "column"}}>
            <div>
            <h1>WELCOME ADMIN !!!</h1>
            </div>
            <div>
                <div>
                here you can choose your action like :
                </div>
                <div>
                <ul>
                    <li>add company</li>
                    <li>update company</li>
                    <li>delete company</li>
                    <li>add customer</li>
                    <li>update customer</li>
                    <li>delete customer</li>
                </ul>
                </div>
            </div>

        </div>

    )
}