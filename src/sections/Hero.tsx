import { HeroScene } from '../components/scene';
import { Link } from '../lib/router';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroScene />
      <div className="wrap relative pt-12 pb-[440px] md:pt-20 lg:min-h-[min(860px,calc(100vh-72px))] lg:pt-24 lg:pb-40">
        <h1 id="hero-title" className="rise max-w-[11ch] text-[clamp(3.4rem,8.2vw,7.6rem)] leading-[0.96]">
          Recovery grows in rings, not straight lines.
        </h1>
        <p className="rise lede mt-7 !text-ink" style={{ animationDelay: '160ms' }}>
          A proposed mobile app to notice triggers, get through hard moments and stay close to support, for recovery from eating disorders or substance addiction.
        </p>
        <div className="rise mt-7 flex flex-wrap gap-3" style={{ animationDelay: '280ms' }}>
          <Link to="/#demo" className="btn btn-solid">Try the app concept</Link>
          <Link to="/#join" className="btn btn-line">Join the interest list</Link>
        </div>
        <p className="rise mt-5 max-w-[50ch] text-[0.97rem] font-medium" style={{ animationDelay: '380ms' }}>
          In development as a university project. Not yet available to download. Non-clinical, and no replacement for professional care.
        </p>
      </div>
    </section>
  );
}
