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

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        Privacy Policy
      </h1>
      <p className="mb-10 text-sm text-zinc-600 dark:text-zinc-400">
        Last updated: <span className="font-medium">{LAST_UPDATED}</span>
      </p>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p>
          This Privacy Policy explains how <strong>{siteConfig.name}</strong>{' '}
          (&quot;ToolHarbor&quot;, &quot;we&quot;, &quot;us&quot;) collects, uses, and shares
          information when you visit <a href={siteConfig.url}>{siteConfig.url}</a> (the
          &quot;Site&quot;).
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Basic usage data</strong>: Like most websites, our hosting and security systems
            may process information such as IP address, browser type, device information, pages
            visited, and timestamps for reliability, fraud prevention, and debugging.
          </li>
          <li>
            <strong>Cookies and similar technologies</strong>: We (and our partners) may use cookies
            or similar technologies to deliver and measure ads and to remember consent choices where
            required by law.
          </li>
        </ul>

        <h2>Advertising (Google AdSense)</h2>
        <p>
          We display ads on the Site using <strong>Google AdSense</strong>. Google may use cookies
          or device identifiers to serve ads, limit how often you see an ad, measure ad performance,
          and deliver ads based on your interests (where permitted).
        </p>
        <p>
          Learn more about how Google uses data from sites and apps that use its services:{' '}
          <a href="https://policies.google.com/technologies/partner-sites">
            https://policies.google.com/technologies/partner-sites
          </a>
          .
        </p>

        <h2>Consent (EEA / UK / Switzerland)</h2>
        <p>
          If you are located in the European Economic Area (EEA), the United Kingdom, or
          Switzerland, you will be shown a consent message that lets you choose between{' '}
          <strong>Consent</strong>, <strong>Do not consent</strong>, and{' '}
          <strong>Manage options</strong>.
        </p>
        <p>
          AdSense automatically provides a consent revocation link on pages where the European
          regulations message is shown (typically labeled &quot;Privacy and cookie settings&quot;),
          allowing you to revisit and update your choices.
        </p>

        <h2>How we use information</h2>
        <ul>
          <li>To operate and secure the Site</li>
          <li>To provide and improve the tools and user experience</li>
          <li>To display and measure ads via AdSense</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2>Sharing</h2>
        <p>
          We may share information with service providers and partners that help us operate the
          Site, including advertising partners such as Google. These parties may process data in
          accordance with their own policies.
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>
            <strong>Consent controls</strong>: If shown, use the consent message to manage your ad
            choices.
          </li>
          <li>
            <strong>Browser controls</strong>: You can usually remove or block cookies via your
            browser settings (note: some features may not work as intended).
          </li>
          <li>
            <strong>Google privacy controls</strong>: See{' '}
            <a href="https://myadcenter.google.com/">https://myadcenter.google.com/</a>.
          </li>
        </ul>

        <h2>Contact</h2>
        <p>
          If you have questions about this Privacy Policy, contact us at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>

        <h2>Related</h2>
        <p>
          Go back to <Link href="/tools">All Tools</Link>.
        </p>
      </div>
    </main>
  );
}
