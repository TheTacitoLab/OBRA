import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How OBRA collects, uses and protects your personal data, and your rights under UK data protection law.",
  alternates: { canonical: "/privacy/" },
  // Without this the page inherits the homepage og:url from the root layout.
  openGraph: { url: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <section className="pb-24 pt-32 sm:pt-40 md:pb-32">
      <Container>
        <div className="prose-privacy mx-auto max-w-3xl">
          <p className="text-label text-yellow">Legal</p>
          <h1 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-black uppercase leading-[1.02] text-white">
            Privacy Policy
          </h1>
          <p className="mt-4 text-body text-mute">Last updated 24 June 2026</p>

          <p className="mt-8 text-body text-ash">
            This privacy policy explains how OBRA (&ldquo;OBRA&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;), a TACITO
            Group company, collects, uses and protects your personal data when
            you visit {siteConfig.url.replace("https://", "")}, contact us or
            start a brief. We are committed to handling your personal data in
            line with the UK General Data Protection Regulation (UK GDPR) and the
            Data Protection Act 2018.
          </p>

          <h2 className="privacy-h2">1. Who we are</h2>
          <p className="privacy-p">
            OBRA is a football jersey studio operated by TACITO Group. For the
            purposes of UK data protection law, OBRA is the data controller
            responsible for your personal data. If you have any questions about
            this policy or how we handle your data, you can contact us at{" "}
            <a className="privacy-link" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            .
          </p>

          <h2 className="privacy-h2">2. The information we collect</h2>
          <p className="privacy-p">We may collect and process the following:</p>
          <ul className="privacy-ul">
            <li>
              <strong className="text-white">Information you give us.</strong>{" "}
              When you submit a brief or contact us, this can include your name,
              email address, the brand, project or organisation you represent,
              and any details you choose to share about your project.
            </li>
            <li>
              <strong className="text-white">
                Information we collect automatically.
              </strong>{" "}
              When you use our website we may collect technical and usage data
              such as your IP address, browser type, device information, pages
              viewed and how you interact with the site, collected through
              cookies and similar technologies.
            </li>
          </ul>

          <h2 className="privacy-h2">3. How and why we use your information</h2>
          <p className="privacy-p">
            We use your personal data for the following purposes, relying on the
            lawful bases set out below:
          </p>
          <ul className="privacy-ul">
            <li>
              To respond to your enquiry or brief and discuss a potential
              project (lawful basis: taking steps at your request prior to
              entering into a contract, and our legitimate interests in
              responding to enquiries).
            </li>
            <li>
              To provide our design and production services and manage our
              relationship with you (lawful basis: performance of a contract).
            </li>
            <li>
              To operate, maintain, secure and improve our website (lawful basis:
              our legitimate interests in running and improving our business).
            </li>
            <li>
              To send you updates or marketing where you have asked us to or
              where we are otherwise permitted to (lawful basis: consent or
              legitimate interests). You can opt out at any time.
            </li>
            <li>
              To comply with our legal and regulatory obligations (lawful basis:
              legal obligation).
            </li>
          </ul>

          <h2 className="privacy-h2">4. Cookies and analytics</h2>
          <p className="privacy-p">
            Our website may use cookies and similar technologies to make the site
            work, remember your preferences and understand how the site is used.
            Non-essential cookies, including analytics, are only set where
            permitted. You can control or delete cookies through your browser
            settings; blocking some cookies may affect how the site functions.
          </p>

          <h2 className="privacy-h2">5. Sharing your information</h2>
          <p className="privacy-p">
            We do not sell your personal data. We may share it with trusted third
            parties who process data on our behalf, such as hosting, email,
            analytics and form providers, and with our manufacturing and
            production partners where this is necessary to deliver a project.
            These parties are only permitted to use your data on our instructions
            and under appropriate contracts. We may also disclose your data where
            required by law or to protect our legal rights.
          </p>

          <h2 className="privacy-h2">6. International data transfers</h2>
          <p className="privacy-p">
            Some of our providers or partners may be located outside the United
            Kingdom. Where personal data is transferred outside the UK, we take
            steps to ensure it is protected by an appropriate safeguard, such as
            UK adequacy regulations or the International Data Transfer Agreement
            (or equivalent standard contractual clauses).
          </p>

          <h2 className="privacy-h2">7. How long we keep your information</h2>
          <p className="privacy-p">
            We keep your personal data only for as long as necessary for the
            purposes set out in this policy, including to meet any legal,
            accounting or reporting requirements. Enquiry and project data is
            typically retained for the duration of our relationship and for a
            reasonable period afterwards, after which it is securely deleted or
            anonymised.
          </p>

          <h2 className="privacy-h2">8. How we protect your information</h2>
          <p className="privacy-p">
            We use appropriate technical and organisational measures to protect
            your personal data against unauthorised access, loss, misuse or
            alteration. No method of transmission over the internet is completely
            secure, but we take reasonable steps to keep your data safe.
          </p>

          <h2 className="privacy-h2">9. Your rights</h2>
          <p className="privacy-p">
            Under UK data protection law you have the right to: access your
            personal data; ask us to correct inaccurate data; ask us to erase
            your data; restrict or object to our processing; request data
            portability; and, where processing is based on consent, withdraw that
            consent at any time. To exercise any of these rights, contact us at{" "}
            <a className="privacy-link" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            . We will respond within the timeframes required by law.
          </p>

          <h2 className="privacy-h2">10. Children</h2>
          <p className="privacy-p">
            Our website and services are not directed at children, and we do not
            knowingly collect personal data from anyone under the age of 16. If
            you believe a child has provided us with personal data, please
            contact us and we will delete it.
          </p>

          <h2 className="privacy-h2">11. Third-party links</h2>
          <p className="privacy-p">
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices or content of those sites, and
            we encourage you to read their privacy policies.
          </p>

          <h2 className="privacy-h2">12. Changes to this policy</h2>
          <p className="privacy-p">
            We may update this policy from time to time. Any changes will be
            posted on this page with an updated &ldquo;last updated&rdquo; date.
          </p>

          <h2 className="privacy-h2">13. How to contact us and complaints</h2>
          <p className="privacy-p">
            If you have any questions about this policy or wish to make a
            complaint, please contact us at{" "}
            <a className="privacy-link" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            . You also have the right to lodge a complaint with the UK
            Information Commissioner&rsquo;s Office (ICO) at{" "}
            <a
              className="privacy-link"
              href="https://ico.org.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              ico.org.uk
            </a>
            , though we would appreciate the chance to address your concerns
            first.
          </p>
        </div>
      </Container>
    </section>
  );
}
