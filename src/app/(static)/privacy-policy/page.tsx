"use client"

export default function PrivacyPage() {
  const sections = [
    {
      id: "info",
      title: "Information We Collect",
      content: [
        "Personal details such as name, email, phone number, and address.",
        "Medical records, prescriptions, and appointment history.",
        "Payment and billing information for healthcare services.",
        "Technical details like IP address and device type for security and analytics.",
      ],
    },
    {
      id: "use",
      title: "How We Use Your Information",
      content: [
        "To schedule and manage appointments efficiently.",
        "To securely store and update your medical history.",
        "To process payments and issue receipts.",
        "To analyze usage patterns and improve our platform.",
        "To contact you with reminders, updates, or important notices.",
      ],
    },
    {
      id: "protection",
      title: "Data Protection",
      content: [
        "All data is encrypted during transmission and storage.",
        "Access is controlled with strict role-based permissions.",
        "We regularly monitor and audit systems for security risks.",
        "Backups are maintained to prevent data loss.",
      ],
    },
    {
      id: "sharing",
      title: "Sharing of Information",
      content: [
        "We do not sell or rent your personal data.",
        "Information is shared only with healthcare professionals involved in your care.",
        "We may disclose data if required by law or government regulation.",
      ],
    },
    {
      id: "rights",
      title: "Your Rights",
      content: [
        "Access your medical records at any time.",
        "Request corrections to inaccurate information.",
        "Request deletion of your account and personal data.",
        "Withdraw consent for data processing, where applicable.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies & Tracking",
      content: [
        "We may use cookies to improve your browsing experience.",
        "Cookies help remember preferences and collect anonymous analytics.",
        "You can disable cookies in your browser settings at any time.",
      ],
    },
    {
      id: "updates",
      title: "Updates to This Policy",
      content: [
        "This Privacy Policy may be updated from time to time.",
        "Changes will be posted here with a new effective date.",
      ],
    },
    {
      id: "contact",
      title: "Contact Us",
      content: [
        "For questions about this Privacy Policy, email us at support@myanclinic.com.",
      ],
    },
  ]

  return (
    <div className="max-w-6xl border rounded border-2 my-2 border-dashed mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
      {/* Sidebar */}
      <aside className="md:col-span-1 hidden md:block sticky space-y-4 text-sm  top-20 self-start">
        <h2 className="font-semibold text-foreground mb-2">On this page</h2>
        <ul className="space-y-2 text-muted-foreground">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="hover:text-foreground transition-colors"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="md:col-span-3 space-y-12">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>
        <p className="mb-10 text-lg text-muted-foreground">
          At <span className="font-medium text-foreground">Myan Clinic</span>, we
          respect and protect your privacy. This policy explains how we collect,
          use, and safeguard your personal information when you use our services.
        </p>

        {sections.map((section) => (
          <section key={section.id} id={section.id} className="space-y-4 scroll-mt-24">
            <h2 className="text-2xl font-semibold text-foreground">{section.title}</h2>
            <ul className="list-disc list-inside ml-4 space-y-2 text-muted-foreground">
              {section.content.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  )
}
