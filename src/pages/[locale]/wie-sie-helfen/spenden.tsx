import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import { Container } from 'reactstrap'
import styled from 'styled-components'
import Banner from '../../../components/Banner'
import FundraisingboxForm from '../../../components/FundraisingboxForm'
import {
  LayoutPageProps,
  getLayoutProps,
} from '../../../components/layout/Layout'
import CenteredText from '../../../components/shared/CenteredText'
import Head from '../../../components/shared/Head'
import Markdown from '../../../components/shared/Markdown'
import PageSection from '../../../components/shared/PageSection'
import {
  DonateContent,
  getDonateContent,
} from '../../../content/wie-sie-helfen-content'
import { extraSmallSpacing } from '../../../styling/sizes'
import useGuaranteedPath from '../../../utils/useGuaranteedPath'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & DonateContent

// Helpers
// =======

const MainHeading = styled.h1`
  width: 100%;
`

const MarkdownWithCustomList = styled(Markdown)`
  ul {
    list-style-image: url('/static/images/bullet-check.svg');

    li {
      margin-top: ${extraSmallSpacing};
    }
  }
`

// Component
// =========

const Donate: FC<Props> = ({
  bannerButtonText,
  bannerButtonUrl,
  bannerTitle,
  introHeading,
  introMarkdown,
  intro2Markdown,
  metaDescription,
  metaTitle,
}) => {
  // WORKAROUND: Currently, the "Einbettungsaddresse" ("embedding URL")
  // configured in Fundraisingbox does not have a locale prefix. To make
  // sure that the Fundraising iframe loads, we need to redirect to the
  // locale-less path so that the browser URL matches the iframe's
  // expectations.
  useGuaranteedPath('/wie-sie-helfen/spenden')

  return (
    <>
      <Head title={metaTitle} description={metaDescription} />

      <PageSection>
        <MainHeading>{introHeading}</MainHeading>
        <CenteredText source={introMarkdown} />
      </PageSection>

      <Container>
        <MarkdownWithCustomList source={intro2Markdown} />
      </Container>

      <FundraisingboxForm hash="j3ip42zwp3mlewb9" />
      {/* Test form: <FundraisingboxForm hash="bbnwvf9g9btio2va" /> */}

      <Banner
        headline={bannerTitle}
        buttonText={bannerButtonText}
        buttonLink={bannerButtonUrl}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale } = ctx.params!
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getDonateContent(locale)),
    },
  }
}

export const getStaticPaths: GetStaticPaths<Params> = () => {
  return {
    paths: [
      {
        params: { locale: 'de' },
      },
      {
        params: { locale: 'en' },
      },
    ],
    fallback: false,
  }
}

export default Donate
