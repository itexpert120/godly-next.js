/* eslint-disable @next/next/no-img-element */
"use client";
import { React, useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import QuoteButton from "@/components/quoteButton";
import Airtable from "airtable";
import {} from "@/components/ui/dialog";
import { ChevronDown, ChevronUp } from "lucide-react";

const servicesList = [
  { id: "exterior-window-cleaning", name: "Exterior Window Cleaning" },
  { id: "house-washing", name: "House Washing" },
  { id: "seal-pavers", name: "Seal Pavers" },
  { id: "screen-cleaning", name: "Screen Cleaning" },
  { id: "interior-window-cleaning", name: "Interior Window Cleaning" },
  { id: "roof-washing", name: "Roof Washing" },
  { id: "pressure-washing", name: "Pressure Washing" },
  { id: "light-fixture-cleaning", name: "Light Fixture Cleaning" },
  { id: "gutter-cleaning", name: "Gutter Cleaning" },
];

export default function QuoteForm() {
  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: [],
    zipcode: "",
    agree: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const servicesRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setShowServices(false);
      }
    }

    // Add event listener when dropdown is open
    if (showServices) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showServices]);

  // Initialize Airtable
  const base = new Airtable({
    apiKey:
      "patUUfkvMZUeWcpBx.3b8a637c96292840817c1a291c161b70a0b5952d6a75d9ab0f000bb70a097e51",
  }).base("appzgFLd0zSxa5rIx");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submission if checkbox is not checked
    if (!formData.agree) {
      setSubmitStatus("error-no-agree");
      return;
    }

    if (formData.services.length === 0) {
      setSubmitStatus("error-no-services");
      return;
    }

    setIsSubmitting(true);

    try {
      await base("Form Table").create([
        {
          fields: {
            Name: formData.name,
            Email: formData.email,
            Phone: formData.phone,
            "Required Service": formData.services.join(", "),
            Date: date ? format(date, "MM/dd/yyyy") : "",
            ZipCode: formData.zipcode,
          },
        },
      ]);

      setSubmitStatus("success");
      setShowSuccessDialog(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        services: [],
        zipcode: "",
        agree: false,
      });
      setDate(new Date());
    } catch (error) {
      console.error("Error submitting to Airtable:", error);
      setSubmitStatus("error");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceToggle = (serviceName) => {
    setFormData((prev) => {
      if (prev.services.includes(serviceName)) {
        return {
          ...prev,
          services: prev.services.filter((service) => service !== serviceName),
        };
      } else {
        return {
          ...prev,
          services: [...prev.services, serviceName],
        };
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="paper-bg-14 relative w-full rounded-[10px] border bg-[#F3CA9E] bg-blend-screen shadow-md">
        <div className="paper-bg-14 relative z-20 flex h-[128px] items-center justify-between rounded-t-[10px] bg-[#AB8459] px-12 py-8">
          <h2 className="-mt-[51px] text-[64px] font-normal tracking-[3.2px] text-[#2D2B2B]">
            LET US CALL YOU!
          </h2>
          <p className="max-w-[367px] text-right font-[satoshi-medium] text-2xl font-medium text-[#2D2B2B]">
            Receive a call within 30 minutes
            <br /> during normal business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 px-12 py-8 md:grid-cols-12 md:grid-rows-2">
          <div className="md:col-span-4">
            <label className="mb-1 block font-sans text-base font-normal text-[#312E2C]">
              Name
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="rounded-none border-t-0 border-r-0 !border-b-1 border-l-0 border-black bg-transparent px-0 pb-3 text-2xl focus-visible:ring-0"
              required
            />
          </div>
          <div className="md:col-span-4">
            <label className="mb-1 block font-sans text-base font-normal text-[#312E2C]">
              Email
            </label>
            <Input
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              value={formData.email}
              onChange={handleChange}
              className="rounded-none border-t-0 border-r-0 border-b-1 border-l-0 border-black bg-transparent px-0 pb-3 text-2xl! focus-visible:ring-0"
              required
            />
          </div>
          <div className="md:col-span-4">
            <label className="mb-1 block font-sans text-base font-normal text-[#312E2C]">
              Phone Number
            </label>
            <Input
              name="phone"
              placeholder="123-456-7890"
              value={formData.phone}
              onChange={handleChange}
              className="rounded-none border-t-0 border-r-0 border-b-1 border-l-0 border-black bg-transparent px-0 pb-3 text-2xl! focus-visible:ring-0"
              required
            />
          </div>
          <div className="relative md:col-span-6" ref={servicesRef}>
            <label className="mb-1 block font-sans text-base font-normal text-[#312E2C]">
              What services do you need?
            </label>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowServices(!showServices);
              }}
              className="w-full rounded-none border-t-0 border-r-0 border-b-1 border-l-0 border-black bg-transparent px-0 pb-3 text-2xl! focus-visible:ring-0"
            >
              <div className="flex w-full items-center space-x-2">
                {formData.services.join(", ") || "Select Services"}
                {showServices ? (
                  <ChevronUp className="ms-auto" />
                ) : (
                  <ChevronDown className="ms-auto" />
                )}
              </div>
            </button>

            {showServices && (
              <div className="paper-bg-14 absolute top-full right-0 z-50 flex w-[335px] flex-col gap-5 rounded-lg bg-[#AB8459] p-6 shadow-xl">
                {servicesList.map((service) => (
                  <div
                    key={service.id}
                    className="flex cursor-pointer items-center"
                  >
                    <label
                      htmlFor={service.id}
                      className="flex-1 cursor-pointer text-base font-normal text-[#2D2B2B]"
                    >
                      {service.name}
                    </label>
                    <Checkbox
                      id={service.id}
                      checked={formData.services.includes(service.name)}
                      onCheckedChange={() => handleServiceToggle(service.name)}
                      className="size-[22px] bg-transparent"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between md:col-span-4">
            <label className="mb-1 block font-sans text-base font-normal text-[#312E2C]">
              When do you need the work done by?
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-lef2 flex w-full items-center border-b border-black bg-transparent pb-2 text-2xl focus:outline-none">
                  {date ? (
                    format(date, "MM / dd / yyyy")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  {/* <CalendarIcon className="inline ml-2 h-4 w-4 text-gray-500" /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    className="ms-auto inline"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1288_63)">
                      <path
                        d="M17.5191 3.00006H15.4066V4.50006C15.4066 4.64451 15.3765 4.78755 15.3181 4.92101C15.2597 5.05447 15.1741 5.17573 15.0662 5.27788C14.9584 5.38002 14.8303 5.46104 14.6893 5.51632C14.5483 5.57161 14.3973 5.60006 14.2447 5.60006C14.0921 5.60006 13.941 5.57161 13.8 5.51632C13.6591 5.46104 13.531 5.38002 13.4231 5.27788C13.3152 5.17573 13.2296 5.05447 13.1712 4.92101C13.1128 4.78755 13.0828 4.64451 13.0828 4.50006V3.00006H6.93005V4.50006C6.93005 4.7918 6.80763 5.07158 6.58974 5.27787C6.37184 5.48416 6.07631 5.60006 5.76816 5.60006C5.46001 5.60006 5.16447 5.48416 4.94658 5.27787C4.72868 5.07158 4.60627 4.7918 4.60627 4.50006V3.00006H2.49374C2.36806 2.9987 2.24336 3.02122 2.12704 3.06629C2.01071 3.11135 1.9051 3.17804 1.81647 3.26242C1.72784 3.3468 1.65798 3.44714 1.61103 3.55752C1.56407 3.6679 1.54098 3.78608 1.5431 3.90506V15.0951C1.54101 15.2119 1.56325 15.3281 1.60856 15.4368C1.65388 15.5455 1.72138 15.6448 1.8072 15.7288C1.89303 15.8129 1.9955 15.8801 2.10877 15.9266C2.22204 15.9731 2.34388 15.9981 2.46733 16.0001H17.5191C17.6425 15.9981 17.7644 15.9731 17.8777 15.9266C17.9909 15.8801 18.0934 15.8129 18.1792 15.7288C18.265 15.6448 18.3325 15.5455 18.3779 15.4368C18.4232 15.3281 18.4454 15.2119 18.4433 15.0951V3.90506C18.4454 3.78818 18.4232 3.67205 18.3779 3.56331C18.3325 3.45457 18.265 3.35534 18.1792 3.2713C18.0934 3.18726 17.9909 3.12005 17.8777 3.07351C17.7644 3.02697 17.6425 3.00201 17.5191 3.00006ZM5.76816 13.0001H4.71189V12.0001H5.76816V13.0001ZM5.76816 10.5001H4.71189V9.50006H5.76816V10.5001ZM5.76816 8.00006H4.71189V7.00006H5.76816V8.00006ZM8.93695 13.0001H7.88068V12.0001H8.93695V13.0001ZM8.93695 10.5001H7.88068V9.50006H8.93695V10.5001ZM8.93695 8.00006H7.88068V7.00006H8.93695V8.00006ZM12.1057 13.0001H11.0495V12.0001H12.1057V13.0001ZM12.1057 10.5001H11.0495V9.50006H12.1057V10.5001ZM12.1057 8.00006H11.0495V7.00006H12.1057V8.00006ZM15.2745 13.0001H14.2183V12.0001H15.2745V13.0001ZM15.2745 10.5001H14.2183V9.50006H15.2745V10.5001ZM15.2745 8.00006H14.2183V7.00006H15.2745V8.00006Z"
                        fill="#312E2C"
                      />
                      <path
                        d="M5.77032 5C5.91039 5 6.04472 4.94732 6.14376 4.85355C6.24281 4.75979 6.29845 4.63261 6.29845 4.5V1.5C6.29845 1.36739 6.24281 1.24021 6.14376 1.14645C6.04472 1.05268 5.91039 1 5.77032 1C5.63025 1 5.49592 1.05268 5.39687 1.14645C5.29783 1.24021 5.24219 1.36739 5.24219 1.5V4.5C5.24219 4.63261 5.29783 4.75979 5.39687 4.85355C5.49592 4.94732 5.63025 5 5.77032 5Z"
                        fill="#312E2C"
                      />
                      <path
                        d="M14.2195 5C14.3596 5 14.4939 4.94732 14.593 4.85355C14.692 4.75979 14.7477 4.63261 14.7477 4.5V1.5C14.7477 1.36739 14.692 1.24021 14.593 1.14645C14.4939 1.05268 14.3596 1 14.2195 1C14.0795 1 13.9451 1.05268 13.8461 1.14645C13.747 1.24021 13.6914 1.36739 13.6914 1.5V4.5C13.6914 4.63261 13.747 4.75979 13.8461 4.85355C13.9451 4.94732 14.0795 5 14.2195 5Z"
                        fill="#312E2C"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1288_63">
                        <rect
                          width="19.0127"
                          height="18"
                          fill="white"
                          transform="translate(0.488281)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto bg-white p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block pb-2 font-sans text-base font-normal text-[#312E2C]">
              Zip Code
            </label>
            <Input
              name="zipcode"
              placeholder="12345"
              value={formData.zipcode}
              onChange={handleChange}
              className="rounded-none border-t-0 border-r-0 border-b-1 border-l-0 border-black bg-transparent px-0 pb-3 text-2xl! focus-visible:ring-0"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-between px-12 pb-6">
          <div className="mt-4 flex items-center space-x-3">
            <Checkbox
              id="agree"
              name="agree"
              checked={formData.agree}
              className="size-[22px] bg-transparent"
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, agree: checked }))
              }
            />
            <label htmlFor="agree" className="font-sans text-xl">
              I agree to get information text messages from Godly about my
              estimate and project
            </label>
          </div>

          <div className="mt-6 text-right">
            <QuoteButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Request a Quote"}
            </QuoteButton>
          </div>
        </div>
        <img
          src={"/assets/tape-hero.png"}
          alt="cardBg"
          className="absolute top-0 left-full z-10 h-[266.58px] w-[234.158px] -translate-x-[calc(50%_+_38px)] -translate-y-[calc(50%_-_48px)] rotate-[-17.311deg]"
        />
      </div>
      {submitStatus === "error" && (
        <div className="mt-4 rounded bg-red-100 p-4 text-red-700">
          Error submitting form. Please try again.
        </div>
      )}
      {submitStatus === "error-no-agree" && (
        <div className="mt-4 rounded bg-red-100 p-4 text-red-700">
          Please agree to the terms before submitting.
        </div>
      )}
      {submitStatus === "error-no-services" && (
        <div className="mt-4 rounded bg-red-100 p-4 text-red-700">
          Please select at least one service before submitting.
        </div>
      )}

      {showSuccessDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm rounded-xl bg-[#f9f0df] p-6 text-center shadow-lg">
            <h2 className="mb-4 text-3xl font-normal tracking-wide text-[#2D2B2B]">
              THANK YOU
            </h2>
            <p className="mb-6 font-sans text-[#2D2B2B]">
              I agree to receive updates from Godly
              <br />
              about my estimate via text message
            </p>
            <button
              onClick={() => setShowSuccessDialog(false)}
              className="rounded-md bg-[#2D2B2B] px-8 py-2 font-semibold text-white shadow transition-all hover:bg-[#1c1a1a]"
            >
              DONE
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
