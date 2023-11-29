import { useState } from "react";
import "../Style/BMI.css";
import "../Style/FatPercentage.css";
import InputBox from "../component/InputBox";

export default function BMI() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [message, setMessage] = useState("");
  const [bmi, setBMI] = useState("");

  //
  const [validationStatus, setValidationStatus] = useState({
    height: true,
    width: true,
  });

  const handleValidation = (dataType, isValid) => {
    setValidationStatus((prevStatus) => ({
      ...prevStatus,
      [dataType]: isValid,
    }));
  };
  //

  function calculateBMI() {
    const h = height / 100;
    const bmi = weight / (h * h);

    if (bmi < 16) {
      setMessage("Severe Thinness. ");
      setBMI("Your BMI is " + bmi.toFixed(2));
    } else if (bmi >= 16 && bmi < 17) {
      setMessage("Moderate Thinness. ");
      setBMI("Your BMI is " + bmi.toFixed(2));
    } else if (bmi >= 17 && bmi < 18.5) {
      setMessage("Mild Thinness. ");
      setBMI("Your BMI is " + bmi.toFixed(2));
    } else if (bmi >= 18.5 && bmi < 25) {
      setMessage("Healthy weight. ");
      setBMI("Your BMI is " + bmi.toFixed(2));
    } else if (bmi >= 25 && bmi < 30) {
      setMessage("Overweight. ");
      setBMI("Your BMI is " + bmi.toFixed(2));
    } else if (bmi >= 30 && bmi < 35) {
      setMessage("Obese Class I. ");
      setBMI("Your BMI is " + bmi.toFixed(2));
    } else if (bmi >= 35 && bmi < 40) {
      setMessage("Obese Class II. ");
      setBMI("Your BMI is " + bmi.toFixed(2));
    } else if (bmi >= 40) {
      setMessage("Obese Class III. ");
      setBMI("Your BMI is " + bmi.toFixed(2));
    }
  }

  return (
    <div className="app">
      <h1>BMI Calculator</h1>
      <span>
        Let's calculate your Body Mass Index. <br></br> Type the values below
      </span>

      <div className="area-input" >
        <InputBox
          dataType="height"
          placeholder={"Height (in cm)"}
          setValue={setHeight}
          handleValidation={handleValidation}
          validationStatus={validationStatus}
        />
        <InputBox
          dataType="weight"
          placeholder={"Weight (in kg)"}
          setValue={setWeight}
          handleValidation={handleValidation}
          validationStatus={validationStatus}
        />

        <button className="button button-calc" onClick={calculateBMI} disabled={Object.values(validationStatus).includes(false)}>
          Calculate
        </button>
      </div>
      <h2>
        {message} {bmi}
      </h2>
    </div>
  );
}
