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
                        action="https://script.google.com/macros/s/AKfycbzobzNfK4Li79NCq4Rq-gwEI_3G0Nq7K3qj20hGC7Uws2W0XRqhAkXdE2wNKjV5855NEA/exec"
                        target="hidden-iframe"
                        onSubmit={handleSubmit}
                    >
                        Household Member 1:
                        <div className="householdMember">
                            <div className="formField">
                                <label htmlFor="firstName_1">First Name:</label>
                                <input id="firstName_1" name="firstName_1" type="text" />
                            </div>
                            <div className="formField">
                                <label htmlFor="lastName_1">Last Name:</label>
                                <input id="lastName_1" name="lastName_1" type="text" />
                            </div>
                        </div>

                        Household Member 2:
                        <div className="householdMember">
                            <div className="formField">
                                <label htmlFor="firstName_1">First Name:</label>
                                <input id="firstName_1" name="firstName_2" type="text" />
                            </div>
                            <div className="formField">
                                <label htmlFor="lastName_1">Last Name:</label>
                                <input id="lastName_1" name="lastName_2" type="text" />
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




