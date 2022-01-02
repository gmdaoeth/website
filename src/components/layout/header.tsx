import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import AnchorLink from "react-anchor-link-smooth-scroll";

type NavItem = {
  name: string;
  href: string;
  external?: boolean;
};

const navigation: NavItem[] = [
  { name: "About", href: "#about" },
  { name: "Token", href: "#token" },
  // { name: "Studio", href: "https://studio.gmdao.ai", external: true },
  { name: "Studio", href: "#projects" },
];

const Header = () => {
  return (
    <Disclosure as="nav" className="bg-transparent pt-4 text-gray-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-end md:justify-center h-16">
              <div className="flex items-end lg:items-center">
                <div className="hidden md:block">
                  <div className="flex items-baseline space-x-32 text-gray-5 font-medium text-shadow-lg">
                    {navigation.map((item) => {
                      if (item.external) {
                        return (
                          <div className="flex items-center space-x-1">
                            <a href={item.href} key={item.name} className="hover:text-shadow-sm hover:text-gray-300">
                              {item.name}
                            </a>
                            <div className="text-gray-200 opacity-70 h-[16px]">
                              <ExternalLinkIcon width={16} height={16} />
                            </div>
                          </div>
                        );
                      }
                      return (
                        <AnchorLink
                          href={item.href}
                          key={item.name}
                          className="hover:text-shadow-sm hover:text-gray-300"
                        >
                          <p>{item.name}</p>
                        </AnchorLink>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 absolute top-15 right-0 ">
              {navigation.map((item) => {
                return (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="text-white hover:bg-gray-70 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {item.name}
                  </Disclosure.Button>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;
