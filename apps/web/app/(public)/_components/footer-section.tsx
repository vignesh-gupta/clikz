import Image from "next/image";
import Link from "next/link";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Templates", href: "/templates" },
        { label: "Integrations", href: "/integrations" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "API Documentation", href: "/api-docs" },
      ],
    },
  ];

  const socialLinks = [
    {
      icon: FaXTwitter,
      href: "https://twitter.com/clikz_app",
      label: "Twitter",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/company/clikz",
      label: "LinkedIn",
    },
    {
      icon: FaGithub,
      href: "https://github.com/clikz",
      label: "GitHub",
    },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-8 gap-4">
          {/* Brand Section */}
          <div className="space-y-8 xl:col-span-1 flex flex-col justify-between gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo-name.png" alt="Clikz" width={140} height={40} />
            </Link>
            <div>
              <div className="flex space-x-6">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-400 hover:text-gray-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{item.label}</span>
                    <item.icon className="size-5" />
                  </a>
                ))}
              </div>
              <div className="mt-4 border border-muted">
                <iframe
                  src="https://status.clikz.live/badge"
                  width="220"
                  height="42"
                />
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid md:grid-cols-3 md:col-span-2 md:gap-8 gap-4">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-base text-gray-600 hover:text-gray-900"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-base text-gray-400 text-center">
            © {currentYear} Clikz , Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
