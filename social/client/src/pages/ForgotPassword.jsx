import React, { useState } from "react";
import logo from "../assets/socialLogo.png";
import logo2 from "../assets/logo2.png";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div
      className="
        w-full min-h-screen 
        bg-[radial-gradient(1200px_800px_at_10%_-10%,#f58529_0%,transparent_35%),radial-gradient(1200px_800px_at_110%_0%,#dd2a7b_0%,transparent_40%),radial-gradient(900px_700px_at_50%_110%,#8134af_0%,transparent_45%),linear-gradient(180deg,#515bd4,#8134af)]
        flex items-center justify-center
      "
    >
      <div className="w-[95%] lg:max-w-[60%] h-[600px] rounded-2xl flex justify-center items-center overflow-hidden">
        {/* LEFT (form) */}
        <div
          className="
            w-full lg:w-1/2 h-full 
            bg-white 
            flex flex-col items-center justify-center
            px-6 sm:px-10 
            gap-5
            shadow-[0_10px_40px_rgba(0,0,0,0.2)]
          "
        >
          {/* Header */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <img src={logo} alt="" className="w-[96px] object-contain" />
            <h2 className="text-lg font-semibold text-neutral-700">
              Forgot Password
            </h2>
          </div>

          {/* Step 1: Email */}
          {step === 1 && (
            <div className="w-full flex flex-col items-center gap-3">
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-[95%] h-[44px] px-3 rounded-md border border-neutral-300 bg-neutral-50 text-neutral-900 text-sm focus:outline-none focus:border-neutral-400"
                required
              />
              <button
                className="
                  w-[95%] h-[44px] mt-4 rounded-lg font-semibold 
                  bg-[#0095F6] text-white 
                  hover:bg-[#0086dd] active:scale-[0.99] transition
                  shadow-[0_6px_16px_rgba(0,149,246,0.35)]
                "
                onClick={() => setStep(2)}
              >
                Send OTP
              </button>
            </div>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <div className="w-full flex flex-col items-center gap-3">
              <input
                type="text"
                id="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-[95%] h-[44px] px-3 rounded-md border border-neutral-300 bg-neutral-50 text-neutral-900 text-sm focus:outline-none focus:border-neutral-400"
                required
              />
              {err && <p className="text-red-500 text-sm">{err}</p>}
              <button
                className="
                  w-[95%] h-[44px] mt-4 rounded-lg font-semibold 
                  bg-[#0095F6] text-white 
                  hover:bg-[#0086dd] active:scale-[0.99] transition
                  shadow-[0_6px_16px_rgba(0,149,246,0.35)]
                "
                disabled={loading}
                onClick={() => setStep(3)}
              >
                Verify OTP
              </button>
            </div>
          )}

          {/* Step 3: Reset Password */}
          {step === 3 && (
            <div className="w-full flex flex-col items-center gap-3">
              <input
                type="password"
                id="newPassword"
                placeholder="New Password"
                className="w-[95%] h-[44px] px-3 rounded-md border border-neutral-300 bg-neutral-50 text-neutral-900 text-sm focus:outline-none focus:border-neutral-400"
                required
              />
              <input
                type="password"
                id="confirmNewPassword"
                placeholder="Confirm New Password"
                className="w-[95%] h-[44px] px-3 rounded-md border border-neutral-300 bg-neutral-50 text-neutral-900 text-sm focus:outline-none focus:border-neutral-400"
                required
              />
              <button
                className="
                  w-[95%] h-[44px] mt-4 rounded-lg font-semibold 
                  bg-[#0095F6] text-white 
                  hover:bg-[#0086dd] active:scale-[0.99] transition
                  shadow-[0_6px_16px_rgba(0,149,246,0.35)]
                "
              >
                Reset Password
              </button>
            </div>
          )}
        </div>

        {/* RIGHT (promo panel) */}
        <div
          className="
            md:w-1/2 h-full hidden lg:flex flex-col items-center justify-center 
            bg-white/10 backdrop-blur-[1px]
            text-white font-semibold
          "
        >
          <img
            src={logo2}
            alt=""
            className="w-[42%] drop-shadow-[0_10px_28px_rgba(0,0,0,0.25)]"
          />
          <p className="mt-4 text-white/95">
            ScalerGram - Scaling Connections
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
