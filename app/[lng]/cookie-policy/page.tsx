import type { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata, siteConfig } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Cookie Policy',
  description:
    'Learn how ToolHarbor uses cookies and similar technologies. AEPD and GDPR cookie information.',
  path: '/cookie-policy',
  keywords: ['cookie policy', 'cookies', 'tracking technologies', 'gdpr', 'aepd', 'lssi-ce'],
});

const LAST_UPDATED = '2026-02-11';
const CONTACT_EMAIL = 'toolharbordev@gmail.com';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
      <div className="space-y-3 text-zinc-600 dark:text-zinc-400">{children}</div>
    </section>
  );
}

function CookieTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-700">
            <th className="px-3 py-2 text-left font-semibold text-zinc-900 dark:text-zinc-100">
              Category
            </th>
            <th className="px-3 py-2 text-left font-semibold text-zinc-900 dark:text-zinc-100">
              Purpose
            </th>
            <th className="px-3 py-2 text-left font-semibold text-zinc-900 dark:text-zinc-100">
              Provider
            </th>
            <th className="px-3 py-2 text-left font-semibold text-zinc-900 dark:text-zinc-100">
              Consent Required
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-zinc-100 dark:border-zinc-800">
            <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">
              No cookies set by us
            </td>
            <td className="px-3 py-2">We do not intentionally set cookies.</td>
            <td className="px-3 py-2">{siteConfig.name}</td>
            <td className="px-3 py-2">No</td>
          </tr>
          <tr className="border-b border-zinc-100 dark:border-zinc-800">
            <td className="px-3 py-2 font-medium text-zinc-900 dark:text-zinc-100">
              Analytics / Advertising
            </td>
            <td className="px-3 py-2">
              <strong className="text-zinc-900 dark:text-zinc-100">Not currently used.</strong> If
              enabled in the future, we will update this policy and request consent where legally
              required.
            </td>
            <td className="px-3 py-2">N/A</td>
            <td className="px-3 py-2">N/A</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function CookiePolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        Cookie Policy
      </h1>
      <p className="mb-10 text-sm text-zinc-500 dark:text-zinc-500">Last updated: {LAST_UPDATED}</p>

      {/* AEPD Layered Approach: This is the "second layer" detailed information */}
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        This Cookie Policy (the &quot;second layer&quot; of information per AEPD guidelines)
        explains in detail how{' '}
        <strong className="text-zinc-900 dark:text-zinc-100">{siteConfig.name}</strong> uses cookies
        and similar technologies on{' '}
        <a href={siteConfig.url} className="text-primary hover:text-primary-hover underline">
          {siteConfig.url}
        </a>
        .
      </p>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        This policy should be read together with our{' '}
        <Link href="/privacy-policy" className="text-primary hover:text-primary-hover underline">
          Privacy Policy
        </Link>
        .
      </p>

      <Section title="What Are Cookies and Similar Technologies?">
        <p>
          <strong className="text-zinc-900 dark:text-zinc-100">Cookies</strong> are small text files
          stored on your device by your browser when you visit a website. They allow the site to
          recognize your device and remember information about your visit.
        </p>
        <p>
          <strong className="text-zinc-900 dark:text-zinc-100">Similar technologies</strong>{' '}
          include:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Local storage / session storage:</strong> Browser storage mechanisms
          </li>
          <li>
            <strong>Pixels / web beacons:</strong> Tiny images that track page views
          </li>
          <li>
            <strong>Device identifiers:</strong> Unique IDs assigned to your device
          </li>
          <li>
            <strong>SDK identifiers:</strong> Identifiers used by mobile apps
          </li>
        </ul>
        <p>
          These technologies serve various purposes: making sites function, remembering preferences,
          analyzing usage, and delivering targeted advertising.
        </p>
      </Section>

      <Section title="Categories of Cookies We Use">
        <p>
          The following table summarizes the categories of cookies and similar technologies used on
          this Site:
        </p>
        <CookieTable />
        <p className="mt-4 text-sm">
          <strong className="text-zinc-900 dark:text-zinc-100">Note:</strong> Our developer tools
          process data entirely in your browser without sending it to our servers.
        </p>
      </Section>

      <Section title="Non-essential Cookies and Consent (EEA / UK / Switzerland)">
        <p>
          Under the EU ePrivacy Directive (implemented in Spain via LSSI-CE Article 22.2) and GDPR,
          non-essential cookies (such as advertising or analytics cookies) generally require{' '}
          <strong className="text-zinc-900 dark:text-zinc-100">prior consent</strong> where they are
          used.
        </p>
        <p>
          <strong className="text-zinc-900 dark:text-zinc-100">Current status:</strong> We do not
          currently use advertising or analytics cookies on this Site. For that reason, a cookie
          consent pop-up is not shown at this time.
        </p>
        <p>
          If we enable non-essential cookies in the future (for example, by turning on ads or
          third-party analytics), we will provide an appropriate consent mechanism and update this
          Cookie Policy and our{' '}
          <Link href="/privacy-policy" className="text-primary hover:text-primary-hover underline">
            Privacy Policy
          </Link>
          .
        </p>
      </Section>

      <Section title="Browser Cookie Controls">
        <p>
          Most browsers allow you to control cookies through their settings. Common options include:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>View and delete existing cookies</li>
          <li>Block all cookies or third-party cookies only</li>
          <li>Set exceptions for specific sites</li>
          <li>Clear cookies when you close the browser</li>
        </ul>
        <p>Browser-specific instructions:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover underline"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover underline"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover underline"
            >
              Apple Safari
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover underline"
            >
              Microsoft Edge
            </a>
          </li>
        </ul>
        <p className="mt-2 text-sm">
          <strong className="text-zinc-900 dark:text-zinc-100">Note:</strong> Blocking cookies may
          affect site functionality.
        </p>
      </Section>

      <Section title="Updates to This Policy">
        <p>
          We may update this Cookie Policy from time to time to reflect changes in our practices or
          legal requirements. When we do, we will update the &quot;Last updated&quot; date at the
          top of this page.
        </p>
      </Section>

      <Section title="Legal References">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <a
              href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover underline"
            >
              GDPR (Regulation 2016/679)
            </a>
          </li>
          <li>
            <a
              href="https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover underline"
            >
              LSSI-CE (Spain) – Article 22.2
            </a>
          </li>
          <li>
            <a
              href="https://www.aepd.es/guias/guia-cookies.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover underline"
            >
              AEPD Cookie Guide (Guía sobre el uso de las cookies)
            </a>
          </li>
          <li>
            <a
              href="https://www.edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover underline"
            >
              EDPB Guidelines 05/2020 on consent
            </a>
          </li>
        </ul>
      </Section>

      <Section title="Contact">
        <p>
          If you have questions about this Cookie Policy or wish to exercise your rights, contact us
          at{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-primary hover:text-primary-hover underline"
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
