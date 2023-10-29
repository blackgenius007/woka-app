 /* eslint-disable */ 
 import React from 'react'; 
 import Login from './login';
 import styled from 'styled-components';
 import { useNavigate } from 'react-router-dom';

 
  

// Define your styled components
const Container = styled.div`

:root {
    
    /* COLORS */

    /* primary */
    --darkblue05: #091B6F;
    --darkblue04: #0D28A6;
    --darkblue03: #5E70C4;
    --darkblue02: #AEB7E1;
    --darkblue01: #CFD4ED;
    --limegreen05: #3D7B3F;
    --limegreen04: #5CB85F;
    --limegreen03: #92D094;
    --limegreen02: #C9E7CA;
    --limegreen01: #DEF1DF;
    --default: #F1F3FF;


    /* alert */
    --alert-red: #FA2C5A;
    --alert-yellow: #F9CC00;
    --alert-green: #73CA5C;

    /* neutral */
    --neutral05: #151515;
    --neutral04: #3C3C3C;
    --neutral03: #8A8A8A;
    --neutral02: #D0D0D0;
    --neutral01: #FFFFFF;
    --black: #0000;


    /* TYPOGRAHPY */

    /* font family */
    --font-helvetica: "Helvetica";

    /* font size */
    --fs-large: 36px;
    --fs-heading-large: 24px;
    --fs-heading-medium: 20px;
    --fs-title-large: 18px;
    --fs-title-medium: 16px;
    --fs-body-large: 14px;
    --fs-body-medium: 12px;
    --fs-body-small: 10px;


    /* Transition */
    --transition-1: 0.15s ease-in-out;
    --transition-2: 0.15s ease-in;
    --transition-3: 0.25s ease-out;

}

 
html {
    scroll-behavior: smooth;
}

a { text-decoration: none; }

li { list-style: none; }
 
}

 



/* HEADER */
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: var(--default);
    z-index: 4;
    padding-block: 24px;
}

.header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-actions { display:none; }

.nav-open-btn {
    padding: 5px;
}

.nav-open-btn ion-icon { --ionicon-stroke-width: 40px; }

.navigasi {
    position: fixed;
    top: 0;
    right: -300px;
    width: 100%;
    max-width: 280px;
    
    height: 100%;
    box-shadow: 0 2px 8px hsla(0, 0%, 0%, 0.5);
    visibility: hidden;
    z-index: 2;
    transition: var(--transition-2);
}

.navigasi.active {
    right: 0;
    background: var(--neutral01);
    visibility: visible;
    transition: var(--transition-3);
}

.navigasi-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
}

.nav-close-btn {
    font-size: 25px;
    padding: 10px;
    transform: translateX(15px);
}

.navigasi-list {
    margin-bottom: 30px;
}

.navigasi-list li a {
    text-decoration: none !important;
    font-size: var(--fs-body-large);
    font-weight: var(--fw-400);
    line-height: 20px;
}

.navigasi-link {
    font-size: 15px;
    padding: 10px 25px;
    font-weight: var(--fw-500);
    transition: 0.15s ease-in-out;
}

.navigasi-register {
    display: flex;
    justify-content: left;
    align-items: left;
    gap: 15px;
    margin-left: 25px;
}
.overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    transition: var(--transition-2);
}

.overlay.active {
    background: hsla(0, 0%, 0%, 0.7);
    pointer-events: all;
    transition: var(--transition-3);
}
.hero {
    background: var(--default)
}
button {
    border: none;
    cursor: pointer;
}

body { overflow-x: hidden; }

body.active { overflow-y: hidden; }
/* HERO */

.hero {
    background: var(--default)
}

.hero-section {
    margin-top: 70px;
    padding-top: 20px;
}

h1.heading-hero {
    min-width: 250px;
    font-weight: 700;
    font-size: var(--fs-large);
    line-height: 54px;
}

p.detail-heading {
    margin-top: 20px;
    font-weight: 300;
    font-size: var(--fs-body-large);
    line-height: 20px;
    width: 280px;
    margin-bottom: 20px;
}

button.btn-hero {
    width: 155px;
    font-size: 14px;
    margin-bottom: 30px;
}

.imagehero-section {
    display: flex;
    justify-content: right;
    text-align: right;
    align-items: right;
}

.imagehero-section img {
    width: 280px;
    right: 0;
}
/* FAQ SECTION */
.heading-faq {
    font-weight: 700;
    font-size: var(--fs-heading-large);
    line-height: 36px;
    margin-bottom: 10px;
    text-align: center;
    display: flex;
    justify-content: center;

}

p.faq-text {
    margin-top: 15px;
    font-size: var(--fs-body-large);
    line-height: 20px;
    text-align: center;
}
button.accordion-button {
    font-size: var(--fs-body-large);
    line-height: 20px;
    font-weight: 300;
}

.accordion-body {
    font-size: var(--fs-body-large);
}

.faq-section {
    display: flex;
}

.faq-details {
    flex-direction: row;
}

footer p {
    font-size: var(--fs-body-large);
    line-height: 25px;
    margin-bottom: 15px;
}

h5.navigasi-footer {
    font-weight: 500;
    font-size: var(--fs-body-large);
}

.content-sosmed {
    margin-left: -5px;
}

.grouping-socialmedia {
    margin-bottom: 20px;
}



/* RESPONSIVE */

/* responsive larger than 350px */

@media(min-width: 350px) {

    /* HERO SECTION */
    p.detail-heading {
        min-width: 315px;
    }

    .imagehero-style {
        min-width: 320px;
    }


    /* SERVICE SECTION */
    .service-list {
        margin-left: -10px;
    }


    /* WHY US SECTION */

    .whyus-detail .card-whyus {
        margin-left: 20px;
    }


    /* TESTIMONIAL SECTION */

    .rate-testimonial {
        margin-left: 110px;
    }

    .faq-details {
        display: flex;
        align-items: center; /* Menyelaraskan konten vertikal di kedua kolom */
        width: 100%;
    }
      
    .left-section {
        flex: 1; /* Menyamakan lebar kedua kolom */
        margin-left: 30px;
        margin-right: 70px;
    }
      
    .right-section {
        flex: 1;
        
    }

}

/* TESTIMONIAL SECTION */
    .body-testi .row .profile-testi {
        margin-top: 40px;
        padding-left: 60px;
    }

    .body-testi .row .rate-testimonial {
        margin-left: 30px;
    }

    p.card-detail-testi {
        min-width: 420px;
    }

/* responsive larger than 420px */

@media(min-width: 420px) {

    /* SERVICE SECTION */
    p.detail-heading {
        min-width: 400px;
    }

    /* WHY US SECTION */

    p.detail-whyus {
        margin-left: 5px;
    }

    .whyus-detail .card-whyus {
        margin-left: 60px;
    }

    /* TESTIMONIAL SECTION */
    .rate-testimonial {
        margin-left: 145px;
    }

}

/* TESTIMONIAL SECTION*/

h3.detail-testimonial {
    margin-top: 15px;
    font-size: var(--fs-body-large);
    line-height: 20px;
}

.rate-testimonial {
    margin-left: 90px;
}

.testimonial-contents {
    margin-top: 40px;
    margin-bottom: 40px;
}

img.profile-testi {
    justify-content: center;
    align-items: center
}

.text-testimonial {
    justify-content: center;
    align-items: center;
    margin-left: 15px;
}

p.card-detail-testi {
    padding: 10px 20px;
    margin-top: 15px;
    font-size: var(--fs-body-large);
    line-height: 20px;
}

p.person-name {
    padding: 10px 20px;
    margin-top: -20px;
    font-size: var(--fs-body-large);
    line-height: 20px;
}


.carousel-item .body-testi {
    background-color: #F1F3FF;
}


.carousel-control-prev-icon,
.carousel-control-next-icon {
    background-color: green;
    padding: 20px 20px;
    border-radius: 20px;
    width: 30px;
    height: 30px;
    font-size: 24px;
}

/* GETTING STARTED */
.started-content {
    margin-top: 10px;
    background-color: var(--darkblue04);
    padding: 50px 50px;
    margin-bottom: 30px;
    border-radius: 13px;
    color: var(--neutral01);
    text-align: center;
}

.started-content h1.started-title {
    padding-left: 12px; 
    padding-right: 12px; 
    font-weight: 700;
    font-size: var(--fs-heading-large);
    line-height: 36px;
    margin-bottom: 10px;
}

h3.detail-started-content {
    margin-top: 25px;
    font-size: var(--fs-body-large);
    line-height: 20px;
    font-weight: 300;
}

button.button-action {
    margin-top: 30px;
}



/* responsive  larger than 500px*/

@media(min-width: 500px) {

    /* HERO SECTION */

    img.imagehero-style {
        min-width: 400px;
    }


    /* SERVICE SECTION */

    p.detail-heading-service-style {
        min-width: 430px;
    }

    .service-list {
        margin-left: 45px;
    }


    /* WHY US SECTION */
    p.detail-whyus {
        margin-left: 40px;
    }

    .whyus-detail .card-whyus {
        margin-left: 85px;
    }


    /* TESTIMONIAL SECTION */
    .rate-testimonial {
        margin-left: 180px;
    }
    /* HEADER */

    .nav-open-btn { display: none; }

    .navigasi {
        position: static;
        opacity: 1;
        visibility: visible;
        background: none;
        max-width: unset;
        width: max-content;
        height: auto;
        box-shadow: none;
    }

    .navigasi-top,
    .navigasi-register { display: none; }

    .navigasi-list {
        margin-bottom: 0;
        display: flex;
        justify-content: flex-end;
    }

    .header-actions {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .overlay { display: none; }



    /* HERO SECTION */

    .hero {
        padding-top: 50px !important;
    }

    .hero .row {
        display: flex;
    }

    .left-hero-section{
        min-width: 512px !important;
    }

    h1.heading-hero {
        max-width: 513px;
        padding-left: 40px;
        padding-right: 30px;
    }

    p.detail-heading-hero-style {
        padding-left: 40px;
        padding-right: 50px;
        max-width: 450px !important; 
    }

    .btn-hero {
        margin-left: 40px;
    }

    img.imagehero-style {
        
        min-width: 420px !important;
        margin-top: 90px;
        padding-right: -40px;
    }


}


/* responsive larger than 600px */

@media(min-width: 600px) {

    /* HERO SECTION */
    p.detail-heading {
        min-width: 500px;
    }

    img.imagehero-style {
        min-width: 500px;
    }



    /* WHY US SECTION */
    p.detail-whyus {
        margin-left: 20px;
    }

    .whyus-detail .card-whyus {
        margin-left: 93px;
    }


    /* TESTIMONIAL SECTION */

    .rate-testimonial {
        margin-left: 200px;
    }

    /* FAQ SECTION */

    .faq-details {
        width: 100%;
    }

    .faq-details .left-section {
        margin-left: -100px;
    }




}
`;

function HeroSection() {
    const navigate = useNavigate();
    const [openLogin, setOpenLogin] = React.useState(false);

    const handleLoginOpen = () => {
   
      setOpenLogin(true);
      };
      const handleLoginClose = () => {
        setOpenLogin(false);
      };
    

  return (
    <>
    <Container>
    <div>
      <header className="header" style={{backgroundColor: '#fff'}} >
        {/* overlay */}
        <div className="overlay" data-overlay></div>
        <div className="container">
          <a href="#" className="logo">
            <img src="https://i.ibb.co/MkygZR1/bcr-logo.png" alt="bcr-logo" border="0" />
          </a>
          <a className="nav-open-btn" data-nav-open-btn>
            <img
              src="https://i.ibb.co/0VBC9mX/fi-menu.png"
              alt="fi-menu"
              border="0"
              width="24"
              height="24"
            />
          </a>
          <nav className="navigasi" data-nav>
            <div className="navigasi-top">
              <h4 className="text-logo">BCR</h4>
              <a className="nav-close-btn" data-nav-close-btn>
                <img
                  src="https://i.ibb.co/Wk7Vbhb/fi-x.png"
                  alt="fi-x"
                  border="0"
                  width="24"
                  height="24"
                />
              </a>
            </div>
            <ul className="navigasi-list">
              <li>
                <a href="#service" className="navigasi-link text-dark">
                  Our Services
                </a>
              </li>
              <li>
                <a   className="navigasi-link text-dark">
                  Why Us
                </a>
              </li>
              <li>
                <a href="#testimoni" className="navigasi-link text-dark">
                  Testimony
                </a>
              </li>
              <li>
                <a href="#faq" className="navigasi-link text-dark">
                  FAQ
                </a>
              </li>
            </ul>
 
          </nav>
          <div className="button.btn-hero ">
          <button className="btn-green btn-hero-prominent">
  <div className="btn">Register</div>
</button>

          </div>
        </div>
      </header>
    
      <main>
        <article>
          {/* HERO SECTION */}
          <section className="hero" id="hero">
            <div className="container hero-section">
              <div className="row">
                {/* Left Section Text */}
                <div className="col left-hero-section">
                <h1 className="detail-heading detail-heading-hero-style">
  Accounts Human Resource & Procurement Tools
</h1>

                  <p className="detail-heading detail-heading-hero-style">
                  Workfily Suite is a comprehensive business management application designed to streamline and simplify the core functions of Accounts, Human Resources, and Procurement. This all-in-one solution empowers businesses of all sizes to efficiently manage their financial transactions, human resources, and procurement processes, enhancing productivity and reducing operational complexity.
                  </p>
                  <button
    className="btn-green btn-hero"
    onClick={() => navigate('/login')}
  >
    <div className="btn">Sign in</div>
  </button>
                </div>
                {/* Right Section Image */}
                <div className="col imagehero-section" style={{marginRight: '150px'}}>
                  <div className="position-relative">
                    <div className="bottom-0 end-0">
                      <img
                        src="https://images.pexels.com/photos/8636625/pexels-photo-8636625.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="img-car-mercedes"
                        border="0"
                        className="imagehero-style"
                        style={{ width: '280px'  }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* END OF HERO SECTION */}
          {/* SERVICE SECTION */}
          <section className="service" id="service">
            <div className="container service-section">
              <div className="row">
                {/* Left Section Image */}
                <div className="col imageservice-section">
                  <div className="position-relative">
                    <div className="top-50 start-50">
                      <img src="https://document-export.canva.com/w9VWA/DAFyhlw9VWA/9/thumbnail/0001.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUHWDTJW6UD%2F20231028%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231028T012257Z&X-Amz-Expires=24020&X-Amz-Signature=ee30833f3a0622c251aacd645c6cc1f6cc38bfa34b59ad4121ae7404a0e0a91b&X-Amz-SignedHeaders=host&response-expires=Sat%2C%2028%20Oct%202023%2008%3A03%3A17%20GMT "/>
                    </div>
                  </div>
                </div>
                {/* Right Section Text */}
                <div className="col right-service-section">
                  <h1 className="heading-service">Bring your office to the cloud</h1>
                  <p className="detail-heading detail-heading-service-style">
                  In today's fast-paced digital landscape, the transition to cloud-based office environments has become essential for businesses seeking to enhance productivity, flexibility, and data security. Our "Cloud Office Migration as a Service" is a comprehensive solution that empowers organizations to seamlessly bring their office operations to the cloud.Some Benefits includes: 
                  </p>
                  <ol className="service-list">
                    <li className="list-detail">
                      <span><img src="https://i.ibb.co/Tcwn0PN/service-list.png" alt="service-list" border="0" /></span>
                      <p>Automatic Salary Scheldule</p>
                    </li>
                    <li className="list-detail">
                      <span><img src="https://i.ibb.co/Tcwn0PN/service-list.png" alt="service-list" border="0" /></span>
                      <p>Artificial Intelligence Monthly Reports</p>
                    </li>
                    <li className="list-detail">
                      <span><img src="https://i.ibb.co/Tcwn0PN/service-list.png" alt="service-list" border="0" /></span>
                      <p>E-commerce</p>
                    </li>
                    <li className="list-detail">
                      <span><img src="https://i.ibb.co/Tcwn0PN/service-list.png" alt="service-list" border="0" /></span>
                      <p>Free Recruitment Services</p>
                    </li>
                    <li className="list-detail">
                      <span><img src="https://i.ibb.co/Tcwn0PN/service-list.png" alt="service-list" border="0" /></span>
                      <p>Price Comparison Portal</p>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
          {/* END OF SERVICE SECTION */}   
          {/* WHY US SECTION */}
          <section className="whyus mt-4" id="about">
      <div className="container">
        <div className="whyus-section">
          <h1 className="heading-service title-whyus">Why Us?</h1>
          <p className="detail-heading detail-whyus">Mengapa harus pilih Binar Car Rental?</p>
        </div>
        <div className="whyus-detail">
          <div className="row card-whyus">
            <div className="col-md-6 col-lg-3 card-item-whyus">
              <div className="card" style={{ width: '16.75rem', height: '12rem' }}>
                <div className="card-body">
                  <img src="https://i.ibb.co/h28LtjP/icon-complete.png" className="mb-4" alt="icon-complete" />
                  <h5 className="card-title bold-card-title">Mobil Lengkap</h5>
                  <p className="card-detail-list">
                    Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan terawat
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 card-item-whyus">
              <div className="card" style={{ width: '16.75rem', height: '12rem' }}>
                <div className="card-body">
                  <img src="https://i.ibb.co/BGp7RHM/icon-price.png" className="mb-4" alt="icon-price" />
                  <h5 className="card-title bold-card-title">Harga Murah</h5>
                  <p className="card-detail-list">
                    Harga murah dan bersaing, bisa bandingkan harga kami dengan rental mobil lain
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 card-item-whyus">
              <div className="card" style={{ width: '16.75rem', height: '12rem' }}>
                <div className="card-body">
                  <img src="https://i.ibb.co/3WWdkQB/icon-24hrs.png" className="mb-4" alt="icon-24hrs" />
                  <h5 className="card-title bold-card-title">Layanan 24 Jam</h5>
                  <p className="card-detail-list">
                    Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami juga tersedia di akhir minggu
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 card-item-whyus">
              <div className="card" style={{ width: '16.75rem', height: '12rem' }}>
                <div className="card-body">
                  <img src="https://i.ibb.co/6tysGwY/icon-professional.png" className="mb-4" alt="icon-professional" />
                  <h5 className="card-title bold-card-title">Sopir Profesional</h5>
                  <p className="card-detail-list">
                    Sopir yang profesional, berpengalaman, jujur, ramah dan selalu tepat waktu
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <br/>
    <section className="testimonial mt-4" id="testimoni">
      <div className="container">
        <div className="testimonial-text">
          <h1 className="heading-service text-center">Testimonial</h1>
          <h3 className="detail-heading detail-testimonial text-center">
            Berbagai testimonial positif dari para pelanggan kami
          </h3>
        </div>
        <div className="testimonial-contents">
          <div
            id="carouselExampleControlsNoTouching"
            className="carousel slide"
            data-bs-touch="false"
            data-bs-interval="false"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="card card-body body-testi">
                  <div className="row">
                    <div className="col-md-3">
                      <img
                        src="https://i.ibb.co/FB9TD6r/profile-Testi.png"
                        alt="profile-Testi"
                        border="0"
                        className="profile-testi mx-auto"
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="text-center">
                        <img
                          src="https://i.ibb.co/kBf3Kwd/Rate.png"
                          alt="Rate"
                          border="0"
                          className="mt-3 mb-3 rate-testimonial"
                        />
                      </div>
                      <div className="text-testimonial">
                        <p className="card-detail-testi">
                          "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                          Laudantium qui architecto impedit. Quam dicta aliquam reiciendis
                          ex! Soluta, tenetur aliquam."
                        </p>
                        <p className="person-name">
                          <strong>John Dee 32, Bromo</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Additional carousel items go here */}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControlsNoTouching"
              data-bs-slide="prev"
            >
              <img
                src="https://i.ibb.co/mJRWGqR/Left-button.png"
                alt="Left-button"
                border="0"
                style={{ marginLeft: '-20px' }}
              />
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControlsNoTouching"
              data-bs-slide="next"
            >
              <img
                src="https://i.ibb.co/BthnFmt/Right-button.png"
                alt="Right-button"
                border="0"
                style={{ marginRight: '-20px' }}
              />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </section>
    <section className="started mt-4" id="getting-started">
      <div className="container">
        <div className="started-content">
          <h1 className="heading-started started-title text-center">
            Sewa Mobil di Semarang Sekarang
          </h1>
          <h3 className="detail-heading detail-started-content text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A sapiente rem nulla sint, iste eaque ducimus doloremque sequi dicta. Corporis.
          </h3>
          <div className="text-center">
            <button type="button" className="btn btn-green btn-hero button-action">
              Mulai Sewa Mobil
            </button>
          </div>
        </div>
      </div>
    </section>
    <section className="faq mt-4" id="faq">
      <div className="container faq-section">
        <div className="row faq-details">
          <div className="left-section mb-3">
            <h1 className="heading-faq">Frequently Asked Question</h1>
            <p className="faq-text">Lorem ipsum dolor sit amet consectetur adipisicing</p>
          </div>
          <div className="right-section ms-1">
            <div className="accordion" id="accordionPanelsStayOpenExample">
              {/* FAQ items go here */}
              <div className="accordion-item mb-3">
                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                    Apa saja syarat yang dibutuhkan?
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                  <div className="accordion-body">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat optio consectetur soluta dicta, quidem, ipsum excepturi dolorum aliquam, ullam ratione explicabo quia deleniti minima suscipit.
                  </div>
                </div>
              </div>
              {/* Additional FAQ items go here */}
            </div>
          </div>
        </div>
      </div>
    </section>    
        </article>
      </main>
      <footer className="container-fluid py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3 mb-3">
            <p>Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
            <p>binarcarrental@gmail.com</p>
            <p>081-233-334-808</p>
          </div>
          <div className="col-md-3 mb-3">
            <h5 className="navigasi-footer mb-3">Our Services</h5>
            <h5 className="navigasi-footer mb-3">Why Us</h5>
            <h5 className="navigasi-footer mb-3">Testimonial</h5>
            <h5 className="navigasi-footer mb-3">FAQ</h5>
          </div>
          <div className="col-md-3 mb-3 footer-sosmed-section">
            <p>Connect with us</p>
            <div className="d-flex flex-column content-sosmed">
              <div className="d-flex grouping-socialmedia">
                <img src="https://i.ibb.co/3TQ1Bgh/icon-facebook.png" alt="icon-facebook" border="0" className="mx-2" />
                <img src="https://i.ibb.co/TqJsYch/icon-instagram.png" alt="icon-instagram" border="0" className="mx-2" />
                <img src="https://i.ibb.co/Dfw5cLB/icon-twitter.png" alt="icon-twitter" border="0" className="mx-2" />
                <img src="https://i.ibb.co/tY0TB5Z/icon-mail.png" alt="icon-mail" border="0" className="mx-2" />
                <img src="https://i.ibb.co/z79LS0p/icon-twitch.png" alt="icon-twitch" border="0" className="mx-2" />
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3 copyright-section">
            <p>Copyright Binar 2022</p>
            <p>Slicing by Jeremyas Cornelis Abigail</p>
            <a href="#" className="logo">
              <img src="https://i.ibb.co/MkygZR1/bcr-logo.png" alt="bcr-logo" border="0" />
            </a>
          </div>
        </div>
      </div>
    </footer>
    </div>

 </Container>
 <Login
      open={openLogin}
      close={handleLoginClose}
      />
 </>
  );
}

export default HeroSection;






 




// import React, { useState } from 'react';
// import { Container, Button } from '@mui/material';
//  import { useSelector, useDispatch } from 'react-redux';
// // import Register from '../Register_login/Register';
// // import Welcome from '../Home/Welcome/welcome';

// const HeroSection = () => {
//   const { user, isSuccess } = useSelector((state) => state.auth);
//   const [open, setOpen] = useState(false);
//   const [welcomeOpen, setWelcomeOpen] = useState(false);

//   const handleRegisterOpen = () => {
//     setOpen(true);
//   };

//   const handleCloseReg = () => {
//     setOpen(false);
//   };

// //   const handleWelcomeOpen = () => {
// //     setWelcomeOpen(true);
// //   };

//   if (user && isSuccess) {
//   }
//   return (
//     <div
//       style={{ background: 'white', paddingTop: '30px', paddingBottom: '30px' }}
//     >
//       <Container maxWidth="md">
//         <div style={{ position: 'relative' }}>
//           {/* <img
//             src={office}
//             alt="Hero"
//             style={{ display: 'block', margin: '0 auto', width: '85%' }}
//           /> */}
//           <Button
//             variant="contained"
//             size="large"
//             color="primary"
//             style={{
//               position: 'absolute',
//               top: '60%',
//               right: '40%',    
//               transform: 'translate(50%, -50%)',
//             }}
//             onClick={handleRegisterOpen}
//           >
//             Start now
//           </Button>
//         </div>
//       </Container>
//       {/* <Register open={open} close={handleCloseReg} /> */}
//     </div>
//   );
// };

// export default HeroSection;
