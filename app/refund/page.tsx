import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: `Refund Policy | ${config.appName}`,
  alternates: {
    canonical: "/refund",
  },
};

const RefundPolicy = () => {
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

1. Introduction
At ${config.appName}, operated by Xlike Software Tech, we strive to ensure our customers are satisfied with their purchases. If you are not entirely satisfied with your purchase, we're here to help.

2. Refund Eligibility
To be eligible for a refund, you must request it within 7 days of your purchase.
${config.appName} is a digital product, please ensure you have fully reviewed the product details before requesting a refund.
Proof of purchase is required.

3. Refund Process
To request a refund, please contact our customer support team at zfyoung799699@gmail.com with your order details. Once your refund request is received and reviewed, we will notify you of the status of your refund.

4. Approved Refunds
If your refund is approved, we will initiate a credit to your original method of payment. The timing of the refund will depend on your card issuer's policies.

5. Non-Refundable Items
Please note, we cannot provide refunds for:
- Any purchase requests made after 7 days
- Digital products that have already been downloaded or accessed
- Customized or personalized services

6. Contact Us
If you have any questions about our Refund Policy, please contact Xlike Software Tech at zfyoung799699@gmail.com`}
        </pre>
        <p className="mt-10 text-sm text-base-content text-end">
          Xlike Software Tech
        </p>
      </div>
    </main>
  );
};

export default RefundPolicy;
