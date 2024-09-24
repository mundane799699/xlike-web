import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: marc@shipfa.st

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
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
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: September 24, 2024

Thank you for using Xlike ("we," "us," or "our"). This Privacy Policy outlines how we collect, use, and protect your personal and non-personal information when you use our browser extension Xlike (the "Extension").

By installing or using the Extension, you agree to the terms of this Privacy Policy. If you do not agree with the practices described in this policy, please do not use the Extension.

1. Information We Collect

1.1 Personal Data

We collect and store the following personal information:

- User account information: We collect your email address when you create an account to enable multi-device synchronization.
- Twitter likes data: We store your Twitter likes data on our secure servers to provide seamless access across multiple devices.

1.2 Non-Personal Data

We may use cookies or similar technologies to collect non-personal information such as your browser type, device information, and Extension usage patterns. This information helps us to enhance your experience, analyze trends, and improve our services.

2. Data Storage and Usage

2.1 Twitter Like Data

The Extension initially stores your Twitter likes data locally in your browser's IndexedDB. To enable multi-device access, this data is also securely transmitted to and stored on our servers.

2.2 Purpose of Data Storage

We store your Twitter likes data for the following purposes:
- To allow you to search and manage your likes within the Extension
- To provide synchronization of your likes across multiple devices
- To backup your data to prevent loss

3. Data Sharing

We do not share your personal data or Twitter likes data with third parties, except as required to provide our services (e.g., cloud storage providers). We do not sell, trade, or rent your personal information to others.

4. Data Security

We implement industry-standard security measures to protect your data both during transmission and once we receive it. However, no method of transmission over the internet or electronic storage is 100% secure.

5. Twitter's Terms of Service

Your use of Xlike must comply with Twitter's Terms of Service. Xlike is not affiliated with, endorsed, or sponsored by Twitter.

6. Children's Privacy

Xlike is not intended for children under the age of 13. We do not knowingly collect or store information from children.

7. Updates to the Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any updates will be posted within the Extension, and we may notify you about significant changes.

8. Your Rights

You have the right to access, correct, or delete your personal information and Twitter likes data stored on our servers. You can exercise these rights by contacting us at the email address provided below.

9. Contact Information

If you have any questions, concerns, or requests related to this Privacy Policy, you can contact us at:

Email: zfyoung799699@gmail.com

By using Xlike, you consent to the terms of this Privacy Policy.`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
