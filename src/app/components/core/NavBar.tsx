"use client"
import { Menubar, MenubarMenu, MenubarContent, MenubarItem, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/app/components/ui/menubar";
import { NavigationMenu, } from "@/app/components/ui/navigation-menu";
import { ArrowBigLeftDash, Bot, Calendar, CardSim, ChevronDown, FormInput, HeartPlus, LocateIcon, LogIn, Mail, PhoneCall, ScanEye, SquareArrowDownLeft, SquareArrowOutUpLeft, SquareArrowOutUpRight, TextSearch, Users, ViewIcon } from "lucide-react";
import type { MenuGroup } from "@/types/menus"
import { useRouter } from "next/navigation";

export const MenubarItems: MenuGroup[] = [
  {
    id: "services",
    trigger: "Services",
    items: [
      { id: "our-services", label: "Our Services" },
      { id: "sep-1", label: "", separator: true },
      { id: "service-1", label: "Appointment" , shortcut: <Calendar className="inline mr-1 h-3 w-3" />},
      { id: "service-2", label: "Secure Storage" , shortcut: <CardSim className="inline mr-1 h-3 w-3" />},
      { id: "service-3", label: "Supports" , shortcut: <HeartPlus className="inline mr-1 h-3 w-3" />},
    ],
  },  
  {
    id: "about",
    trigger: "About",
    items: [
      { id: "mission", label: "Our Mission" ,shortcut: <ScanEye className="inline mr-1 h-3 w-3" /> },
      { id: "vision", label: "Our Visions" , shortcut: <ViewIcon className="inline mr-1 h-3 w-3" /> },
      { id: "sep-2", label: "", separator: true },
      { id: "reviews", label: "Audience Reviews" , shortcut: <Users className="inline mr-1 h-3 w-3" /> },
    ],
  },
  {
    id: "contact",
    trigger: "Contact",
    items: [
      { id: "info", label: "Information", shortcut: <TextSearch className="inline mr-1 h-3 w-3" /> },
      { id: "sep-4", label: "", separator: true },
      { id: "location", label: "Location" ,shortcut:<LocateIcon className="inline mr-1 h-3 w-3"/>},
      { id: "email", label: "Email" ,shortcut:<Mail className="inline mr-1 h-3 w-3"/>},
      { id: "phone", label: "Phone" ,shortcut:<PhoneCall className="inline mr-1 h-3 w-3"/>},
    ],
  },
  {
    id: "faq",
    trigger: "FAQ",
    items: [
      { id: "support", label: "Customer Support", shortcut: <Bot className="inline mr-1 h-3 w-3" /> },
      { id: "form", label: "Feedbacks" , shortcut: <FormInput className="inline mr-1 h-3 w-3" /> },
    ],
  },
]


export default function NavigationBar() {
  const router = useRouter();
  
  const handleLogin = () => {
    console.log("Here")
    router.push('/login');
  }
  return (
    <div className="flex justify-between container py-2 sticky top-0 bg-white z-10 px-5">
      {/* for the brand */}
      <NavigationMenu>
        <div className="font-sans hover:tracking-widest transition-all duration-300 font-bold">MyanClinic  </div>
      </NavigationMenu>
      {/* main navigation */}
      <NavigationMenu viewport={false} className="md:block hidden">
        <Menubar className="border-none shadow-none transition-all duration-300">
          {MenubarItems.map((menu) => (
            <MenubarMenu key={menu.id}>
              <MenubarTrigger className="text-xs  mx-3">{menu.trigger}</MenubarTrigger>
              <MenubarContent className="p-1">
                {menu.items.map((item) =>
                  item.separator ? (
                    <MenubarSeparator key={item.id} />
                  ) : (
                    <MenubarItem key={item.id} className="text-xs mt-1 text-slate-500 hover:text-slate-800 hover:tracking-wider transition-all duration-300 hover:border hover:py-2 ">
                      {item.label}
                      {item.shortcut && (
                        <MenubarShortcut>{item?.shortcut}</MenubarShortcut>
                      )}
                    </MenubarItem>
                  )
                )}
              </MenubarContent>
            </MenubarMenu>
          ))}
        </Menubar>
      </NavigationMenu>
      {/* login button */}
      <NavigationMenu>
        <button onClick={handleLogin}  className="text-xs  rounded font-semibold flex underline hover:no-underline border items-center justify-center hover:bg-muted    transition-all duration-300 ">
          <SquareArrowOutUpRight className="inline  h-4 w-4 " /> 
        </button>
      </NavigationMenu>
    </div>
  )
};