import { useState } from "react";
import "../Style/FatPercentage.css";
import "../Style/BMI.css";
import InputBox from "../component/InputBox";

function BMR() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [freqE, setFreqE] = useState("");
  const [BMR, setBMR] = useState("");
  const [resetFlag, setResetFlag] = useState(false);
  
  //
  const [validationStatus, setValidationStatus] = useState({
    height: true,
    width: true,
    gendeer: true,
  });

  const handleValidation = (dataType, isValid) => {
    setValidationStatus((prevStatus) => ({
      ...prevStatus,
      [dataType]: isValid,
    }));
  };
  //

  const clearFields = () => {
    document.getElementById('bodyFatBar').style.display = 'none';
    setGender("");
    setBMR("");
    setResetFlag(prev => !prev);
  };

  const BMRCal = () => {
    if(gender === 'M') {
        setBMR("BMR: " + ((66 + (13.7*weight) + (5*height) - (6.8*age))*freqE) + " Calories");
    }else if(gender === 'F'){
        setBMR("BMR: " + ((665 + (9.6*weight) + (1.8*height) - (4.7*age))*freqE) + " Calories");
    }else{
        setBMR("");
    }
  };

  return (
    <div className="content-container mt-3">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="crd-header">Let's calculate Your BMR</div>
            <div className="card-body">
            <InputBox
                laBel="Height"
                placeholder="Enter height"
                dataType="height"
                handleValidation={handleValidation}
                validationStatus={validationStatus}
                setValue={setHeight}
                reset={resetFlag}
              />
              <InputBox
                laBel="Weight"
                placeholder="Enter weight"
                dataType="weight"
                handleValidation={handleValidation}
                validationStatus={validationStatus}
                setValue={setWeight}
                reset={resetFlag}
              />
              <div className="row mb-3">
              <div className="col">
                  <InputBox
                    laBel="Age"
                    placeholder="Enter age"
                    dataType="age"
                    handleValidation={handleValidation}
                    validationStatus={validationStatus}
                    setValue={setAge}
                    reset={resetFlag}
                  />
                </div>

                <div className="col">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <select
                    className="form-select"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>

                <div className="col">
                  <label htmlFor="freq" className="form-label">
                    Frequency Exercise
                  </label>
                  <select
                    className="form-select"
                    id="freq"
                    value={freqE}
                    onChange={(e) => setFreqE(e.target.value)}
                  >
                    <option value="1.2">none</option>
                    <option value="1.375">1-3 per week</option>
                    <option value="1.55">3-5 per week</option>
                    <option value="1.725">5-7 per week</option>
                    <option value="1.9">sportsperson</option>
                  </select>
                </div>

              </div>

              <div className="d-grid gap-2">
                <p>
                  <button className="button button-calc" type="button" disabled={Object.values(validationStatus).includes(false) || gender === ""} onClick={BMRCal}>
                    Calculate
                  </button>
                  <button className="button button-clear" type="button" onClick={clearFields}>
                    Clear
                  </button>
                </p>
              </div>
            </div>
          </div>
          
          <center className="mt-4">{BMR}</center>

          <div id="bodyFatBar">
            <div className="barSegment underweight" id="underweight"></div>
            <div className="barSegment healthy" id="healthy"></div>
            <div className="barSegment overweight" id="overweight"></div>
            <div className="barSegment obese" id="obese"></div>
            <div id="marker"></div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="crd-header">Right Side Content</div>
            <div className="card-body card-body-center">
              <img
                src="https://www-assets.withings.com/pages/health-insights/about-body-fat/media/body-fat-chart-w-mobile.png"
                alt="Additional Content"
                style={{ width: "60%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BMR;
