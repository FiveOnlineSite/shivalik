import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import GradientLineTwo from '../atoms/GradientLineTwo';
import GradientLine from '../atoms/GradientLine';

const EMICalculatorBox = () => {
// States
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureValue, setTenureValue] = useState(10);
  const [tenureType, setTenureType] = useState("year");
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [chartData, setChartData] = useState([50, 50]);

  // Toggle tenure type and clear input
  const handleTenureToggle = (type) => {
    if (type !== tenureType) {
      setTenureType(type);
      setTenureValue(""); // clear input when switching
    }
  };

  // EMI Calculation
  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n =
      tenureType === "year"
        ? parseInt(tenureValue) * 12
        : parseInt(tenureValue);

    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r < 0 || n <= 0) return;

    const emiCalc =
      r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emiCalc * n;
    const interest = totalPay - P;

    setEmi(emiCalc.toFixed(0));
    setTotalInterest(interest.toFixed(0));
    setTotalPayment(totalPay.toFixed(0));
    setChartData([
      parseFloat(((P / totalPay) * 100).toFixed(2)),
      parseFloat(((interest / totalPay) * 100).toFixed(2)),
    ]);
  };

  // Watch for changes
  useEffect(() => {
    if (loanAmount && interestRate && tenureValue) {
      calculateEMI();
    }
  }, [loanAmount, interestRate, tenureValue, tenureType]);

  // Chart Options
  const chartOptions = {
    chart: {
      type: "pie",
      height: 300,
    },
    labels: ["Principal Loan Amount", "Total Interest"],
    colors: ["#F58634", "#191E3F"],
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -30,
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `${val.toFixed(2)}%`;
      },
      style: {
        fontSize: "14px",
        fontWeight: 500,
        colors: ["#fff"],
      },
      dropShadow: {
        enabled: false,
      },
    },
    legend: {
      position: "bottom",
      markers: {
        width: 12,
        height: 12,
        shape: "square",
      },
    },
    title: {
      text: "Break-up of Total Payment",
      align: "center",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
  };

  // Handlers with Validation
  const handleLoanChange = (e) => {
    let value = e.target.value.replace(/^0+/, "");
    if (/^\d{0,10}$/.test(value) && parseInt(value || "0") <= 1000000000) {
      setLoanAmount(value);
    }
  };

  const handleInterestChange = (e) => {
    let value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) && parseFloat(value || "0") <= 100) {
      setInterestRate(value);
    }
  };

  const handleTenureChange = (e) => {
    let value = e.target.value.replace(/^0+/, "");
    if (tenureType === "year") {
      if (/^\d{0,2}$/.test(value) && parseInt(value || "0") <= 50) {
        setTenureValue(value);
      }
    } else {
      if (/^\d{0,3}$/.test(value) && parseInt(value || "0") <= 600) {
        setTenureValue(value);
      }
    }
  };

  return (
    <>
<section className="pt-5 pb-5 emi_calc_section">
      <div className="container">
        <GradientLineTwo />
        <h1 className="sta-head-one">EMI Calculator</h1>
        <div className="box-first">
          <div className="row align-items-start">

            {/* Left: Inputs + Sliders */}
            <div className="col-lg-5">
              <div className="formCal-one">
                <GradientLine />
                <h3 className="mb-3">Calculator</h3>

                {/* Loan Amount */}
                <div className="row">
                    <div className="col-6">
                      <label>Loan Amount (₹)</label>
                    </div>
                    <div className="col-6">
                        <input
                        type="number"
                        className="form-control mb-2"
                        value={loanAmount}
                        onChange={handleLoanChange}
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
                        }}
                      />
                    </div>
                    <div className="col-12">
                     <input
                        type="range"
                        className="slider"
                        min={100000}
                        max={1000000000}
                        step={50000}
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                        style={{
                          '--progress': `${((loanAmount - 100000) / (1000000000 - 100000)) * 100}%`
                        }}
                      />
                    </div>
                </div>
               
                <div className="mt-4">
                  <div className="row">
                    <div className="col-6">
                     <label className="mb-2">Interest Rate (%)</label>
                    </div>

                    <div className="col-6">
                      <input
                        type="number"
                        className="form-control mb-2"
                        value={interestRate}
                        onChange={handleInterestChange}
                        step="0.1"
                        max="100"
                        onKeyDown={(e) => {
                          if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
                        }}
                      />
                    </div>
                    <div className="col-12">
                     <input
                        type="range"
                        className="slider"
                        min={0}
                        max={20}
                        step={0.1}
                        value={interestRate}
                        onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                        style={{
                          '--progress': `${(interestRate / 20) * 100}%`
                        }}
                      />


                    </div>
                  </div>
                </div>
                
                
                
                {/* Tenure */}
                <label className="mt-3">Tenure</label>
                <div className="input-group mb-2">
                    <button
                    className={`input-group-text ${
                      tenureType === "year" ? "active-btn" : ""
                    }`}
                    onClick={() => handleTenureToggle("year")}
                  >
                    Year
                  </button>
                  <button
                    className={`input-group-text ${
                      tenureType === "month" ? "active-btn" : ""
                    }`}
                    onClick={() => handleTenureToggle("month")}
                  >
                    Month
                  </button>
                  <input
                    type="number"
                    className="form-control"
                    value={tenureValue}
                    onChange={handleTenureChange}
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
                    }}
                  />
                </div>
                {/* <input
                  type="range"
                  min={tenureType === 'year' ? 1 : 1}
                  max={tenureType === 'year' ? 30 : 360}
                  value={tenureValue}
                  onChange={(e) => setTenureValue(e.target.value)}
                /> */}
                 <small className="text-muted">
                  {tenureType === "year"
                    ? "Max 50 Years"
                    : "Max 600 Months"}
                </small>
              </div>
            </div>

            {/* Middle: EMI Details */}
            <div className="col-lg-3 mt-4">
              <div className="ps-lg-4">
                <h5>Loan EMI</h5>
                <p>₹ {parseInt(emi).toLocaleString('en-IN')}</p>
                <h5>Total Interest Payable</h5>
                <p>₹ {parseInt(totalInterest).toLocaleString('en-IN')}</p>
                <h5>Total Payment</h5>
                <p>₹ {parseInt(totalPayment).toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Right: Pie Chart */}
            <div className="col-lg-4 mt-4">
              <Chart
                key={chartData.join("-")}
                options={chartOptions}
                series={chartData}
                type="pie"
                height={300}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default EMICalculatorBox