import type { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata, siteConfig } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description:
    'Learn how ToolHarbor processes information when you use the site. Tool inputs stay in your browser. GDPR and LSSI-CE information.',
  path: '/privacy-policy',
  keywords: ['privacy policy', 'cookies', 'gdpr', 'data protection', 'lssi-ce'],
});

const LAST_UPDATED = '2026-02-11';
const CONTACT_EMAIL = 'toolharbordev@gmail.com';
const DATA_CONTROLLER_NAME = 'Francisco Pérez Muñoz';
const DATA_CONTROLLER_COUNTRY = 'Spain';

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
        <a href={siteConfig.url} className="text-primary hover:text-primary-hover underline">
          {siteConfig.url}
        </a>{' '}
        (the &quot;Site&quot;). This policy is designed to comply with the General Data Protection
        Regulation (GDPR) and Spain&apos;s LSSI-CE.
      </p>

      <Section title="Data Controller">
        <p>The data controller responsible for your personal data is:</p>
        <ul className="list-none space-y-1 pl-0">
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Name:</strong>{' '}
            {DATA_CONTROLLER_NAME}
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Location:</strong>{' '}
            {DATA_CONTROLLER_COUNTRY}
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Contact:</strong>{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-primary hover:text-primary-hover underline"
            >
              {CONTACT_EMAIL}
            </a>
          </li>
        </ul>
      </Section>

      <Section title="Summary (TL;DR)">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">
              Tool inputs stay in your browser:
            </strong>{' '}
            Text you paste into tools (e.g., JSON, JWTs, regexes) is processed locally on your
            device. We do not operate an API for the tools and we do not intentionally receive or
            store that content on our servers.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">
              No ads or analytics are currently enabled:
            </strong>{' '}
            At this time, we do not display ads and we do not run third-party analytics on the Site.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">
              Basic log data may be processed:
            </strong>{' '}
            Our hosting and security providers may process IP address and request metadata for
            reliability, security, and debugging.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">You have rights:</strong> You can
            access, rectify, erase, or port your data, object to processing, and lodge a complaint
            with the Spanish Data Protection Agency (AEPD).
          </li>
        </ul>
      </Section>

      <Section title="Information We Process">
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">
              Content you provide to tools:
            </strong>{' '}
            The Site is designed so that most tools run entirely client-side. We do not ask you to
            create an account, and we do not provide a feature for submitting tool input to us. As a
            result, tool input is generally processed only in your browser.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">
              Contact information (if you email us):
            </strong>{' '}
            If you contact us, we will receive the information you send (such as your email address
            and message content) and may use it to respond.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Log and device data:</strong> When
            you access the Site, our infrastructure providers may process standard technical
            information such as IP address, user agent, approximate location (inferred from IP),
            requested pages, timestamps, and error logs.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Cookies / identifiers:</strong> We
            do not intentionally set cookies for advertising or analytics, and we do not currently
            use third-party analytics or advertising services on the Site.
          </li>
        </ul>
      </Section>

      <Section title="Advertising and Analytics (if enabled in the future)">
        <p>
          If we enable advertising and/or third-party analytics in the future (for example, ad
          networks or analytics providers), those services may use cookies, similar technologies, or
          device identifiers. If/when we enable them, we will update this policy and our{' '}
          <Link href="/cookie-policy" className="text-primary hover:text-primary-hover underline">
            Cookie Policy
          </Link>{' '}
          accordingly.
        </p>
      </Section>

      <Section title="Consent (EEA / UK / Switzerland)">
        <p>
          If we enable non-essential cookies/identifiers in the future (for example, for analytics
          or advertising) and you visit from the European Economic Area (EEA), United Kingdom, or
          Switzerland, we will request consent where legally required before those technologies are
          used.
        </p>
        <p>
          For more details about cookies and similar technologies, see our{' '}
          <Link href="/cookie-policy" className="text-primary hover:text-primary-hover underline">
            Cookie Policy
          </Link>
          .
        </p>
      </Section>

      <Section title="Purposes and Legal Bases for Processing">
        <p>
          Under the GDPR, we must have a lawful basis for processing personal data. Below are the
          purposes for which we process data and the corresponding legal bases:
        </p>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">
              Operating and securing the Site
            </strong>{' '}
            (server logs, security measures)
            <br />
            <em>Legal basis:</em> Legitimate interest (Article 6(1)(f) GDPR) – we have a legitimate
            interest in maintaining site security, preventing abuse, and ensuring reliable
            operation.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">
              Third-party services (if enabled in the future)
            </strong>{' '}
            (for example, analytics or advertising providers)
            <br />
            <em>Legal basis:</em> Consent (Article 6(1)(a) GDPR) where required for non-essential
            cookies/identifiers, especially for users in the EEA/UK/Switzerland.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">
              Responding to your inquiries
            </strong>{' '}
            (if you contact us by email)
            <br />
            <em>Legal basis:</em> Legitimate interest (Article 6(1)(f) GDPR) – we have a legitimate
            interest in responding to communications. Where your inquiry relates to a contract or
            potential contract, contractual necessity (Article 6(1)(b)) may also apply.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">
              Complying with legal obligations
            </strong>
            <br />
            <em>Legal basis:</em> Legal obligation (Article 6(1)(c) GDPR) – we may process data when
            required to comply with applicable laws.
          </li>
        </ul>
      </Section>

      <Section title="Sharing and Service Providers">
        <p>
          We may share information with service providers and partners that help us operate the
          Site, including infrastructure and security providers.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">
              Hosting/security providers:
            </strong>{' '}
            to deliver the Site, protect it from abuse, and troubleshoot issues (may include logging
            and CDN services).
          </li>
        </ul>
        <p>These parties may process data in accordance with their own privacy policies.</p>
      </Section>

      <Section title="Data Retention">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Tool inputs:</strong> We do not
            intentionally store tool input on our servers.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Server logs:</strong>{' '}
            Infrastructure providers may retain logs for a limited period for security and
            reliability.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Email:</strong> If you contact us,
            we may keep correspondence as long as needed to respond and maintain records.
          </li>
        </ul>
      </Section>

      <Section title="International Data Transfers">
        <p>
          Our service providers (including hosting/CDN providers) may process information on servers
          located in different countries, including the United States. As a result, your information
          may be transferred to, stored, or processed outside your country of residence.
        </p>
        <p>
          For transfers of personal data from the EEA/UK/Switzerland to countries that do not have
          an adequacy decision from the European Commission, our service providers rely on
          appropriate safeguards such as:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
          <li>The EU-U.S. Data Privacy Framework (where applicable)</li>
          <li>Other legally recognized transfer mechanisms</li>
        </ul>
        <p>
          If we add third-party providers in the future (for example, analytics or advertising),
          additional international transfers may occur. We will update this policy accordingly.
        </p>
      </Section>

      <Section title="Security">
        <p>
          We use reasonable technical measures to help protect the Site. However, no method of
          transmission or storage is 100% secure, and we cannot guarantee absolute security.
        </p>
      </Section>

      <Section title="Your Rights Under GDPR">
        <p>
          If you are in the European Economic Area (EEA), United Kingdom, or Switzerland, you have
          the following rights regarding your personal data:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">
              Right of access (Article 15):
            </strong>{' '}
            You can request confirmation of whether we process your personal data and obtain a copy.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">
              Right to rectification (Article 16):
            </strong>{' '}
            You can request correction of inaccurate personal data.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">
              Right to erasure (Article 17):
            </strong>{' '}
            You can request deletion of your personal data in certain circumstances (&quot;right to
            be forgotten&quot;).
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">
              Right to restriction (Article 18):
            </strong>{' '}
            You can request that we limit how we use your data in certain situations.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">
              Right to data portability (Article 20):
            </strong>{' '}
            You can request to receive your personal data in a structured, commonly used,
            machine-readable format.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">
              Right to object (Article 21):
            </strong>{' '}
            You can object to processing based on legitimate interest, including profiling.
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">
              Right to withdraw consent (Article 7):
            </strong>{' '}
            Where processing is based on consent (e.g., advertising cookies), you can withdraw
            consent at any time. Withdrawal does not affect the lawfulness of processing before
            withdrawal.
          </li>
        </ul>
        <p>
          <strong className="text-zinc-900 dark:text-zinc-100">Note:</strong> Because our tools
          process data locally in your browser and we do not store tool inputs on our servers,
          access and deletion requests typically relate only to any correspondence you may send us
          (e.g., email).
        </p>
        <p>
          To exercise any of these rights, contact us at{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-primary hover:text-primary-hover underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </Section>

      <Section title="Right to Lodge a Complaint">
        <p>
          If you believe that we have violated your data protection rights, you have the right to
          lodge a complaint with a supervisory authority. Since we are based in Spain, our lead
          supervisory authority is the:
        </p>
        <p className="mt-2">
          <strong className="text-zinc-900 dark:text-zinc-100">
            Agencia Española de Protección de Datos (AEPD)
          </strong>
          <br />
          Website:{' '}
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-hover underline"
          >
            https://www.aepd.es
          </a>
          <br />
          Address: C/ Jorge Juan, 6, 28001 Madrid, Spain
        </p>
        <p className="mt-2">
          You may also lodge a complaint with the supervisory authority in your country of residence
          or place of work if different from Spain.
        </p>
      </Section>

      <Section title="Your Choices">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-zinc-900 dark:text-zinc-100">Browser controls:</strong> You can
            remove or block cookies via your browser settings (note: some features may not work as
            intended).
          </li>
        </ul>
      </Section>

      <Section title="Children’s Privacy">
        <p>
          The Site is not directed to children under 13 (or the minimum age required in your
          jurisdiction), and we do not knowingly collect personal information from children.
        </p>
      </Section>

      <Section title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. We will post the updated version on
          this page and update the &quot;Last updated&quot; date above.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          If you have questions about this Privacy Policy, contact us at{' '}
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
