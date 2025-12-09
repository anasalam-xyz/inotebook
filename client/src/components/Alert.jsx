
export default function Alert({alert}) {
    if(!alert) return null;
    let status = alert.type.toLowerCase().charAt(0).toUpperCase() + alert.type.toLowerCase().slice(1);
    if(status==="Danger")
        status="Error";
    return (
        <div className={`alert alert-${alert.type}`} role="alert">
            <strong>{status}</strong> {alert.message}
        </div>
    )
}
