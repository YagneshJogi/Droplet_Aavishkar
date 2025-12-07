import React from 'react';

function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-flow-row gap-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="mb-6">
              We are a team of four driven and passionate individuals, working together to build an innovative IoT-based water monitoring system. Our combined expertise in both software and hardware domains allows us to deliver a seamless and intelligent solution that addresses real-world water management challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Software Development Team</h3>
                <p className="text-left">
                  Yagnesh Jogi and Atharv Kulkarni form the core of our software development team. They are responsible for designing and implementing the backend architecture, database integration, and user interface of the system. Their work ensures smooth communication between the IoT devices and the cloud, enabling real-time monitoring and efficient data handling. With a strong focus on performance, security, and user experience, they are building a robust platform that powers the system's intelligence.
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Hardware Development Team</h3>
                <p className="text-left">
                  On the hardware side, Manaswa Mahalunge and Parag Pinjani are leading the charge. They are responsible for building the physical components of the system, including sensor integration, microcontroller programming, and overall circuit design. Their hands-on skills and deep understanding of electronics ensure accurate data collection, reliable system performance, and practical deployment in real-world environments.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p>
              Together, our team bridges the gap between digital intelligence and physical implementation. With a shared vision and complementary skill sets, we collaborate closely to prototype, test, and refine our solution. Each member brings unique strengths, and our combined efforts reflect a strong commitment to innovation, precision, and sustainability. We aim to create a product that not only solves water monitoring challenges but also contributes to smarter, more responsible water usage.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="grid grid-flow-col gap-4">
            <a href="https://github.com/your-repo" className="link link-hover">GitHub</a>
            <a href="mailto:contact@example.com" className="link link-hover">Contact</a>
          </div>
          <div className="mt-4">
            <p>Copyright © 2025 - All rights reserved by Droplet</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 