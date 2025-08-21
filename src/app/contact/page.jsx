"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Head from "next/head";
import { useCreateContactEmailMutation } from "../../redux/services/AllEmails/contactApi";

const Contact = () => {
  const [createContactEmail, { isLoading }] = useCreateContactEmailMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    msg: "",
  });

  const [error, setError] = useState(null);
  const [done, setDone] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // For SSR-safe current URL
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.msg) {
      setError("All fields are required.");
      setDone(null);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.msg,
      };

      await createContactEmail(payload).unwrap();

      setDone("Your message has been sent successfully!");
      toast.success("Your message has been sent successfully!");
      setError(null);
      setFormData({ name: "", email: "", subject: "", msg: "" });
    } catch (err) {
      console.error("Submission error:", err);
      const errorMsg = err?.data?.error?.message || "Something went wrong. Please try again.";
      setError(errorMsg);
      setDone(null);
    }
  };

  const metaTitle = "Contact Us - Get in Touch with Us Anytime, Anywhere";
  const metaDescription =
    "Have questions or need assistance? We're here to help! Please fill out the form below, and our team at Calculator-Online will get back to you as soon as possible. We look forward to hearing from you!";
  const ogImage = `https://calculator-logical.com/images/ogview/pages/calculator-logical.png`;

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 px-5 mb-[60px]">
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:site_name" content="Calculator Logical" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        {currentUrl && <meta property="og:url" content={currentUrl} />}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@calculator-logical.com" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        {currentUrl && <link rel="canonical" href={currentUrl} />}
      </Head>

      <div className="flex lg:flex-row flex-col w-full z-50">
        {/* Left info section */}
        <div className="lg:w-[50%] w-full pr-4">
          <h1 className="lg:text-[35px] md:text-[24px] text-[24px] text-[#1A1A1A] lg:mt-[130px] mt-1 leading-[45.57px] font-[700] tracking-wider">
            Get in Touch with Us!
          </h1>
          <p className="text-[16px] lg:my-8 my-4 leading-[25.71px] font-[500] text-[#1A1A1A]">
            If you have any questions about our content or calculators, our team
            is here to help. Don’t hesitate to reach out with any queries!
          </p>
          {/* Social icons here if needed */}
        </div>

        {/* Right form section */}
        <div className="lg:w-[50%] w-full lg:mt-10 mt-8">
          {error && (
            <p className="text-sm text-center">
              <strong className="text-red-500 text-[18px]">{error}</strong>
            </p>
          )}
          {done && (
            <p className="text-sm text-center">
              <strong className="text-green-500 text-[16px]">{done}</strong>
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 xl:text-[14px] lg:text-[12px] text-[14px] font-medium text-[#000000] pl-5"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input_border bg-white border-[#F0F0F0] rounded-[13.5px] border-2 text-gray-900 text-sm block w-full 2xl:p-5 xl:p-4 lg:p-3 p-3"
                placeholder="Enter Your Name"
                required
              />
            </div>

            <div className="my-4">
              <label
                htmlFor="email"
                className="block mb-2 xl:text-[14px] lg:text-[12px] text-[14px] font-medium text-[#000000] pl-5"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input_border bg-white border-[#F0F0F0] rounded-[13.5px] border-2 text-gray-900 text-sm block w-full 2xl:p-5 xl:p-4 lg:p-3 p-3"
                placeholder="Enter Your Email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block mb-2 xl:text-[14px] lg:text-[12px] text-[14px] font-medium text-[#000000] pl-5"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="input_border bg-white border-[#F0F0F0] rounded-[13.5px] border-2 text-gray-900 text-sm block w-full 2xl:p-5 xl:p-4 lg:p-3 p-3"
                placeholder="Let us know how we can help you"
                required
              />
            </div>

            <div>
              <label
                htmlFor="msg"
                className="block my-2 xl:text-[14px] lg:text-[12px] text-[14px] font-medium text-[#000000] pl-5"
              >
                Message
              </label>
              <textarea
                id="msg"
                rows={5}
                name="msg"
                value={formData.msg}
                onChange={handleChange}
                className="input_border bg-white border-[#F0F0F0] rounded-[13.5px] border-2 text-gray-900 text-sm block w-full 2xl:p-5 xl:p-4 lg:p-3 p-3"
                placeholder="Message"
                required
              />
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-[#000] min-w-full py-5 shadow-2xl mb-8 text-[#fff] duration-200 font-[600] text-[16px] rounded-[44px] px-5 flex items-center justify-center
                ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#1A1A1A] hover:text-white"}`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="w-3 h-3 bg-white rounded-full animate-ping mr-2"></span>
                    Sending...
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
