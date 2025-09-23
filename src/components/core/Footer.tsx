import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">MyanClinic  </h3>
              <p className="mt-2 text-justify text-sm text-muted-foreground">
                Founded in 2020, Myan Clinic is a pioneering healthcare services provider in Myanmar, dedicated to making healthcare more accessible, efficient, and patient-centric
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Business St, Yangon, Myanmar</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+95 123 456 789</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hello@myanclinic.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4 flex md:justify-center ">
            
            <div className="space-y-2">
              <h4 className="text-lg font-medium text-foreground">QuickLinks</h4>
              <ul className="space-y-1">
                
                <li>
                  <a href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Heathcares
                  </a>
                </li>
                <li>
                  <a href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Features
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    AboutUs
                  </a>
                </li>
                <li>
                  <a href="/#FAQ" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Newsletter & Social */}
          <div className="space-y-4">
  <h3 className="text-lg font-semibold text-foreground">Follow Us</h3>
  <p className="text-sm text-muted-foreground">
    Stay connected and get the latest updates by following us on our social platforms.
  </p>

  <div className="flex gap-2">
    <Button variant="ghost" size="icon" className="h-10 w-10">
      <Facebook className="h-5 w-5" />
    </Button>
    <Button variant="ghost" size="icon" className="h-10 w-10">
      <Twitter className="h-5 w-5" />
    </Button>
    <Button variant="ghost" size="icon" className="h-10 w-10">
      <Instagram className="h-5 w-5" />
    </Button>
    <Button variant="ghost" size="icon" className="h-10 w-10">
      <Linkedin className="h-5 w-5" />
    </Button>
    <Button variant="ghost" size="icon" className="h-10 w-10">
      <Youtube className="h-5 w-5" />
    </Button>
  </div>

  <p className="text-xs text-muted-foreground">
    Click any icon to follow us on your favorite platform.
  </p>
</div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">© 2024 MyanClinic. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="/terms-and-conditions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
