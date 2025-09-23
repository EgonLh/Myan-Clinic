"use client"

export default function TermsPage() {
  const sections = [
    {
      id: "use",
      title: "Use of Services",
      content: [
        "Services must only be used for lawful purposes.",
        "You agree not to misuse the platform or interfere with its operation.",
        "Providing false or misleading information is strictly prohibited.",
      ],
    },
    {
      id: "appointments",
      title: "Appointments",
      content: [
        "Appointments are subject to availability and confirmation.",
        "We reserve the right to reschedule or cancel appointments when necessary.",
        "Patients are responsible for arriving on time and providing accurate information.",
      ],
    },
    {
      id: "accounts",
      title: "Accounts & Security",
      content: [
        "You are responsible for maintaining the confidentiality of your login details.",
        "Notify us immediately if you suspect unauthorized access to your account.",
        "We may suspend accounts found in violation of these Terms.",
      ],
    },
    {
      id: "disclaimer",
      title: "Medical Disclaimer",
      content: [
        "Information provided is for general healthcare purposes.",
        "It should not replace professional medical advice, diagnosis, or treatment.",
        "Always consult a qualified doctor for medical decisions.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      content: [
        "Myan Clinic is not liable for indirect, incidental, or consequential damages.",
        "We do not guarantee uninterrupted or error-free access to the platform.",
        "Users are responsible for ensuring compatibility with their devices.",
      ],
    },
    {
      id: "ip",
      title: "Intellectual Property",
      content: [
        "All content on the platform is owned by or licensed to Myan Clinic.",
        "You may not copy, distribute, or reproduce content without permission.",
      ],
    },
    {
      id: "changes",
      title: "Changes to Terms",
      content: [
        "We may update these Terms at any time.",
        "Continued use of our services after updates means you accept the revised Terms.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      content: [
        "For questions about these Terms, please contact us at support@myanclinic.com.",
      ],
    },
  ]

  return (
    <div className="max-w-6xl   border rounded border-2 my-2 border-dashed mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
      {/* Sidebar */}
      <aside className="md:col-span-1 hidden md:block space-y-4 text-sm sticky top-20 self-start">
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
        <h1 className="text-4xl font-bold mb-8 text-foreground">Terms & Conditions</h1>
        <p className="mb-10 text-lg text-muted-foreground">
          Welcome to <span className="font-medium text-foreground">Myan Clinic</span>. 
          By using our platform, you agree to comply with these Terms & Conditions.
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
