import React, { useState, useEffect, useRef } from 'react' // 1. Added useRef import
import '../styles/Register.css'

/**
 * A custom  hook that manages state and synchronizes it with `localStorage`.
 *
 * * @param {string} key - The key under which the state is stored in `localStorage`.
 * @param {T} initialState - The default value to use if no value is found in `localStorage`.
 * * @returns {[T, React.Dispatch<React.SetStateAction<T>>]} A stateful value and a function to update it, matching the signature of `useState`.
 * * @throws {SyntaxError} Note: If a primitive string is saved, subsequent reads will fail during `JSON.parse()`.
 */
function useStorageState(key, initialState) {
    const [value, setValue] = useState(() => {
        try {
            const saved = localStorage.getItem(key);
            if (saved !== null) {
                return JSON.parse(saved); 
            }
        } catch (e) {
            console.warn("LocalStorage read blocked by browser privacy settings:", e);
        }
        return initialState;
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
        } catch (e) {
            console.warn("LocalStorage write blocked by browser privacy settings:", e);
        }
    }, [key, value]);

    return [value, setValue];
}

/**
 * Is a form that helps build a submission payments and backend pipeline
 * @returns the multi step regsiter function
 */
function Register() {
    const [step, setStep] = useStorageState('register_step', 1);
    const [isPaid, setIsPaid] = useStorageState('register_isPaid', false);

    // 2. Created the missing Ref to hold the freshest values for the async trigger safely
    const valuesRef = useRef();

    // 3. Persist all form inputs as an object
    const [values, setValues] = useStorageState('register_values', {
        firstName: '',
        lastName: '',
        playerEmail: '',
        parentEmail: '',
        phoneNumber: '',
        ageGroup: '',
        position: '',
        tournamentSelect: 'Prep Cup (6/12-14)',
        waiver: '',
        parentSig: '',
        playerSig: '',
    });

    // 4. Keep the values ref perfectly updated on every keystroke
    useEffect(() => {
        valuesRef.current = values;
    }, [values]);

    /**
     * This handles the payment processes when it is on the last step of the form
     */
    useEffect(() => {
        if (step === 4) {
            
            const renderPayPal = () => {
                if (window.paypal && window.paypal.Buttons) {
                    const container = document.getElementById("paypal-container-W4SYP3NQH2LCQ");
                    if (container) container.innerHTML = ""; 
                    
                    // FIXED: Changed HostedButtons to standard Buttons to enable execution hooks
                    window.paypal.Buttons({
                        style: {
                            layout: 'vertical',
                            shape: 'rect',
                            label: 'pay'
                        },
                        createOrder: function(data, actions) {
                            // Define the pricing matrix here based on the selected tournament
                            const priceMap = {
                                'Prep Cup (6/12-14)': '235.00',
                                'Girls Harrow Invite (6/19-21)': '235.00',
                                'Boys Harrow Invite (6/26-28)': '235.00',
                                'Summer Meltdown (7/17-19)': '235.00',
                                'CCM Summer Invite (8/1-3)': '235.00',
                                'Girls Militia Cup (8/7-9)': '235.00',
                                'Boys Militia Cup (8/14-16)': '235.00'
                            };
                            
                            // Fallback to a base fee if unmatched
                            const selectedPrice = priceMap[valuesRef.current.tournamentSelect] || '235.00';

                            return actions.order.create({
                                purchase_units: [{
                                    description: valuesRef.current.tournamentSelect,
                                    amount: {
                                        currency_code: 'USD',
                                        value: selectedPrice
                                    }
                                }]
                            });
                        },
                        onApprove: function(data, actions) {
                            // Captures the funds directly via client-side transaction response
                            return actions.order.capture().then(function(details) {
                                alert("Payment Successful! Your transaction is verified. Processing your registration automatically now...");
                                setIsPaid(true); // Safely fires your second automated submission useEffect
                            });
                        },
                        onError: function(err) {
                            console.error("PayPal Transaction Window Error:", err);
                            alert("An error occurred during the secure checkout interface initialization.");
                        }
                    }).render("#paypal-container-W4SYP3NQH2LCQ");
                }
            };

            const script = document.createElement('script');
            script.id = 'paypal-sdk-script';
            
            script.src = "https://www.paypal.com/sdk/js?client-id=Ab0s72Y4aPTFzegRugr3qeQV2Q_eVKOxuvUNx5MDBkh7dnA1upE9SEbUEirpgdgOnj5AC2cRh5A5CEVT&currency=USD";
            //SAND BOX script.src = "https://www.paypal.com/sdk/js?client-id=ASL_Yzq1AfT4nrv25FOr9Fqp8wAJkBHwvOP8JdneNm0vM0PLhr2CQ9VTljVXXwWJaPkDUor9dA4KwbQa&currency=USD"
            
            script.crossOrigin = "anonymous";
            script.async = true;
            script.onload = renderPayPal;
            document.body.appendChild(script);

            script.onload = renderPayPal;

        }
    }, [step, setIsPaid]);


    /**
     * automaticaly submits data to google api when it is on the fourt step and stuff is paid
     */
    useEffect(() => {
        if (step === 4 && isPaid) {
            executeAutoSubmit();
        }
        
        async function executeAutoSubmit() {
            try {
                const response = await fetch("/.netlify/functions/submit-registration", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(valuesRef.current), // Pulls safely from our synchronized ref
                });

                const result = await response.json();

                if (result.result === "success") {
                    alert("Registration Automatically Submitted Successfully! We'll email you once processed.");
                    //reveerts back to a blank form on page 1
                    localStorage.removeItem("register_step");
                    localStorage.removeItem("register_values");
                    localStorage.removeItem("register_isPaid");
                    setStep(1);
                    setValues({
                        firstName: "", lastName: "", playerEmail: "",
                        parentEmail: "", phoneNumber: "", ageGroup: "",
                        position: "", tournamentSelect: "Prep Cup (6/12-14)",
                        waiver: "", parentSig: "", playerSig: "",
                    });
                    setIsPaid(false);
                } else {
                    throw new Error(result.error || "Submission failed");
                }
            } catch (error) {
                console.error("Auto-Submission error:", error);
                alert("Payment went through, but database automation errored. Please contact support to manually log your sheet.");
            }
        }
    }, [isPaid, step, setStep, setValues, setIsPaid]);

    /**
     * Each time a button is pressed on the bottom, it will change steps, making sure that each value is filled out
     * @param e 
     * @returns 
     */
    const nextStep = (e) => {
        e.preventDefault(); 

        if (step === 1) {
            const { firstName, lastName, playerEmail, phoneNumber } = values;
            if (!firstName.trim() || !lastName.trim() || !playerEmail.trim() || !phoneNumber.trim()) {
                alert("Please fill out all required fields before moving to the next step.");
                return; 
            }
        }

        if (step === 2) {
            const { ageGroup, position } = values;
            if (!ageGroup || !position) {
                alert("Please select your Birth Year and Position to proceed.");
                return; 
            }
        }

        if (step === 3) {
            const { waiver, parentSig, playerSig } = values;
            if (waiver !== 'Agree') {
                alert("You must agree to the Waiver of Liability to continue.");
                return;
            }
            if (!parentSig.trim() || !playerSig.trim()) {
                alert("Please provide both signatures before completing registration.");
                return;
            }
        }

        setStep(step + 1);
        scrollToSection('register-header');
    }

    //each time a value is changed, they update the values and the local storage state
    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    //used to scroll to the top
    const scrollToSection = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    //this sets it back to previous pages and scrolls to top
    const prevStep = (e) => {
        e.preventDefault();
        setStep(step - 1);
        scrollToSection('register-header')
    }

    //default in case user pushes button
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isPaid) {
            alert("Please complete the PayPal payment before submitting.");
        }
    };

    return (
        <div className='register'>
            <header className='header' id = 'register-header'>Dragons Tournament Registration</header>

            <div className='form'>
                <form onSubmit={handleSubmit}>
                    
                    {/* PAGE 1: Contact Information */}
                    {step === 1 && (
                        <div className="form-page">
                            <h2>Contact Details</h2>
                            <div className="form-group">
                                <label htmlFor='firstName'>First Name*</label>
                                <input type='text' name="firstName" placeholder='Enter First Name' className='firstName'
                                    value={values.firstName} onChange={handleChanges} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor='lastName'>Last Name*</label>
                                <input type='text' name="lastName" placeholder='Enter Last Name' className='lastName'
                                    value={values.lastName} onChange={handleChanges} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor='playerEmail'>Player Email*</label>
                                <input type='email' name="playerEmail" placeholder='Enter Player Email' className='playerEmail'
                                    value={values.playerEmail} onChange={handleChanges} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor='parentEmail'>Parent Email</label>
                                <input type='email' name="parentEmail" placeholder='Enter Parent Email' className='parentEmail'
                                    value={values.parentEmail} onChange={handleChanges} />
                            </div>
                            <div className="form-group">
                                <label htmlFor='phoneNumber'>Phone Number*</label>
                                <input type='text' name="phoneNumber" placeholder='Enter Phone #' className='phoneNumber'
                                    value={values.phoneNumber} onChange={handleChanges} required />
                            </div>
                            
                            <button type="button" className="btn-next" onClick={nextStep}>Next</button>
                        </div>
                    )}

                    {/* PAGE 2: Hockey Experience */}
                    {step === 2 && (
                        <div className="form-page">
                            <h2>Registration</h2>
                            <div className="form-group">
                                <label>Player Birth Year*</label>
                                <div className="radio-group">
                                    <label><input type='radio' name="ageGroup" value="U14" checked={values.ageGroup === 'U14'} onChange={handleChanges} /> U14</label>
                                    <label><input type='radio' name="ageGroup" value="U16" checked={values.ageGroup === 'U16'} onChange={handleChanges} /> U16</label>
                                    <label><input type='radio' name="ageGroup" value="U18" checked={values.ageGroup === 'U18'} onChange={handleChanges} /> U18</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Player Position*</label>
                                <div className="radio-group">
                                    <label><input type='radio' name="position" value="Forward" checked={values.position === 'Forward'} onChange={handleChanges} /> Forward</label>
                                    <label><input type='radio' name="position" value="Defense" checked={values.position === 'Defense'} onChange={handleChanges} /> Defense</label>
                                    <label><input type='radio' name="position" value="Goalie" checked={values.position === 'Goalie'} onChange={handleChanges} /> Goalie</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor='tournamentSelect'>Tournament to Register</label>
                                <div className = 'select'>
                                <select className='tournamentSelect' name="tournamentSelect" id='tournamentSelect' value={values.tournamentSelect} onChange={handleChanges}>
                                    <option value='Prep Cup (6/12-14)'>Prep Cup (6/12-14)</option>
                                    <option value='Girls Harrow Invite (6/19-21)'>Girls Harrow Invite (6/19-21)</option>
                                    <option value='Boys Harrow Invite (6/26-28)'>Boys Harrow Invite (6/26-28)</option>
                                    <option value='Summer Meltdown (7/17-19)'>Summer Meltdown (7/17-19)</option>
                                    <option value='CCM Summer Invite (8/1-3)'>CCM Summer Invite (8/1-3)</option>
                                    <option value='Girls Militia Cup (8/7-9)'>Girls Militia Cup (8/7-9)</option>
                                    <option value='Boys Militia Cup (8/14-16)'>Boys Militia Cup (8/14-16)</option>
                                </select>
                                </div>
                            </div>
                            
                            <div className="button-row">
                                <button type="button" className="btn-back" onClick={prevStep}>Back</button>
                                <button type="button" className="btn-next" onClick={nextStep}>Next</button>
                            </div>
                        </div>
                    )}

                    {/* PAGE 3: Waiver */}
                    {step === 3 && (
                        <div className="form-page">
                            <h2>Consent and Waiver of Liability</h2>
                             <div className="form-group">
                                 <p>I agree that I shall provide health insurance (including a copy of an insurance coverage card or similar document) to cover any personal injury and property damage sustained by the camper while participating in any activities of or while on the premises of East Coast Dragons, or premises leased or otherwise under the control of East Coast Dragons. The undersigned assumes all responsibility for any and all risk of damage or injury that may occur to the above named player as a participant in East Coast Dragons, including practices, scrimmages, skills sessions, clinics, day camps, boarding camps, off ice, tournaments and other activities related to the program.</p>

                                <p>Additionally, the undersigned hereby releases and discharges the program, Alex Duan, William Song, Lina Song, Kailai Duan, its operators, employees, agents, supervisors, instructors and other players from all claims, demands, rights or causes of action present or future, whether known or anticipated and resulting from or arising out of an incident to the undersigned participation in said program. This is also my permission to have my child admitted and attended to, for medical and dental treatment, in case of sickness or injury, that all physicals and inoculations are up to date. I acknowledge and agree that this Release and Waiver of Liability is intended to be, and is, a complete release of any responsibility of the Released Parties for any and all illness (including COVID-19 or other communicable disease or illness), personal injuries, temporary or permanent disability, death and or property damage sustained by my child while attending and or participating in the camp. I hereby grant East Coast Dragons the right to use photographs, video images and/or other media of my child for publicity, advertising and/or other commercial purposes. I understand the event may be photographed, videotaped or otherwise recorded. I agree to let the above parties use my name, photo likeness and demographic information free of charge in any manner and for any purpose in any media now known or hereafter created. East Coast Dragons has a zero tolerance policy with respect to uncontrollable behavior, bullying, hazing, alcohol, tobacco, drugs and other controlled substances and weapons of any kind. Any participant possessing any of these will be immediately dismissed from the program and will forfeit all amounts paid. By signing this release and by being enrolled in this program you assent to the enforcement of this policy and you hereby grant East Coast Dragons the right to inspect any and all personal belongings at any time on or off premises in relation to the program. Dates, times and prices are subject to change. I understand that this document is intended to be as broad and inclusive as permitted by the laws of the state in which the Event is taking place and agree that if any portion of this agreement is invalid, the remainder shall continue in full legal force and effect. I further agree that any legal proceedings related to this waiver shall take place in the Commonwealth of Massachusetts.</p>

                                <p>Note: This release must be signed prior to the participation in an East Coast Dragons program.</p>
                               <div className="radio-group">
                                    <label><input type='radio' name="waiver" value="Agree" checked={values.waiver === 'Agree'} onChange={handleChanges} />AGREE</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor='parentSig'>Parent Signature*</label>
                                <input type='text' name="parentSig" placeholder='Enter First Name' className='parentSig'
                                    value={values.parentSig} onChange={handleChanges} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor='playerSig'>Player Signature*</label>
                                <input type='text' name="playerSig" placeholder='Enter First Name' className='playerSig'
                                    value={values.playerSig} onChange={handleChanges} required />
                            </div>

                            <div className="button-row">
                                <button type="button" className="btn-back" onClick={prevStep}>Back</button>
                                <button type="button" className="btn-next" onClick={nextStep}>Next</button>
                            </div>
                        </div>
                    )}

                    {/* PAGE 4: Secure Checkout */}
                    {step === 4 && (
                        <div className="form-page">
                            <h2>Final Step: Secure Checkout</h2>
                            <p className='warning' style={{ textAlign: 'center', marginBottom: '20px'}}>
                                Please complete your registration payment. Your application will process automatically once payment is finalized.
                            </p>
                            <div className='checkout'>
                                <div className="checkout-summary">
                                    <h3>Summary</h3>
                                    <p><strong>Name:</strong> {values.firstName} {values.lastName}</p>
                                    <p><strong>Email:</strong> {values.playerEmail}, {values.parentEmail}</p>
                                    <p><strong>Tournament:</strong> {values.tournamentSelect}</p>
                                    <p><strong>Age:</strong> {values.ageGroup}</p>
                                    <p><strong>TOTAL: $235.00</strong></p>
                                </div>

                                <div className="checkout-payment">
                                    <div className="paypal-wrapper" style={{ width: '100%', textAlign: 'center', margin: '30px auto' }}>
                                        <div id="paypal-container-W4SYP3NQH2LCQ"></div>
                                    </div>

                                    <div style={{ textAlign: 'center', margin: '15px 0', fontWeight: 'bold' }}>
                                        {isPaid ? (
                                            <span style={{ color: '#27ae60' }}>🔄 Processing Automation... Please do not close window.</span>
                                        ) : (
                                            <span style={{ color: '#e74c3c' }}>⚠ Awaiting Secure Payment Completion...</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="button-row">
                                <button type="button" className="btn-back" onClick={prevStep} disabled={isPaid}>Back</button>
                                
                                <button 
                                    type='button' 
                                    className={`btn-submit ${isPaid ? 'btn-processing' : 'btn-disabled'}`}
                                    disabled={!isPaid}
                                >
                                    {isPaid ? "Processing..." : "Submit Registration"}
                                </button>
                            </div>
                        </div>
                    )}

                </form>
            </div>
        </div>
    )
}

export default Register