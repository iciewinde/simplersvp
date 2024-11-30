import React, { useRef, useState } from 'react';

import './Form.css';

const Form = () => {
    const formRef = useRef(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formRef.current) {
            formRef.current.submit();
            setSubmitted(true);
        }
    };

    return (
        <div>
            {!submitted ? (
                <div className="form">
                    <h5>Please fill in the following for each attending member of your household:</h5>
                    <form
                        ref={formRef}
                        method="POST"
                        action="https://script.google.com/macros/s/AKfycbwsJtfPFMhPYiZlgkuD6dR0SNq_fC0rtz3JZPN7nAxsOiacYm-RUfE6D_TdaNHHiAoW8Q/exec"
                        target="hidden-iframe"
                        onSubmit={handleSubmit}
                    >
                        <div className="householdMember">
                            <div className="formField">
                                <label htmlFor="firstName">First Name:</label>
                                <input id="firstName" name="First Name" type="text" />
                            </div>
                            <div className="formField">
                                <label htmlFor="lastName">Last Name:</label>
                                <input id="lastName" name="Last Name" type="text" />
                            </div>
                        </div>

                        <input type="submit" />
                    </form>
                </div>
            ) : (
                <p>Thank you for your submission!</p>
            )}

            {/* Invisible iframe to handle the form response */}
            <iframe
                name="hidden-iframe"
                style={{ display: 'none' }}
                title="hidden iframe"
            ></iframe>
        </div>
    );
};

export default Form;




