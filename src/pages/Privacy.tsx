import { CONTACT_EMAIL, MAILTO } from '../data/site';
import { Link } from '../lib/router';

const SECTIONS: [string, string][] = [
  ['What this website collects', 'The website itself has no sign-up form and no accounts, and it does not collect personal information. No analytics or advertising cookies are set.'],
  ['The app demonstration', 'Anything you type into the demonstration stays in your browser’s memory for that visit. It is not sent anywhere and it is not saved. It disappears when you refresh or leave the page. Please enter fictional text only.'],
  ['Your theme choice', 'If you choose light or dark mode, your browser remembers that one setting on your own device using local storage. It contains no personal information.'],
  ['If you email us', 'Your email app sends your message to our team’s Gmail account. We receive your email address and whatever you write. We use it only to reply and, if you asked, to tell you about Berkano. We will delete it if you ask us to. Please do not send health details.'],
  ['External links', 'The Resources page links to other organisations. Their websites have their own privacy practices, which we do not control.'],
];

export function Privacy() {
  return (
    <section className="wrap py-14 md:py-20" aria-labelledby="privacy-title">
      <h1 id="privacy-title" className="text-[clamp(3rem,7vw,5.5rem)]">Privacy notice</h1>
      <p className="prose-w mt-6 text-xl text-ink-2">This site collects as little as possible. Last updated 4 November 2026.</p>
      <div className="mt-12 grid max-w-3xl gap-9">
        {SECTIONS.map(([h, t]) => (
          <div key={h} className="border-t border-line pt-5">
            <h2 className="text-[1.8rem]">{h}</h2>
            <p className="prose-w mt-2 text-ink-2">{t}</p>
          </div>
        ))}
        <div className="border-t border-line pt-5">
          <h2 className="text-[1.8rem]">Contact us</h2>
          <p className="prose-w mt-2 text-ink-2">
            To ask about your information or remove it, email <a className="tlink font-semibold" href={MAILTO.general}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

export function NotFound() {
  return (
    <section className="wrap py-24" aria-labelledby="nf-title">
      <h1 id="nf-title" className="text-[clamp(3rem,7vw,5.5rem)]">This page could not be found.</h1>
      <p className="mt-5 text-xl text-ink-2">The link may be out of date.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className="btn btn-solid">Go to the home page</Link>
        <Link to="/resources" className="btn btn-line">Open support resources</Link>
      </div>
    </section>
  );
}
