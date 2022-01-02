export function FormQuestion(props) {
    const turnNameToTitle = (name) => {
        let title = name.replace(/([A-Z])/g, ' $1').trim();
        title = title.charAt(0).toUpperCase() + title.substring(1);
        return title;
    };

    const inputClass = (valid) => {
        return valid ? "form-control" : "form-control is-invalid";
    };

    const inputPlaceholder = (holder) => {
        return holder ? holder : "";
    };

    const errorMessage = (message) => {
        return message ? <div className="invalid-feedback">{message}</div> : <div className="hidden" />;
    };

    const turnListToOptions = () => {
        return props.options.map((option, index) => <option key={index} value={option}>{turnNameToTitle(option)}</option>);
    }

    const turnListToRadios = () => {
        return props.radios.map((radio, index) =>
            <div key={index} className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name={props.name} id={radio.name} value={radio.value}
                    onChange={props.onChange} checked={props.checked === radio.value} />
                <label className="form-check-label" htmlFor={radio.name}>{turnNameToTitle(radio.name)}</label>
            </div>
        )
    }

    const inputQuestion = () => {
        return (
            <input type={props.type} name={props.name} className={inputClass(props.valid)}
                id={props.name} placeholder={inputPlaceholder(props.placeholder)} value={props.value}
                onChange={props.onChange} required={props.required} />
        );
    };

    const selectQuestion = () => {
        return (
            <select name={props.name} id={props.name} required={props.required}>
                {turnListToOptions()}
            </select>
        );
    }

    const textareaQuestion = () => {
        return (
            <textarea className={inputClass(props.valid)} name={props.name} id={props.name} value={props.value} onChange={props.onChange} required={props.required} />
        )
    }

    const radioQuestion = () => {
        return (
            <div id={props.name} required={props.required}>
                {turnListToRadios()}
            </div>
        )
    }

    const questionByType = () => {
        switch (props.quesType) {
            case "input":
                return inputQuestion();
            case "select":
                return selectQuestion();
            case "textarea":
                return textareaQuestion();
            case "radio":
                return radioQuestion();
            default:
                return inputQuestion();
        }
    };

    return (
        <div className='form-group mt-2'>
            <label htmlFor={props.name}> {turnNameToTitle(props.name)}</label> <br />
            {questionByType()}
            {errorMessage(props.errorMessage)}
        </div>
    );
}