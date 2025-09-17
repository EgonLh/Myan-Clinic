import Link from "next/link";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";

export function Navigation() {
  return (
    <div className="w-full border-b flex justify-center ">
      <div className=" container   rounded-lg ">
        <div className="flex justify-between items-center mx-12">
          <div>
            Hello
          </div>
          <NavigationMenu className="  p-4 rounded-lg">
            <NavigationMenuList >
              <div >
                <NavigationMenuItem>
                  <NavigationMenuTrigger>List</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="font-medium">Components</div>
                            <div className="text-muted-foreground">
                              Browse all components in the library.
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="font-medium">Documentation</div>
                            <div className="text-muted-foreground">
                              Learn how to use the library.
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="font-medium">Blog</div>
                            <div className="text-muted-foreground">
                              Read our latest blog posts.
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
              </div>
               <div >
                <NavigationMenuItem>
                  <NavigationMenuTrigger>List</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="font-medium">Components</div>
                            <div className="text-muted-foreground">
                              Browse all components in the library.
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="font-medium">Documentation</div>
                            <div className="text-muted-foreground">
                              Learn how to use the library.
                            </div>
                          </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="#">
                            <div className="font-medium">Blog</div>
                            <div className="text-muted-foreground">
                              Read our latest blog posts.
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
              </div>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}

