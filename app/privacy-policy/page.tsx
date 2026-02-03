import type { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata, siteConfig } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description:
    'Learn how ToolHarbor collects, uses, and protects information, including cookies and Google AdSense advertising.',
  path: '/privacy-policy',
  keywords: ['privacy policy', 'cookies', 'adsense', 'gdpr', 'consent'],
});

const LAST_UPDATED = '2026-02-03';
const CONTACT_EMAIL = 'francisco.perez.munoz@gmail.com';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
      <div className="space-y-3 text-zinc-600 dark:text-zinc-400">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        Privacy Policy
      </h1>
      <p className="mb-10 text-sm text-zinc-500 dark:text-zinc-500">Last updated: {LAST_UPDATED}</p>

      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        This Privacy Policy explains how{' '}
        <strong className="text-zinc-900 dark:text-zinc-100">{siteConfig.name}</strong>{' '}
        (&quot;we&quot;, &quot;us&quot;) collects, uses, and shares information when you visit{' '}
        <a
          href={siteConfig.url}
          className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {siteConfig.url}
        </a>{' '}
        (the &quot;Site&quot;).
      </p>

      <Section title="What We Collect">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Basic usage data:</strong> Our
            hosting and security systems may process information such as IP address, browser type,
            device information, pages visited, and timestamps for reliability, fraud prevention, and
            debugging.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">
              Cookies and similar technologies:
            </strong>{' '}
            We (and our partners) may use cookies or similar technologies to deliver and measure ads
            and to remember consent choices where required by law.
          </li>
        </ul>
      </Section>

      <Section title="Advertising (Google AdSense)">
        <p>
          We display ads on the Site using{' '}
          <strong className="text-zinc-900 dark:text-zinc-100">Google AdSense</strong>. Google may
          use cookies or device identifiers to serve ads, limit how often you see an ad, measure ad
          performance, and deliver ads based on your interests (where permitted).
        </p>
        <p>
          Learn more about how Google uses data:{' '}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Google&apos;s Partner Sites Policy
          </a>
        </p>
      </Section>

      <Section title="Consent (EEA / UK / Switzerland)">
        <p>
          If you are located in the European Economic Area (EEA), the United Kingdom, or
          Switzerland, you will be shown a consent message with three options:{' '}
          <strong className="text-zinc-900 dark:text-zinc-100">Consent</strong>,{' '}
          <strong className="text-zinc-900 dark:text-zinc-100">Do not consent</strong>, and{' '}
          <strong className="text-zinc-900 dark:text-zinc-100">Manage options</strong>.
        </p>
        <p>
          AdSense automatically provides a &quot;Privacy and cookie settings&quot; link on pages
          where the European regulations message is shown, allowing you to revisit and update your
          choices at any time.
        </p>
      </Section>

      <Section title="How We Use Information">
        <ul className="list-disc space-y-1 pl-5">
          <li>To operate and secure the Site</li>
          <li>To provide and improve the tools and user experience</li>
          <li>To display and measure ads via AdSense</li>
          <li>To comply with legal obligations</li>
        </ul>
      </Section>

      <Section title="Sharing">
        <p>
          We may share information with service providers and partners that help us operate the
          Site, including advertising partners such as Google. These parties may process data in
          accordance with their own privacy policies.
        </p>
      </Section>

      <Section title="Your Choices">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Consent controls:</strong> If
            shown, use the consent message to manage your ad choices.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Browser controls:</strong> You can
            remove or block cookies via your browser settings (note: some features may not work as
            intended).
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Google privacy controls:</strong>{' '}
            Visit{' '}
            <a
              href="https://myadcenter.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              My Ad Center
            </a>{' '}
            to manage personalized ads.
          </li>
        </ul>
      </Section>

      <Section title="Contact">
        <p>
          If you have questions about this Privacy Policy, contact us at{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-blue-600 underline hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </Section>

      <div className="mt-12 border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <Link
          href="/tools"
          className="text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ← Back to All Tools
        </Link>
      </div>
    </main>
  );
}
