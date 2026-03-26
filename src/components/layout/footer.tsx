import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Github, MessageCircle, Twitter, Linkedin } from 'lucide-react';

const footerLinks = {
  product: {
    title: 'Product',
    links: [
      { name: 'Features', href: '/features' },
      { name: 'Playground', href: '/playground' },
      { name: 'Downloads', href: '/downloads' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Changelog', href: '/changelog' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { name: 'Blog', href: '/blog' },
      { name: 'Tutorials', href: '/tutorials' },
      { name: 'Examples', href: '/examples' },
      { name: 'FAQ', href: '/faq' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'GitHub', href: 'https://github.com/fortran-lang' },
      { name: 'Discord', href: '/community/discord' },
      { name: 'Contribute', href: '/contribute' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'License', href: '/license' },
    ],
  },
};

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/fortran-lang' },
  { name: 'Discord', icon: MessageCircle, href: '/community/discord' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/fortranlang' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/fortran' },
];

export function Footer() {
  return (
    <footer className="bg-carbon-gray-100 border-t border-carbon-gray-80">
      <Container>
        <div className="py-12 md:py-16">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="flex h-8 w-8 items-center justify-center bg-accent-cyan/10 border border-accent-cyan/30">
                  <span className="font-mono font-semibold text-accent-cyan">F²</span>
                </div>
                <span className="font-sans text-lg font-semibold text-carbon-gray-10">
                  Fortran<span className="text-accent-cyan">²</span>
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-sm text-carbon-gray-30 leading-relaxed">
                The next-generation Fortran programming language for computational science and high-performance computing.
              </p>
              {/* Social links */}
              <div className="mt-6 flex gap-4">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-carbon-gray-50 hover:text-carbon-gray-10 transition-colors duration-75"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                  >
                    <item.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h3 className="text-xs font-semibold text-carbon-gray-10 uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-carbon-gray-30 hover:text-carbon-gray-10 transition-colors duration-75"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-12 pt-8 border-t border-carbon-gray-80">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-sm font-semibold text-carbon-gray-10">
                  Subscribe to our newsletter
                </h3>
                <p className="mt-1 text-sm text-carbon-gray-30">
                  Get the latest updates on Fortran² releases and features.
                </p>
              </div>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-10 px-3 w-64 bg-carbon-gray-90 border border-carbon-gray-80 text-carbon-gray-10 placeholder:text-carbon-gray-60 text-sm transition-colors duration-75 focus:outline-none focus:border-carbon-blue-60 focus:ring-1 focus:ring-carbon-blue-60/30"
                />
                <button
                  type="submit"
                  className="h-10 px-4 bg-carbon-blue-60 text-white text-sm font-medium hover:bg-carbon-blue-70 transition-colors duration-75"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-carbon-gray-80 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-carbon-gray-50">
              © {new Date().getFullYear()} Fortran². All rights reserved.
            </p>
            <p className="text-sm text-carbon-gray-60">
              Built with Next.js and Tailwind CSS
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
