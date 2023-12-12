  /* eslint-disable */
 /* eslint-disable */
import React from 'react';
import { Typography } from '@mui/material';

function Hero() {
  return (
    <main
      style={{
        fontFamily: "'Poppins', sans-serif, 'Segoe UI', Tahoma, Geneva, Verdana",
        fontSize: '16px',
        backgroundColor: 'white', // Add this line to set a white background
      }}
    >
      <style>
        {`
          @media (max-width: 768px) {
            .landing-text {
              padding: 0 20px; /* Adjust padding for better visibility */
            }
            .MuiTypography-h1 {
              font-size: 2.5em; /* Adjust font size for better visibility */
              line-height: 1.2; /* Adjust line height for better visibility */
              margin-bottom: 10px; /* Add margin for better spacing */
            }
            .MuiTypography-body1 {
              font-size: 16px; /* Adjust font size for better visibility */
              margin-bottom: 20px; /* Add margin for better spacing */
            }
            .landing {
              flex-direction: column; /* Adjust flex direction for stacking on smaller screens */
              align-items: flex-start; /* Align items to the start on smaller screens */
            }
            .landing-image {
              margin-top: 20px; /* Add margin for better spacing between text and image on smaller screens */
            }
          }
        `}
      </style>
      <section
        className="landing"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '40px 0',
          marginLeft: '11%',
          overflowX: 'hidden',
        }}
      >
        <div className="landing-text" style={{ flex: 1, minWidth: '465px' }}>
          <Typography variant="h1">
            Seamless efficiency, all-in-one solution.
          </Typography>
          <Typography variant="body1">
            Streamline employee management, innovate inventory, breeze through procurement. Elevate
            your operations effortlessly.
          </Typography>
          <a
            href="#url-shorten-form"
            className="btn btn-lg"
            style={{
              display: 'inline-block',
              color: 'white',
              backgroundColor: '#2acfcf',
              textTransform: 'capitalize',
              fontWeight: '700',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              borderRadius: '100px',
              transition: '0.3s',
              padding: '12px 36px',
            }}
          >
            Get Started
          </a>
        </div>
        <div className="landing-image" style={{ position: 'relative', right: '-70px' }}>
          <img
            src="https://res.cloudinary.com/youseful-apps/image/upload/v1702332939/front_unv6ak.png"
            alt="Working Illustration"
            style={{ width: '100%' }}
          />
        </div>
      </section>
    </main>
  );
}

export default Hero;




// import React from 'react';

// function Hero() {
//   return (
//     <main
//       style={{
//         fontFamily: "'Poppins', sans-serif, 'Segoe UI', Tahoma, Geneva, Verdana",
//         fontSize: '16px',
//         backgroundColor: 'white', // Add this line to set a white background
//       }}
//     >
//       <section
//         className="landing"
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           padding: '40px 0',
//           marginLeft: '11%',
//           overflowX: 'hidden',
//         }}
//       >
//         <div className="landing-text" style={{ flex: 1, minWidth: '465px' }}>
//           <h1 style={{ width: '100%', fontSize: '3.9em', lineHeight: '1.15' }}>
//           Seamless efficiency, all-in-one solution.
//           </h1>
//           <p style={{ fontSize: '18px', maxWidth: '500px', margin: '0 0 29.41176px' }}>
//             Streamline employee management, innovate inventory, breeze through procurement. Elevate
//             your operations effortlessly.
//           </p>
//           <a
//             href="#url-shorten-form"
//             className="btn btn-lg"
//             style={{
//               display: 'inline-block',
//               color: 'white',
//               backgroundColor: '#2acfcf',
//               textTransform: 'capitalize',
//               fontWeight: '700',
//               border: 'none',
//               outline: 'none',
//               cursor: 'pointer',
//               borderRadius: '100px',
//               transition: '0.3s',
//               padding: '12px 36px',
//             }}
//           >
//             Get Started
//           </a>
//         </div>
//         <div className="landing-image" style={{ position: 'relative', right: '-70px' }}>
//           <img
//             src="https://res.cloudinary.com/youseful-apps/image/upload/v1702332939/front_unv6ak.png"
//             alt="Working Illustration"
//             style={{ width: '100%' }}
//           />
//         </div>
//       </section>
//     </main>
//   );
// }

// export default Hero;
