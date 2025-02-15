import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Hero = () => (
  <div className="w-full">
    <div className="container mx-auto">
      <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
        <div>
          <Badge variant="outline">We&apos;re cooking!</Badge>
        </div>
        <div className="flex gap-4 flex-col">
          <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
            It&apos;s time to make something new
          </h1>
          <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
            Your bar is stocked but you&apos;re stuck making the same drinks.
            Stop scrolling through recipes you can&apos;t make. Tell us
            what&apos;s in your bar and we&apos;ll show you the perfect
            cocktails to pour tonight.
          </p>
        </div>
        <Button size="lg" variant="secondary">
          Get started <MoveRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
);
