import Head from 'next/head'
import { ProseContainer } from '@/components/ProseContainer'

export function CardWithHeader({title, children}) {
  return (
    <>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow my-4 mb-6">
        <div className="not-prose px-4 py-5 sm:px-6 bg-brand-yellow-400">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </h3>
        </div>
        <div className="px-4 py-0">
          {children}
        </div>
      </div>
    </>
  )
}

export function SignUpButton({href, children}) {
  return (
    <div className="not-prose mb-5">
      <a
        href={href}
        className="rounded-md bg-brand-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red-600"
      >
        {children}
      </a>
    </div>
  )
}

export default function Community() {
  return (
    <>
      <Head>
        <title>
          Community - Legacy Code Rocks - Explore the world of modernizing existing software applications
        </title>
        <meta
          name="description"
          content="Explore the world of modernizing existing software applications"
        />
      </Head>
      <ProseContainer>
        <h1>Connect with Menders</h1>
        <p>
          Legacy Code Rocks isn't <em>just</em> a podcast. It's also a thriving
          community. There are several ways that you can connect with other
          listeners. Check out the options below.
        </p>

        <CardWithHeader title="Join Us on Slack">
          <p>
            <a href="http://slack.legacycode.rocks">Stay in the know with 
            Slack</a>. Share resources, discuss blog articles, find jobs, 
            ask technical questions, mentor others, and more. All while 
            getting to know the other 1,000 people who have already signed up.
          </p>
          <SignUpButton href="http://slack.legacycode.rocks">
            Join Now
          </SignUpButton>
        </CardWithHeader>

        <CardWithHeader title="Attend Our Virtual Meetup">
          <p>
            Every Wednesday at 1pm Eastern Time, you can join menders from 
            around the world to learn from each other, participate in code 
            katas, hash out project challenges, and more. 
          </p>

          <SignUpButton href="https://us02web.zoom.us/j/88113500864?pwd=YlNzSXQzeUdlVzVZL05yRmNGWVlUZz09">
            Join Now
          </SignUpButton>
        </CardWithHeader>

        <CardWithHeader title="Network and Learn At MenderCon">
          <p>
            Legacy Code Rocks launched an annual conference, <a href="https://mendercon.com">
            MenderCon</a> which is focused on exploring the joy in all things 
            related to software maintenance and improvement.
          </p>

          <SignUpButton href="https://mendercon.com">
            Join Now
          </SignUpButton>
        </CardWithHeader>

        <CardWithHeader title="Explore Example Codebases">
          <p>
            We feel strongly that examining codebases can be a great way to 
            learn. We've compiled and continue to nurture a list of notable
            codebases that have source code available. Want to see the code
            that landed humans on the moon? Want to dig into the source for
            the first web browser? Come and take a peek at <a href="https://github.com/legacycoderocks/awesome-legacy-code">
            Awesome Legacy Code</a> on GitHub.
          </p>

          <SignUpButton href="https://github.com/legacycoderocks/awesome-legacy-code">
            View the Repository
          </SignUpButton>
        </CardWithHeader>
      </ProseContainer>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {}
  }
}
