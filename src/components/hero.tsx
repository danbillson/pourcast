import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export const Hero = () => (
  <div className="bg-cream-50 w-full">
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
        <div className="flex flex-col gap-4">
          <h1 className="text-espresso-900 max-w-2xl text-center font-serif text-5xl font-medium tracking-tight md:text-7xl">
            It&apos;s time to make something new
          </h1>
          <p className="text-espresso-700 max-w-2xl text-center text-lg leading-relaxed tracking-tight md:text-xl">
            Your bar is stocked but you&apos;re stuck making the same drinks.
            Stop scrolling through recipes you can&apos;t make. Tell us
            what&apos;s in your bar and we&apos;ll show you the perfect
            cocktails to pour tonight.
          </p>
        </div>
        <Button
          size="lg"
          className="bg-espresso-700 text-cream-50 hover:bg-espresso-800"
        >
          <Link href="#ingredients">Get started</Link>
          <MoveRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);
