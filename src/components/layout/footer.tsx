import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Github, Discord, Twitter, Linkedin } from 'lucide-react';

const footerLinks = {
  product: {
    title: 'Product',
    links: [
      { name: 'Features', href: '/features' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Downloads', href: '/downloads' },
      { name: 'Changelog', href: '/changelog' },
    ],
  },
  community: {
    title: 'Community',
    links: [
      { name: 'GitHub', href: 'https://github.com/fortran-lang' },
      { name: 'Discord', href: '/community/discord' },
      { name: 'Twitter', href: 'https://twitter.com/fortranlang' },
      { name: 'Contribute', href: '/contribute' },
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
  { name: 'Discord', icon: Discord, href: '/community/discord' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/fortranlang' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/fortran' },
];

export function Footer() {
  return (
    <footer className="border-t border-border-dark bg-surface-dark-primary">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
            {/* Brand */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-cyan">
                  <span className="font-heading font-bold text-deep-space">F²</span>
                </div>
                <span className="font-heading text-xl font-bold text-content-dark-primary">
                  Fortran<span className="text-brand-cyan">²</span>
                </span>
              </Link>
              <p className="mt-4 max-w-xs text-sm text-content-dark-secondary">
                The next-generation Fortran programming language for computational science and high-performance computing.
              </p>
              {/* Social links */}
              <div className="mt-6 flex gap-4">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-content-dark-tertiary hover:text-brand-cyan transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                  >
                    <item.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <h3 className="text-sm font-semibold text-content-dark-primary">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-content-dark-secondary hover:text-brand-cyan transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-dark pt-8 md:flex-row">
            <p className="text-sm text-content-dark-tertiary">
              © {new Date().getFullYear()} Fortran². All rights reserved.
            </p>
            <p className="text-sm text-content-dark-tertiary">
              Built with Next.js and Tailwind CSS
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
