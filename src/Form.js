import React, { useRef, useState } from 'react';

import './Form.css';

const Form = () => {
    const formRef = useRef(null);
    const [submitted, setSubmitted] = useState(false);
    const [numHousehold, setNumHousehold] = useState(1);
    const [attendanceStatus, setAttendanceStatus] = useState({});
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formRef.current) {
            formRef.current.submit();
            setSubmitted(true);
        }
    };

    const handleAttendanceChange = (i, value) => {
        setAttendanceStatus(prevState => ({
            ...prevState,
            [i]: value,
        }));
    };

    const handleRemove = () => {
        setNumHousehold(numHousehold - 1);
    }

    const renderHouseholdMemberInputs = () => {
        const householdMemberInputs = [];
        for (let i = 1; i < numHousehold + 1; i++) {
            const isAttending = attendanceStatus[i] === 'Yes';

            householdMemberInputs.push(
                <div className="householdMember">
                    <div className="formFieldHeader">
                        {i === numHousehold && i > 1 ? <div className="headerSub"><span>Guest #{i}</span> <span onClick={handleRemove} className="remove">(remove)</span></div> : `Guest #${i}`}
                    </div>
                    <div className="formField">
                        <label htmlFor={`firstName_${i}`}>First Name:</label>
                        <input id={`firstName_${i}`} name={`firstName_${i}`} type="text" />
                    </div>
                    <div className="formField">
                        <label htmlFor={`lastName_${i}`}>Last Name:</label>
                        <input id={`lastName_${i}`} name={`lastName_${i}`} type="text" />
                    </div>
                    <div className="formField">
                        <label htmlFor={`canAttend_${i}`}>RSVP:</label>
                        <select
                            name={`canAttend_${i}`}
                            id={`canAttend_${i}`}
                            onChange={(e) => handleAttendanceChange(i, e.target.value)}
                        >
                            <option value="">Please select</option>
                            <option value="Yes">Will attend</option>
                            <option value="No">Unable to attend</option>
                        </select>
                    </div>
                    {isAttending && (
                        <div className="formField">
                            <label htmlFor={`dietaryRestrictions_${i}`}>Dietary Restrictions:</label>
                            <input id={`dietaryRestrictions_${i}`} name={`dietaryRestrictions_${i}`} type="text" />
                        </div>
                    )}
                </div>
            )
        }



        return householdMemberInputs;
    }

    const handleFormChange = () => {
        const formData = new FormData(formRef.current);

        const formValuesObj = {};
        formData.forEach((value, key) => {
            formValuesObj[key] = value;
        });

        let hasEmptyField = false;
        Object.keys(formValuesObj).forEach(k => {
            if (!k.includes('dietaryRestrictions') && !formValuesObj[k]) {
                hasEmptyField = true;
            }
        });

        setIsSubmitDisabled(hasEmptyField);
    }


    return (
        <div>
            {!submitted ? (
                <div className="form">
                    <div className="description">Please RSVP for each guest in your household:</div>
                    <form
                        ref={formRef}
                        method="POST"
                        action="https://script.google.com/macros/s/AKfycbzobzNfK4Li79NCq4Rq-gwEI_3G0Nq7K3qj20hGC7Uws2W0XRqhAkXdE2wNKjV5855NEA/exec"
                        target="hidden-iframe"
                        onChange={handleFormChange}
                        onSubmit={handleSubmit}
                    >
                        {renderHouseholdMemberInputs()}

                        <div className="formActions">
                            <button className="formAction addMember" onClick={e => { e.preventDefault(); setNumHousehold(numHousehold + 1) }}>
                                + Add Another Guest
                            </button>
                            <input className="formAction submit" type="submit" disabled={isSubmitDisabled} />
                        </div>
                    </form>
                </div>
            ) : (
                <p className="thankyou">We've received your household's information.<br /><br />Thank you for RSVPing!</p>
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




