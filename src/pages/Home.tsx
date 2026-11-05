import { Hero } from '../sections/Hero';
import { Story } from '../sections/Story';
import { Features } from '../sections/Features';
import { Showcase } from '../sections/Showcase';
import { Stats } from '../sections/Stats';
import { Birch, Boundaries, Join, ResourcesTeaser, Team } from '../sections/Closing';

export function Home() {
  return (
    <>
      <Hero />
      <Story />
      <Features />
      <Showcase />
      <Stats />
      <Birch />
      <Boundaries />
      <Team />
      <ResourcesTeaser />
      <Join />
    </>
  );
}
