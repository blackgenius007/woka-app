import React from "react";

function Pricing() {
  return (
      
     <section className="pricing" id="pricing" style={{ padding: "50px 0", background: "#3b3054 url(../images/bg-boost-desktop.svg) no-repeat right", backgroundSize: "cover" }}>
     <div className="container" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" }}>
       <h2 style={{ color: "white", marginBottom: "20px" }}>Boost your links today</h2>
       <a href="#" className="btn btn-lg" style={{ display: "inline-block", color: "white", backgroundColor: "#2acfcf", textTransform: "capitalize", fontWeight: "700", border: "none", outline: "none", cursor: "pointer", borderRadius: "100px", transition: "0.3s", padding: "12px 36px" }}>Get Started</a>
     </div>
   </section>
  );
}

export default Pricing;
