import ContactForm from "@/src/components/Contact/ContactForm";
import LottieAnimation from "@/src/components/Contact/LottieAnimation";
import React from "react";

const Contact = () => {
  return (
    <section className="w-full h-[75vh] border-b-2 border-solid border-dark flex flex-row items-center">
      <div className="inline-block w-2/5 h-full border-r-2 border-solid border-dark">
        <LottieAnimation />
      </div>
      <div className="w-3/5 flex flex-col items-start justify-center px-16 pb-8">
        <h2 className="font-bold capitalize text-4xl">Let's Connect!</h2>
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
