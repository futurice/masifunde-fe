import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import styled from 'styled-components'
import Banner from '../../../components/Banner'
import Hero from '../../../components/Hero'
import Link from '../../../components/Link'
import {
  LayoutPageProps,
  getLayoutProps,
} from '../../../components/layout/Layout'
import Button from '../../../components/shared/Button'
import CenteredGrid from '../../../components/shared/CenteredGrid'
import CenteredText from '../../../components/shared/CenteredText'
import Head from '../../../components/shared/Head'
import PageSection from '../../../components/shared/PageSection'
import AwardsListItem from '../../../components/wer-wir-sind/AwardsListItem'
import CountryMap from '../../../components/wer-wir-sind/CountryMap'
import PartnersList from '../../../components/wer-wir-sind/PartnersList'
import TestimonialList from '../../../components/wer-wir-sind/TestimonialList'
import {
  WhoWeAreContent,
  getWhoWeAreContent,
} from '../../../content/wer-wir-sind-content'
import * as pages from '../../../routes/pages'
import { mediumSpacing } from '../../../styling/sizes'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & WhoWeAreContent

// Helpers
// =======

const StyledPartnerList = styled(PartnersList)`
  margin-bottom: ${mediumSpacing};
`

const AwardsContainer = styled.div`
  margin-top: ${mediumSpacing};
`

const PatronsText = styled(CenteredText)`
  margin-bottom: ${mediumSpacing};
`

// Component
// =========

const WhoWeAre: FC<Props> = ({
  title,
  paragraphOneTitle,
  paragraphOneText,
  paragraphTwoTitle,
  paragraphTwoText,
  paragraphThreeTitle,
  paragraphThreeText,
  bannerHeadline,
  bannerText,
  bannerButtonUrl,
  metaDescription,
  metaTitle,
  partnersButtonText,
  teamSaImage,
  teamSaButtonText,
  teamDeImage,
  teamDeButtonText,
  partnersListOne,
  awards,
  patronsHeadline,
  patronsText,
  patronsList,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />

    <Hero
      backgroundPositionX="70%"
      headline={title}
      imageUrl="/static/images/hero/hero-wer-wir-sind.jpg"
      headlinePlacement="bottom"
      headlineShadow
    />

    <PageSection>
      <h1>{paragraphOneTitle}</h1>
      <CenteredText source={paragraphOneText} />
      <div className="row justify-content-md-center">
        <CountryMap
          href={pages.teamDE}
          buttonText={teamDeButtonText}
          image={teamDeImage}
        />
        <CountryMap
          href={pages.teamSA}
          buttonText={teamSaButtonText}
          image={teamSaImage}
        />
      </div>
    </PageSection>

    <PageSection>
      <h2>{patronsHeadline}</h2>
      <PatronsText source={patronsText ?? ''} />
      <CenteredGrid withoutContainer>
        <TestimonialList testimonials={patronsList} />
      </CenteredGrid>
    </PageSection>

    <PageSection>
      <h1>{paragraphTwoTitle}</h1>
      <CenteredText source={paragraphTwoText} />
      <StyledPartnerList partners={partnersListOne} />
      <Link href={pages.becomePartner} passHref>
        <Button center>{partnersButtonText}</Button>
      </Link>
    </PageSection>

    <PageSection>
      <h1>{paragraphThreeTitle}</h1>
      <CenteredText source={paragraphThreeText} />
      <AwardsContainer>
        {awards.map((award) => (
          <AwardsListItem
            key={award.name}
            name={award.name}
            description={award.description}
            logoUrl={award.logo.file.url}
          />
        ))}
      </AwardsContainer>
    </PageSection>

    <Banner
      headline={bannerHeadline}
      buttonText={bannerText}
      buttonLink={bannerButtonUrl}
    />
  </div>
)

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale } = ctx.params!
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getWhoWeAreContent(locale)),
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

export default WhoWeAre
