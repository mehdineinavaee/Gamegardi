import Head from 'next/head'
import Image from 'next/image'
import Carousel from '../components/Carousel'
import GamesList from '../components/GamesList'
import Top from '../components/Top'

export default function Home({isMobile}) {
  return <>
  <Head>
    <meta name="enamad" content='938247'/>
  </Head>
    <Carousel isMobile={isMobile}  />
    <GamesList isMobile={isMobile} />
  </>
}
