

export function SubmitButton(props) {
    return (
        <div className='mt-3'>
            <button type="submit" className="btn btn-primary" disabled={props.disabled}>{props.text}</button>
        </div>
    )
}