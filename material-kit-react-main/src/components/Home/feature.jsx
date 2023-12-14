/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
const MoreFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  padding: 80px 0 90px 0;

  @media (max-width: 666px) {
    gap: 80px;
  }

  @media (max-width: 280px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

const Features = styled.div`
  position: relative;
  background: white;
  border-radius: 6px;
`;

const FeatureIllustration = styled.div`
  position: absolute;
  top: -32.5px;
  left: 25px;
  display: grid;
  place-items: center;
  width: 65px;
  height: 65px;
  background: #3b3054;
  border-radius: 50%;

  @media (max-width: 666px) {
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 80px;
  }
`;

const FeatureImage = styled.img`
  max-width: 50%;
`;

const FeatureDetails = styled.div`
  padding: 0 25px 30px;
  margin-top: 60px;

  @media (max-width: 666px) {
    text-align: center;
    margin-top: 80px;
  }

  @media (max-width: 280px) {
    padding: 0 20px 25px;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 20px;

  @media (max-width: 280px) {
    font-size: 18px;
  }
`;

const FeatureDescription = styled.p`
  margin-top: 10px;
  font-size: 14px;
`;

function Feature() {
  return (
    <main
      style={{
        fontFamily: "'Poppins', sans-serif, 'Segoe UI', Tahoma, Geneva, Verdana",
        fontSize: '16px',
      }}
    >
    <section
  className="features"
  id="features"
  style={{ marginTop: '100px', backgroundColor: '#eff0f5' }}
>
  <div className="container">
    {/* Short URL Feature */}
    <div
      className="url-shorten-feature"
      style={{
        width: '100%',
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        background: '#3b3054 url(../images/bg-shorten-desktop.svg) no-repeat right top',
        backgroundSize: 'cover',
        padding: '45px',
        borderRadius: '6px',
        marginBottom: '20px',
        transform: 'translateY(-50%)',
        transition: 'gap 0.3s',
      }}
    >
      <div style={{ position: 'relative', flex: '1' }}>
        <input
          type="text"
          className="url-input"
          placeholder="Enter Data collector's passcode  ..."
          autoComplete="off"
          style={{
            width: '100%',
            fontFamily: "'Poppins', sans-serif, 'Segoe UI', Tahoma, Geneva, Verdana",
            fontSize: '18px',
            padding: '8px 20px',
            background: 'white',
            border: '2px solid transparent',
            borderRadius: '6px',
            outline: 'none',
            transition: '0.2s',
          }}
        />
        <span
          className="alert"
          style={{
            position: 'absolute',
            left: '0',
            top: 'calc(100% + 4px)',
            fontStyle: 'italic',
            fontSize: '16px',
            color: '#f46262',
            opacity: '0',
            transition: '0.2s opacity',
          }}
        ></span>
      </div>
      <button
        type="submit"
        className="btn btn-lg btn-plus-icon"
        style={{
          textAlign: 'center',
          borderRadius: 'inherit',
          whiteSpace: 'nowrap',
          fontSize: '20px',  // Adjust the size as needed
          cursor: 'pointer',
          color: 'white',    // Set the text color to white
          backgroundColor: '#2acfcf',
        }}
      >
        Connect!
      </button>
    </div>
    <div className="url-shorten-results"></div>
  </div>

  {/* Advanced Features */}
  <MoreFeatures>
    <div className="section-header" style={{ textAlign: 'center' }}>
      <h2 style={{ fontSize: '35px', color: '#35323e' }}>Advanced Statistics</h2>
      <p style={{ width: '50%', margin: '7px auto 0', fontSize: '16px' }}>
        Track how your links are performing across the web with our advanced statistics
        dashboard.
      </p>
    </div>
    <div className="more-features-content">
    <FeatureWrapper>
      <FeatureIllustration>
        <FeatureImage
          src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-brand-recognition.svg"
          alt="Feature Illustration Icon"
        />
      </FeatureIllustration>
      <FeatureDetails>
        <FeatureTitle>Brand Recognition</FeatureTitle>
        <FeatureDescription>
          Boost your brand recognition with each click. Generic links don’t mean a thing.
          Branded links help instil confidence in your content.
        </FeatureDescription>
      </FeatureDetails>
    </FeatureWrapper>
    <FeatureWrapper>
      <FeatureIllustration>
        <FeatureImage
          src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-detailed-records.svg"
          alt="Feature Illustration Icon"
        />
      </FeatureIllustration>
      <FeatureDetails>
        <FeatureTitle>Detailed Records</FeatureTitle>
        <FeatureDescription>
          Gain insights into who is clicking your links. Knowing when and where people
          engage with your content helps inform better decisions.
        </FeatureDescription>
      </FeatureDetails>
    </FeatureWrapper>
    <FeatureWrapper>
      <FeatureIllustration>
        <FeatureImage
          src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-fully-customizable.svg"
          alt="Feature Illustration Icon"
        />
      </FeatureIllustration>
      <FeatureDetails>
        <FeatureTitle>Fully Customizable</FeatureTitle>
        <FeatureDescription>
          Improve brand awareness and content discoverability through customizable links,
          supercharging audience engagement.
        </FeatureDescription>
      </FeatureDetails>
    </FeatureWrapper>
  </div> 
  
  </MoreFeatures>
</section>;
    </main>
  );
}

export default Feature;









// /* eslint-disable */
// import React from 'react';


// function Feature() {
//   return (
//     <main
//       style={{
//         fontFamily: "'Poppins', sans-serif, 'Segoe UI', Tahoma, Geneva, Verdana",
//         fontSize: '16px',
//       }}
//     >
//       <section
//         className="features"
//         id="features"
//         style={{ marginTop: '100px', backgroundColor: '#eff0f5' }}
//       >
//         <div className="container">
//           {/* Short URL Feature */}
//           <div
//             className="url-shorten-feature"
//             style={{
//               width: '100%',
//               display: 'flex',
//               gap: '20px',
//               flexWrap: 'wrap',
//               background: '#3b3054 url(../images/bg-shorten-desktop.svg) no-repeat right top',
//               backgroundSize: 'cover',
//               padding: '45px',
//               borderRadius: '6px',
//               marginBottom: '20px',
//               transform: 'translateY(-50%)',
//               transition: 'gap 0.3s',
//             }}
//           >
//             <div style={{ position: 'relative', flex: '1' }}>
//               <input
//                 type="text"
//                 className="url-input"
//                 placeholder="Enter Data collector's passcode  ..."
//                 autoComplete="off"
//                 style={{
//                   width: '100%',
//                   fontFamily: "'Poppins', sans-serif, 'Segoe UI', Tahoma, Geneva, Verdana",
//                   fontSize: '18px',
//                   padding: '8px 20px',
//                   background: 'white',
//                   border: '2px solid transparent',
//                   borderRadius: '6px',
//                   outline: 'none',
//                   transition: '0.2s',
//                 }}
//               />
//               <span
//                 className="alert"
//                 style={{
//                   position: 'absolute',
//                   left: '0',
//                   top: 'calc(100% + 4px)',
//                   fontStyle: 'italic',
//                   fontSize: '16px',
//                   color: '#f46262',
//                   opacity: '0',
//                   transition: '0.2s opacity',
//                 }}
//               ></span>
//             </div>
//             <button
//   type="submit"
//   className="btn btn-lg btn-plus-icon"
//   style={{
//     textAlign: 'center',
//     borderRadius: 'inherit',
//     whiteSpace: 'nowrap',
//     fontSize: '20px',  // Adjust the size as needed
//     cursor: 'pointer',
//     color: 'white',    // Set the text color to white
//     backgroundColor: '#2acfcf',
//   }}
// >
//   Connect!
// </button>
//           </div>
//           <div className="url-shorten-results"></div>
//         </div>
//         {/* Advanced Features */}
//         <div
//           className="more-features"
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//             gap: '25px',
//             padding: '80px 0 90px 0',
//           }}
//         >
//           <div className="section-header" style={{ textAlign: 'center' }}>
//             <h2 style={{ fontSize: '35px', color: '#35323e' }}>Advanced Statistics</h2>
//             <p style={{ width: '50%', margin: '7px auto 0', fontSize: '16px' }}>
//               Track how your links are performing across the web with our advanced statistics
//               dashboard.
//             </p>
//           </div>
//           <div className="more-features-content">
//             <div
//               className="feature"
//               style={{ position: 'relative', background: 'white', borderRadius: '6px' }}
//             >
//               <div
//                 className="feature-illustration"
//                 style={{
//                   position: 'absolute',
//                   top: '-32.5px',
//                   left: '25px',
//                   display: 'grid',
//                   placeItems: 'center',
//                   width: '65px',
//                   height: '65px',
//                   background: '#3b3054',
//                   borderRadius: '50%',
//                 }}
//               >
//                 <img
//                   src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-brand-recognition.svg"
//                   alt="Feature Illustration Icon"
//                   style={{ maxWidth: '50%' }}
//                 />
//               </div>
//               <div
//                 className="feature-details"
//                 style={{ padding: '0 25px 30px', marginTop: '60px' }}
//               >
//                 <h3 style={{ fontSize: '20px' }}>Brand Recognition</h3>
//                 <p style={{ margin: '10px 0 29.41176px', fontSize: '14px' }}>
//                   Boost your brand recognition with each click. Generic links don’t mean a thing.
//                   Branded links help instil confidence in your content.
//                 </p>
//               </div>
//             </div>
//             <div
//               className="feature"
//               style={{ position: 'relative', background: 'white', borderRadius: '6px' }}
//             >
//               <div
//                 className="feature-illustration"
//                 style={{
//                   position: 'absolute',
//                   top: '-32.5px',
//                   left: '25px',
//                   display: 'grid',
//                   placeItems: 'center',
//                   width: '65px',
//                   height: '65px',
//                   background: '#3b3054',
//                   borderRadius: '50%',
//                 }}
//               >
//                 <img
//                   src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-detailed-records.svg"
//                   alt="Feature Illustration Icon"
//                   style={{ maxWidth: '50%' }}
//                 />
//               </div>
//               <div
//                 className="feature-details"
//                 style={{ padding: '0 25px 30px', marginTop: '60px' }}
//               >
//                 <h3 style={{ fontSize: '20px' }}>Detailed Records</h3>
//                 <p style={{ margin: '10px 0 29.41176px', fontSize: '14px' }}>
//                   Gain insights into who is clicking your links. Knowing when and where people
//                   engage with your content helps inform better decisions.
//                 </p>
//               </div>
//             </div>
//             <div
//               className="feature"
//               style={{ position: 'relative', background: 'white', borderRadius: '6px' }}
//             >
//               <div
//                 className="feature-illustration"
//                 style={{
//                   position: 'absolute',
//                   top: '-32.5px',
//                   left: '25px',
//                   display: 'grid',
//                   placeItems: 'center',
//                   width: '65px',
//                   height: '65px',
//                   background: '#3b3054',
//                   borderRadius: '50%',
//                 }}
//               >
//                 <img
//                   src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-fully-customizable.svg"
//                   alt="Feature Illustration Icon"
//                   style={{ maxWidth: '50%' }}
//                 />
//               </div>
//               <div
//                 className="feature-details"
//                 style={{ padding: '0 25px 30px', marginTop: '60px' }}
//               >
//                 <h3 style={{ fontSize: '20px' }}>Fully Customizable</h3>
//                 <p style={{ margin: '10px 0 29.41176px', fontSize: '14px' }}>
//                   Improve brand awareness and content discoverability through customizable links,
//                   supercharging audience engagement.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

// export default Feature;
