import { MotionController } from "@/components/motion/motion-controller";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Education } from "@/components/sections/education";
import { Achievements } from "@/components/sections/achievements";
import { Stack } from "@/components/sections/stack";
import { DailyDrivers, OtherProjects, SelectedWork } from "@/components/sections/work";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <Achievements />
      <Stack />
      <SelectedWork />
      <DailyDrivers />
      <OtherProjects />
      <MotionController />
    </>
  );
}
