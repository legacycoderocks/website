import Head from 'next/head'
import { ProseContainer } from '@/components/ProseContainer'

export default function About() {
  return (
    <>
      <Head>
        <title>
          About - Legacy Code Rocks - Explore the world of modernizing existing software applications
        </title>
        <meta
          name="description"
          content="Explore the world of modernizing existing software applications"
        />
      </Head>
      <ProseContainer>
        <h2>Content goes here!</h2>
        <p>This is a test</p>
      </ProseContainer>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {}
  }
}
