import React, { useRef, useState } from 'react';

import './Form.css';

const Form = () => {
    const formRef = useRef(null);
    const [submitted, setSubmitted] = useState(false);
    const [numHousehold, setNumHousehold] = useState(1);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formRef.current) {
            formRef.current.submit();
            setSubmitted(true);
        }
    };

    const renderHouseholdMemberInputs = () => {
        const householdMemberInputs = [];
        for (let i = 1; i < numHousehold + 1; i++) {
            householdMemberInputs.push(
                <div className="householdMember">
                    <div className="formField">
                        <label htmlFor={`firstName_${i}`}>First Name:</label>
                        <input id={`firstName_${i}`} name={`firstName_${i}`} type="text" />
                    </div>
                    <div className="formField">
                        <label htmlFor={`lastName_${i}`}>Last Name:</label>
                        <input id={`lastName_${i}`} name={`lastName_${i}`} type="text" />
                    </div>
                    <div className="formField">
                        <label htmlFor={`canAttend_${i}`}>Will you be attending?</label>
                        <input id={`canAttend_${i}`} name={`canAttend_${i}`} type="checkbox" />
                    </div>
                </div>
            )
        }
        return householdMemberInputs;
    }

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
                        {renderHouseholdMemberInputs()}

                        <button onClick={e => { e.preventDefault(); setNumHousehold(numHousehold + 1) }}>Add Member</button>
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



