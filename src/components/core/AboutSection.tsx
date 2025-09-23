"use client"
export function AboutSection() {
  const stats = [
    {
      number: "10,000+",
      label: "Patients Served",
      description: "Providing quality healthcare services to thousands of patients across Myanmar",
    },
    {
      number: "1,200+",
      label: "Appointments Scheduled",
      description: "Seamless online booking system ensuring timely consultations",
    },
    {
      number: "5+",
      label: "Years in Service",
      description: "Trusted healthcare provider with years of experience in patient care",
    },
    {
      number: "24/7",
      label: "Support & Assistance",
      description: "Round-the-clock patient support for appointments, inquiries, and emergencies",
    },
    {
      number: "98%",
      label: "Patient Satisfaction",
      description: "Consistently receiving positive feedback from our patients",
    },
    {
      number: "50+",
      label: "Medical Staff",
      description: "Dedicated team of doctors, specialists, and healthcare professionals",
    },
  ]

  return (
    <section className="py-24 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-center">
            About Us
          </h2>
          <p className="mt-6 text-md leading-8 text-gray-600 font-mono tracking-wide text-balance max-w-3xl mx-auto">
            At Myan Clinic, we’re transforming healthcare in Myanmar by combining modern technology with compassionate care. Our platform offers seamless online appointments, secure medical records, and expert consultations—ensuring you get timely and reliable healthcare from the comfort of your home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors group"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-3">{stat.label}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Explore Our Story?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join us on a journey to transform healthcare. Our team is passionate about turning ideas into reality, delivering the same dedication and quality that has driven Myan Clinic’s success.
          </p>
          <button className="rounded-md bg-gray-900 p-2 font-mono text-xs text-base font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors" onClick={() => window.location.href = '/about'}>
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}
