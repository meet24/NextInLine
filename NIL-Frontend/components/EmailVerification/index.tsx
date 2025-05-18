import React, { useState } from "react";
import EmailInput from "./EmailInput";
import OtpInput from "./OtpInput";

export default function EmailVerification({
  email,
  onVerified,
}: {
  email: string;
  onVerified: () => void;
}) {
  const [step, setStep] = useState<"send" | "verify">("send");

  return (
    <>
      {step === "send" ? (
        <EmailInput email={email} onSent={() => setStep("verify")} />
      ) : (
        <OtpInput email={email} onVerified={onVerified} />
      )}
    </>
  );
}
