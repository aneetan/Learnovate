import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import logoImage from "../assets/images/learno_logo.png";
import backgroundImage from "../assets/images/auth_bg.png";
import Toast from "../../components/common/Toast";
import Preloader from "../../components/common/Preloader";

const ForgotPasswordOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeOtpIdx, setActiveOtpIdx] = useState(0);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [otpTimer, setOtpTimer] = useState(120); // 2 minutes in seconds
  const [otpExpired, setOtpExpired] = useState(false);
  
  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    let interval;
    if (!otpExpired) {
      interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setOtpExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpExpired]);

  useEffect(() => {
    setOtpTimer(120);
    setOtpExpired(false);
    otpRefs[0].current && otpRefs[0].current.focus();
  }, []);

  const handleOtpChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) {
      setOtp((prev) => {
        const newOtp = [...prev];
        newOtp[idx] = "";
        return newOtp;
      });
      setActiveOtpIdx(idx);
      return;
    }
    setOtp((prev) => {
      const newOtp = [...prev];
      newOtp[idx] = val[0];
      return newOtp;
    });
    if (val && idx < 5) {
      otpRefs[idx + 1].current.focus();
      setActiveOtpIdx(idx + 1);
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (otp[idx]) {
        setOtp((prev) => {
          const newOtp = [...prev];
          newOtp[idx] = "";
          return newOtp;
        });
        setActiveOtpIdx(idx);
      } else if (idx > 0) {
        otpRefs[idx - 1].current.focus();
        setActiveOtpIdx(idx - 1);
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      otpRefs[idx - 1].current.focus();
      setActiveOtpIdx(idx - 1);
    } else if (e.key === "ArrowRight" && idx < 5) {
      otpRefs[idx + 1].current.focus();
      setActiveOtpIdx(idx + 1);
    } else if (e.key === "Tab") {
      setActiveOtpIdx(idx);
    }
  };

  const handleOtpPaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (paste.length > 0) {
      setOtp((prev) => {
        const newOtp = [...prev];
        for (let i = 0; i < paste.length; i++) {
          newOtp[i] = paste[i];
        }
        return newOtp;
      });
      setTimeout(() => {
        otpRefs[Math.min(paste.length, 5)].current.focus();
        setActiveOtpIdx(Math.min(paste.length, 5));
      }, 0);
    }
    e.preventDefault();
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (otpExpired) return;
    setLoading(true);
    setError("");
    const otpValue = otp.join("");
    setTimeout(() => {
      if (otpValue === "123456") {
        setShowSuccessToast(true);
        setTimeout(() => {
          setShowSuccessToast(false);
          navigate("/reset-password?token=demo123");
        }, 750);
      } else {
        setError("Invalid OTP. Please try again.");
      }
      setLoading(false);
    }, 1000);
  };

  const handleResendOtp = () => {
    setLoading(true);
    setError("");
    
    setTimeout(() => {
      setOtp(["", "", "", "", "", ""]);
      setError("");
      setLoading(false);
      setOtpTimer(120);
      setOtpExpired(false);
    }, 1000);
  };

  const handleBackToEmail = () => {
    navigate("/forgot-password");
  };

  return (
    <div
      className="flex justify-center items-center p-6 min-h-screen bg-cover bg-center relative font-sans"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{ backgroundColor: "var(--primary-color)" }}
      ></div>
      
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-10 w-full max-w-[550px] border border-gray-200 relative z-10 flex flex-col justify-center min-h-[70vh] mx-auto">
        {/* Preloader Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20 rounded-xl">
            <Preloader size="large" text="Please wait..." />
          </div>
        )}
        
        {/* Logo */}
        <div className="flex justify-center mb-2 -mt-15">
          <img src={logoImage} alt="Logo" className="h-44 object-contain" />
        </div>

        <h2 className="text-center -mt-10 mb-8 text-gray-900 font-bold text-2xl relative after:content-[''] after:absolute after:bottom-[-8px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-12 after:h-1 after:bg-[#26A69A] after:rounded-lg">
          Enter Code
        </h2>
        
        <p className="text-center text-gray-600 mb-8 -mt-4">
          We've sent a 6-digit code to <span className="font-semibold text-gray-700">{email}</span>
        </p>
        
        <form onSubmit={handleOtpSubmit} className="flex flex-col">
          {error && (
            <div className="text-red-600 text-sm mb-4 text-center">
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-4 mb-7">
            <label htmlFor="otp" className="text-gray-700 text-base font-medium text-left">
              6-digit Code
            </label>
            <div className="flex justify-center gap-3 mt-1">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={otpRefs[idx]}
                  type="tel"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, idx)}
                  onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                  aria-label={`OTP digit ${idx + 1}`}
                  onPaste={idx === 0 ? handleOtpPaste : undefined}
                  className={`w-12 h-14 text-center border-b-2 border-gray-300 bg-transparent text-2xl font-mono font-semibold focus:border-[#26A69A] outline-none transition-all duration-200 rounded-none shadow-none ${activeOtpIdx === idx ? 'border-[#26A69A]' : ''}`}
                  style={{ letterSpacing: '0.1em' }}
                />
              ))}
            </div>
            <p className="text-xs text-gray-400 text-center mt-1">
              Demo code: <span className="font-mono">123456</span>
            </p>
            <p className={`text-xs text-center mt-2 font-medium ${otpExpired ? 'text-red-500' : 'text-gray-500'}`}
            >
              {otpExpired
                ? 'Code expired. Resend code to try again.'
                : `Code expires in ${Math.floor(otpTimer / 60)}:${(otpTimer % 60).toString().padStart(2, '0')}`}
            </p>
          </div>
          
          <button
            type="submit"
            className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-[var(--primary-dark)] hover:-translate-y-1 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed w-full"
            disabled={loading || otpExpired}
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </form>
        
        <div className="flex flex-col items-center gap-2 mt-6">
          <button
            onClick={handleResendOtp}
            disabled={loading || !otpExpired}
            className="text-[#26A69A] text-sm font-medium hover:underline disabled:text-gray-400 bg-transparent border-none outline-none cursor-pointer"
            type="button"
          >
            {loading ? "Sending..." : "Resend Code"}
          </button>
          <button
            onClick={handleBackToEmail}
            className="text-gray-500 text-sm font-medium hover:underline bg-transparent border-none outline-none cursor-pointer"
            type="button"
          >
            Entered wrong email? Go Back
          </button>
        </div>
      </div>
      
      {/* Toast */}
      <Toast
        message="OTP Verified Successfully! Redirecting to password reset..."
        type="success"
        show={showSuccessToast}
        duration={750}
        onClose={() => setShowSuccessToast(false)}
      />
    </div>
  );
};

export default ForgotPasswordOtp; 