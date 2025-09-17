export function AboutSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="border-2 border-dotted border-muted-foreground/30 rounded-lg p-8 md:p-12">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">About Us</h2>
              <div className="w-16 h-px bg-muted-foreground/40 mx-auto"></div>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              We are a team of passionate creators dedicated to building exceptional digital experiences. Our focus is
              on clean design, innovative solutions, and meaningful connections with our clients.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-foreground">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
