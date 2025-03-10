import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export const Hero = () => (
  <div className="w-full bg-secondary/5">
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
        <div>
          <Badge variant="outline">We&apos;re cooking!</Badge>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="font-regular max-w-2xl text-center text-5xl tracking-tighter md:text-7xl">
            It&apos;s time to make something new
          </h1>
          <p className="max-w-2xl text-center text-lg leading-relaxed tracking-tight text-muted-foreground md:text-xl">
            Your bar is stocked but you&apos;re stuck making the same drinks.
            Stop scrolling through recipes you can&apos;t make. Tell us
            what&apos;s in your bar and we&apos;ll show you the perfect
            cocktails to pour tonight.
          </p>
        </div>
        <Button size="lg" variant="secondary">
          <Link href="#ingredients">Get started</Link>
          <MoveRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
);
