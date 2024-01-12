import React from "react";
import OtpInput from "react-otp-input";

function OTPInputLayout({ otpInput, setOtpInput }) {
  return (
    <OtpInput
      value={otpInput}
      onChange={setOtpInput}
      numInputs={4}
      isInputNum={true}
      inputType="number"
      renderSeparator={<span>&nbsp;&nbsp;</span>}
      renderInput={(props) => (
        <input
          {...props}
          style={{
            width: "2.25rem",
            height: "2.25rem",
            textAlign: "center",
            fontSize: "1.25rem",
            padding: "0.5rem",
            outline: "none",
          }}
        />
      )}
    />
  );
}

export default OTPInputLayout;
