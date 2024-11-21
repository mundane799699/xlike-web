import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import { Metadata } from "next";
// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata: Metadata = {
  title: `Terms and Conditions | ${config.appName}`,
  alternates: {
    canonical: "/tos",
  },
};

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: September 24, 2024

Welcome to Xlike!

These Terms of Service ("Terms") govern your use of the Xlike browser extension ("Extension") and any associated services provided by Xlike Software Tech. By using our Extension and services, you agree to these Terms.

1. Description of Xlike

Xlike is a browser extension that allows users to save and search their Twitter likes & bookmarks, storing the data in IndexedDB for easy access and management.

2. Ownership and Usage Rights

When you install the Xlike extension, you gain the right to use it for personal, non-commercial purposes. You own the data you save using Xlike but do not have the right to redistribute or resell the extension or its code.

3. User Data and Privacy

We store your liked tweets data locally in your browser's IndexedDB. We do not collect or store this data on our servers. For more information on how we handle your data, please refer to our Privacy Policy [link to privacy policy].

4. Non-Personal Data Collection

We may use cookies or similar technologies to collect non-personal data for the purpose of improving our services and user experience.

5. Twitter Terms of Service

Your use of Xlike must also comply with Twitter's Terms of Service. Xlike is not affiliated with, endorsed, or sponsored by Twitter.

6. Limitation of Liability

Xlike is provided "as is" without any warranties. We are not responsible for any loss of data or other damages that may occur from the use of our extension.

7. Governing Law

These Terms are governed by the laws of US.

8. Updates to the Terms

We may update these Terms from time to time. Users will be notified of any significant changes via the extension or our website.

For any questions or concerns regarding these Terms of Service, please contact Xlike Software Tech at zfyoung799699@gmail.com.

Thank you for using Xlike!`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
