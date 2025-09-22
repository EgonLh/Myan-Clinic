import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Brand</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Building innovative solutions that transform businesses and empower teams to achieve their goals.
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Business St, City, State 12345</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@brand.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Products</h4>
                <ul className="space-y-1">
                  <li>
                    <a
                      href="/products/web-apps"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Web Apps
                    </a>
                  </li>
                  <li>
                    <a
                      href="/products/mobile-apps"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Mobile Apps
                    </a>
                  </li>
                  <li>
                    <a
                      href="/products/apis"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      APIs
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Services</h4>
                <ul className="space-y-1">
                  <li>
                    <a
                      href="/services/consulting"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Consulting
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services/development"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Development
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services/design"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Design
                    </a>
                  </li>
                  <li>
                    <a
                      href="/services/support"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Company</h4>
              <ul className="space-y-1">
                <li>
                  <a href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Newsletter & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Stay Connected</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="flex-1" />
                <Button size="sm">Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Follow Us</h4>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">© 2024 Brand. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
