import { useState } from "react";
import "../Style/FatPercentage.css";
import "../Style/BMI.css";
import InputBox from "../component/InputBox";

function FatPercentage() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [fatPercent, setFatpercent] = useState("");
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
    setFatpercent("");
    setResetFlag(prev => !prev);
  };

  const FatCal = () => {
    let h = height / 100;
    let bmi = weight / (h * h);
    let G = gender === "M" ? 16.2 : 5.4;

    setFatpercent("FatPercentage: " + (((1.2 * bmi) + (0.23 * age) - G).toFixed(2)) + "%") ;

    // Get Fat Percent to calculate marker position
    const markerPosition = Math.min((((1.2 * bmi) + (0.23 * age) - G).toFixed(2))*2, 100);

    // Set marker position on body fat range bar
    document.getElementById('marker').style.left = `${markerPosition}%`;

    // Display body fat range bar when function ran
    document.getElementById('bodyFatBar').style.display = 'flex';

    // Change flex depend on gender 
    // Reference ranges: https://tanita.eu/blog/healthy-body-fat-percentage
    if (gender === "M") {
      document.getElementById('underweight').style.flex = 20;
      document.getElementById('healthy').style.flex = 24;
      document.getElementById('overweight').style.flex = 12;
      document.getElementById('obese').style.flex = 44;
    } else {
      // Reset flex values if gender is not "M"
      document.getElementById('underweight').style.flex = 46;
      document.getElementById('healthy').style.flex = 23;
      document.getElementById('overweight').style.flex = 11;
      document.getElementById('obese').style.flex = 20;
    }
  };

  return (
    <div className="content-container mt-3">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="crd-header">Let's calculate Your Body Fat</div>
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
              </div>

              <div className="d-grid gap-2">
                <p>
                  <button className="button button-calc" type="button" disabled={Object.values(validationStatus).includes(false) || gender === ""} onClick={FatCal}>
                    Calculate
                  </button>
                  <button className="button button-clear" type="button" onClick={clearFields}>
                    Clear
                  </button>
                </p>
              </div>
            </div>
          </div>
          
          <center className="mt-4">{fatPercent}</center>

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

export default FatPercentage;
