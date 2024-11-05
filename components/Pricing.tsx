import config from "@/config";
import ButtonCheckout from "./ButtonCheckout";
import { Check } from "lucide-react";

// <Pricing/> displays the pricing plans for your app
// It's your Stripe config in config.js.stripe.plans[] that will be used to display the plans
// <ButtonCheckout /> renders a button that will redirect the user to Stripe checkout called the /api/stripe/create-checkout API endpoint with the correct priceId

const Pricing = () => {
  return (
    <section className="bg-base-200 overflow-hidden" id="pricing">
      <div className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <p className="font-medium text-primary mb-8">Pricing</p>
        </div>

        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {/* free plan */}
          <div className="relative w-full max-w-lg rounded-2xl bg-base-100 hover:scale-105 transition-transform duration-300 hover:shadow-xl">
            <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10  p-8 ">
              <div className="flex justify-between items-center gap-4">
                <div>
                  <p className="text-lg lg:text-xl font-bold">Free Plan</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col justify-end mb-[4px] text-lg ">
                  <p className="relative">
                    <span className="absolute bg-base-content h-[1.5px] inset-x-0 top-[53%]"></span>
                    <span className="text-base-content/80"></span>
                  </p>
                </div>
                <p className={`text-5xl tracking-tight font-extrabold`}>free</p>
                <div className="flex flex-col justify-end mb-[4px]">
                  <p className="text-xs text-base-content/60 uppercase font-semibold"></p>
                </div>
              </div>
              <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                <li className="flex items-center gap-2">
                  <Check className="w-[18px] h-[18px] opacity-80 shrink-0" />

                  <span>
                    Sync and search likes and bookmarks on your browser
                  </span>
                </li>
              </ul>
              <div className="space-y-2">
                <ButtonCheckout priceId={"1"} />
              </div>
            </div>
          </div>
          {/* 1 Month Plan */}
          <div className="relative w-full max-w-lg rounded-2xl bg-base-100 hover:scale-105 transition-transform duration-300 hover:shadow-xl">
            <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10  p-8 ">
              <div className="flex justify-between items-center gap-4">
                <div>
                  <p className="text-lg lg:text-xl font-bold">1 Month Plan</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col justify-end mb-[4px] text-lg ">
                  <p className="relative">
                    <span className="absolute bg-base-content h-[1.5px] inset-x-0 top-[53%]"></span>
                    <span className="text-base-content/80">$6</span>
                  </p>
                </div>
                <p className={`text-5xl tracking-tight font-extrabold`}>$3</p>
                <div className="flex flex-col justify-end mb-[4px]">
                  <p className="text-xs text-base-content/60 uppercase font-semibold">
                    USD
                  </p>
                </div>
              </div>
              <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                <li className="flex items-center gap-2">
                  <Check className="w-[18px] h-[18px] opacity-80 shrink-0" />

                  <span>
                    Sync and search likes and bookmarks on your browser
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <Check className="w-[18px] h-[18px] opacity-80 shrink-0" />

                  <span>Sync and search likes and bookmarks on xlike.pro</span>
                </li>

                <li className="flex items-center gap-2">
                  <Check className="w-[18px] h-[18px] opacity-80 shrink-0" />

                  <span>Get access for 1 month</span>
                </li>
              </ul>
              <div className="space-y-2">
                <ButtonCheckout priceId={"1"} />
              </div>
            </div>
          </div>
          {/* 3 Months Plan */}
          <div className="relative w-full max-w-lg rounded-2xl bg-base-100 hover:scale-105 transition-transform duration-300 hover:shadow-xl">
            <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10  p-8 ">
              <div className="flex justify-between items-center gap-4">
                <div>
                  <p className="text-lg lg:text-xl font-bold">3 Months Plan</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col justify-end mb-[4px] text-lg ">
                  <p className="relative">
                    <span className="absolute bg-base-content h-[1.5px] inset-x-0 top-[53%]"></span>
                    <span className="text-base-content/80">$18</span>
                  </p>
                </div>
                <p className={`text-5xl tracking-tight font-extrabold`}>$9</p>
                <div className="flex flex-col justify-end mb-[4px]">
                  <p className="text-xs text-base-content/60 uppercase font-semibold">
                    USD
                  </p>
                </div>
              </div>
              <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                <li className="flex items-center gap-2">
                  <Check className="w-[18px] h-[18px] opacity-80 shrink-0" />

                  <span>
                    Sync and search likes and bookmarks on your browser
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <Check className="w-[18px] h-[18px] opacity-80 shrink-0" />

                  <span>Sync and search likes and bookmarks on xlike.pro</span>
                </li>

                <li className="flex items-center gap-2">
                  <Check className="w-[18px] h-[18px] opacity-80 shrink-0" />

                  <span>Get access for 3 months</span>
                </li>
              </ul>
              <div className="space-y-2">
                <ButtonCheckout priceId={"1"} />
              </div>
            </div>
          </div>
          {/* 1 Year Plan */}
          <div className="relative w-full max-w-lg rounded-2xl bg-base-100 hover:scale-105 transition-transform duration-300 hover:shadow-xl">
            <div className="relative flex flex-col h-full gap-5 lg:gap-8 z-10  p-8 ">
              <div className="flex justify-between items-center gap-4">
                <div>
                  <p className="text-lg lg:text-xl font-bold">12 Months Plan</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col justify-end mb-[4px] text-lg ">
                  <p className="relative">
                    <span className="absolute bg-base-content h-[1.5px] inset-x-0 top-[53%]"></span>
                    <span className="text-base-content/80">$72</span>
                  </p>
                </div>
                <p className={`text-5xl tracking-tight font-extrabold`}>$36</p>
                <div className="flex flex-col justify-end mb-[4px]">
                  <p className="text-xs text-base-content/60 uppercase font-semibold">
                    USD
                  </p>
                </div>
              </div>
              <ul className="space-y-2.5 leading-relaxed text-base flex-1">
                <li className="flex items-center gap-2">
                  <Check className="w-[18px] h-[18px] opacity-80 shrink-0" />

                  <span>
                    Sync and search likes and bookmarks on your browser
                  </span>
                </li>

                <li className="flex items-center gap-2">
                  <Check className="w-[18px] h-[18px] opacity-80 shrink-0" />

                  <span>Sync and search likes and bookmarks on xlike.pro</span>
                </li>

                <li className="flex items-center gap-2">
                  <Check className="w-[18px] h-[18px] opacity-80 shrink-0" />

                  <span>Get access for 12 months</span>
                </li>
              </ul>
              <div className="space-y-2">
                <ButtonCheckout priceId={"1"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
