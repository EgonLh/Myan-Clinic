export function AboutUs() {
  const stats = [
    {
      number: "500+",
      label: "Projects Completed",
      description: "Successfully delivered projects across various industries",
    },
    {
      number: "50+",
      label: "Happy Clients",
      description: "Trusted by businesses worldwide for quality solutions",
    },
    {
      number: "5+",
      label: "Years Experience",
      description: "Proven track record in web development and design",
    },
    {
      number: "24/7",
      label: "Support Available",
      description: "Round-the-clock assistance for all your needs",
    },
    {
      number: "99%",
      label: "Client Satisfaction",
      description: "Consistently exceeding expectations with every project",
    },
    {
      number: "15+",
      label: "Team Members",
      description: "Skilled professionals dedicated to your success",
    },
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-balance">
            About Our Success
          </h2>
          <p className="mt-6 text-xl leading-8 text-gray-600 text-pretty max-w-3xl mx-auto">
            We've built our reputation on delivering exceptional results. Here's what sets us apart and the milestones
            we've achieved together with our amazing clients.
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
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join Our Success Story?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Let's work together to create something amazing. Our team is ready to bring your vision to life with the
            same dedication and quality that has made us successful.
          </p>
          <button className="rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-colors">
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  )
}
