import styles from './Form.css';

function Form() {
    return (
        <div className="form">
            <form method="POST" action="https://script.google.com/macros/s/AKfycbwsJtfPFMhPYiZlgkuD6dR0SNq_fC0rtz3JZPN7nAxsOiacYm-RUfE6D_TdaNHHiAoW8Q/exec">
                <div className="formField">
                    <label htmlFor="firstName">First Name:</label>
                    <input id="firstName" name="First Name" type="text" />
                </div>
                <div className="formField">
                    <label htmlFor="lastName">Last Name:</label>
                    <input id="lastName" name="Last Name" type="text" />
                </div>

                <input type="submit" />
            </form>
        </div>
    );
}

export default Form;
