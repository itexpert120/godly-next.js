import React from "react";
import "@/styles/fourstepprocess.css";
import Image from "next/image";
import img1 from "@/assets/howitworks1.png";
import img2 from "@/assets/howitworks2.png";
import img3 from "@/assets/howitworks3.png";
import SectionButton from "@/components/sectionButton";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: <Image src={img1} alt="scrub" className="fourstepicon" />,
      title: "CALL US",
      text: "Call us or get a quote to get your free estimate and schedule your service",
    },
    {
      number: "02",
      icon: <Image src={img2} alt="squeegee" className="fourstepicon" />,
      title: "COUNT ON US",
      text: "We show up exactly as scheduled, honoring both our word and your time.",
    },
    {
      number: "03",
      icon: <Image src={img3} alt="detail" className="fourstepicon" />,
      title: "DONE RIGHT",
      text: "We deliver honest, quality work with a smile and won’t leave until you’re satisfied.",
    },
  ];

  return (
    <div
      id="process"
      className="paper-bg-16 flex flex-col items-center justify-items-center bg-[#efe5db] bg-cover bg-center bg-no-repeat p-16 pb-24 bg-blend-multiply"
    >
      <h1
        className="text-grain text-[64px] font-normal text-[#191717]"
        data-text="HOW IT WORKS"
      >
        HOW IT WORKS
      </h1>
      <h4
        className="text-grain -mt-2 text-[32px] font-normal text-[#61503E]"
        data-text="IN 3 SIMPLE STEPS"
      >
        IN 3 SIMPLE STEPS
      </h4>
      <div
        className="pt-16 pb-16 text-white"
        // style={{ marginTop: "1rem", marginBottom: "3rem" }}
      >
        <div className="relative z-10 flex flex-wrap justify-center gap-6 px-4 sm:gap-2 sm:px-4 md:gap-4 md:px-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative z-10 w-80 rounded-md bg-[#e7e3e0] p-6 text-black shadow">
                <h5 className="text-[32px] font-normal text-[#AE9D8A]">
                  #
                  <span
                    className="text-grain font-[Stencil]"
                    data-text={step.number}
                  >
                    {step.number}
                  </span>
                </h5>

                <div
                  className="mt-2 text-left text-4xl"
                  style={{ marginBottom: "1rem" }}
                >
                  {step.title}
                </div>
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <p className="text-left font-sans text-sm">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SectionButton />
    </div>
  );
};

export default HowItWorks;
