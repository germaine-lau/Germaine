import Header from '@/components/Header';
import HeroImage from '@/components/HeroImage';
import Content from '@/components/Content';
import RichTextSection from '@/components/RichTextSection';
import ExperienceSection from '@/components/ExperienceSection';
import Footer from '@/components/Footer';
import PageLayout from '@/components/PageLayout';

const DEFAULT_NAV_ITEMS = [
  { label: 'about', href: '/about' },
  { label: 'contact', href: 'mailto:hello@germainelau.com' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/germaine-lau/' },
];

const DEFAULT_EXPERIENCE = [
  {
    title: 'Square',
    subtitle: 'Senior Designer',
    dates: 'August 2020 – Current',
  },
  {
    title: 'SFMOMA',
    subtitle: 'Design Studio Intern',
    dates: 'February 2018 – June 2018',
  },
  {
    title: 'Academy of Art University',
    subtitle: 'Graphic Design, BFA',
    award: '2020 Design Excellence Award',
  },
];

const DEFAULT_INTRO = `I’m Germaine, a multidisciplinary designer based in San Francisco. I focus on stretching brands in ways that feel human, expressive, and a little unexpected— without losing what makes them recognizable. 

In the last six years as a Senior Designer on the Square / Block creative team, my work spanned multiple campaigns, product launches, web systems, motion and video, and art direction across digital and physical spaces. Everything from large-scale, multi-city OOH experiences to the pillows you sat on at an event. 

Here’s a peek into how I work: I believe creativity is a team effort (I’ll bounce an idea off you, you can do the same to me), my sharpest thinking usually starts with an afternoon of heads-down time, and I treat every project as an opportunity to show up and push the work further.

I’m currently open for work. Reach out if you’d like to brainstorm an idea or speak about an opportunity. 

`;

export default function HomePage() {
  return (
    <PageLayout
      header={
        <Header
          logoName="germaine"
          tagline={'multidisciplinary designer + art director \n→ based in San Francisco, CA'}
          navItems={DEFAULT_NAV_ITEMS}
        />
      }
      heroImage={
        <HeroImage
          src="/images/WebProfile.png"
          alt="Portrait"
        />
      }
      content={
        <Content>
          <div className="max-w-[619px] w-full">
            <RichTextSection heading="Hello">{DEFAULT_INTRO}</RichTextSection>
          </div>
          <div className="w-full">
            <ExperienceSection title="Experience" items={DEFAULT_EXPERIENCE} />
          </div>
        </Content>
      }
      footer={<Footer leftContent="hello@germainelau.com" rightContent="2026" />}
    />
  );
}
