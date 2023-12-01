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

  const [displayImage, setDisplayImage] = useState(null);
  const [displayAlt, setdisplayAlt] = useState(null);

  //
  const [validationStatus, setValidationStatus] = useState({});

  const handleValidation = (dataType, isValid) => {
    setValidationStatus((prevStatus) => ({
      ...prevStatus,
      [dataType]: isValid,
    }));
  };
  //

  const clearFields = () => {
    document.getElementById("bodyFatBar").style.display = "none";
    setGender("");
    setFatpercent("");
    setDisplayImage(null);
    setdisplayAlt(null);
    setResetFlag((prev) => !prev);
  };

  const FatCal = () => {
    let h = height / 100;
    let bmi = weight / (h * h);
    let G = gender === "M" ? 16.2 : 5.4;
    let calculatedFatPercent = (1.2 * bmi + 0.23 * age - G).toFixed(2);

    if (calculatedFatPercent > 0){
      setFatpercent("FatPercentage: " + (1.2 * bmi + 0.23 * age - G).toFixed(2) + "%");
      
      // Display body fat range bar when function ran
      document.getElementById("bodyFatBar").style.display = "flex";
    }
    else{
      setFatpercent("Please Enter Valid Input");
      document.getElementById("bodyFatBar").style.display = "none";
    }

    // Get Fat Percent to calculate marker position
    const markerPosition = Math.min(
      (1.2 * bmi + 0.23 * age - G).toFixed(2) * 2,
      100
    );

    // Set marker position on body fat range bar
    document.getElementById("marker").style.left = `${markerPosition}%`;

    // Change flex depend on gender
    // Reference ranges: https://tanita.eu/blog/healthy-body-fat-percentage
    if (gender === "M") {
      document.getElementById("underweight").style.flex = 20;
      document.getElementById("healthy").style.flex = 24;
      document.getElementById("overweight").style.flex = 12;
      document.getElementById("obese").style.flex = 44;
    } else {
      // Reset flex values if gender is not "M"
      document.getElementById("underweight").style.flex = 46;
      document.getElementById("healthy").style.flex = 23;
      document.getElementById("overweight").style.flex = 11;
      document.getElementById("obese").style.flex = 20;
    }

    if (gender === "M") {
      if (calculatedFatPercent <= 0) {
        setDisplayImage(require("../img/bodyfat/sk.png"));
        setdisplayAlt("sk.png");
      } else if (calculatedFatPercent <= 15) {
        setDisplayImage(require("../img/bodyfat/m1.png"));
        setdisplayAlt("m1.png");
      } else if (calculatedFatPercent <= 20) {
        setDisplayImage(require("../img/bodyfat/m2.png"));
        setdisplayAlt("m2.png");
      } else if (calculatedFatPercent <= 30) {
        setDisplayImage(require("../img/bodyfat/m3.png"));
        setdisplayAlt("m3.png");
      } else if (calculatedFatPercent <= 40) {
        setDisplayImage(require("../img/bodyfat/m4.png"));
        setdisplayAlt("m4.png");
      } else if (calculatedFatPercent <= 50) {
        setDisplayImage(require("../img/bodyfat/m5.png"));
        setdisplayAlt("m5.png");
      } else {
        setDisplayImage(require("../img/bodyfat/m6.png"));
        setdisplayAlt("m6.png");
      }
    } else {
      if (calculatedFatPercent <= 5) {
        setDisplayImage(require("../img/bodyfat/sk.png"));
        setdisplayAlt("sk.png");
      } else if (calculatedFatPercent <= 15) {
        setDisplayImage(require("../img/bodyfat/f1.png"));
        setdisplayAlt("f1.png");
      } else if (calculatedFatPercent <= 30) {
        setDisplayImage(require("../img/bodyfat/f2.png"));
        setdisplayAlt("f2.png");
      } else if (calculatedFatPercent <= 35) {
        setDisplayImage(require("../img/bodyfat/f3.png"));
        setdisplayAlt("f3.png");
      } else if (calculatedFatPercent <= 45) {
        setDisplayImage(require("../img/bodyfat/f4.png"));
        setdisplayAlt("f4.png");
      } else if (calculatedFatPercent <= 50) {
        setDisplayImage(require("../img/bodyfat/f5.png"));
        setdisplayAlt("f5.png");
      } else {
        setDisplayImage(require("../img/bodyfat/f6.png"));
        setdisplayAlt("f6.png");
      }
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
                  <button
                    className="button button-calc"
                    type="button"
                    disabled={
                      Object.values(validationStatus).includes(false) ||
                      gender === "" ||
                      height === "" ||
                      weight === "" ||
                      age === ""
                    }
                    onClick={FatCal}
                  >
                    Calculate
                  </button>
                  <button
                    className="button button-clear"
                    type="button"
                    onClick={clearFields}
                  >
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
        {/* Display pic based to fat percentage and gender. */}
        <div className="col-md-6">
          <div className="card">
            <div className="crd-header">Display สรีระ</div>
            <div className="card-body card-body-center">
              <img
                src={displayImage}
                alt={displayAlt}
                style={{ width: "auto", height: "95%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FatPercentage;
