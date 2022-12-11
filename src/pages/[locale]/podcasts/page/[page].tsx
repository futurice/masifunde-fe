import { GetStaticProps } from 'next'
import { FC } from 'react'
import { Container } from 'reactstrap'
import styled from 'styled-components'
import Banner from '../../../../components/Banner'
import { LayoutPageProps, getLayoutProps } from '../../../../components/Layout'
import PodcastList from '../../../../components/podcasts/PodcastList'
import PodcastListNavigationButtons from '../../../../components/podcasts/PodcastListNavigationButtons'
import Share from '../../../../components/podcasts/PodcastShareArea'
import Subscribe from '../../../../components/podcasts/PodcastSubscribeArea'
import Divider from '../../../../components/shared/Divider'
import Head from '../../../../components/shared/Head'
import PageSection from '../../../../components/shared/PageSection'
import TextWithPortraitPhoto from '../../../../components/shared/TextWithPortraitPhoto'
import {
  PodcastListPage,
  StaticPodcastPageContent,
  getPodcastListPage,
  getPodcastPageCount,
  getStaticPodcastPageContent,
} from '../../../../content/podcast-content'
import { lgBreakpoint, smBreakpoint } from '../../../../styling/breakpoints'
import { extraSmallSpacing, largeSpacing } from '../../../../styling/sizes'

// Props & Params
// ==============

type Params = {
  locale: string
  page: string
}

type Props = LayoutPageProps & StaticPodcastPageContent & PodcastListPage

// Helpers
// =======

const PodcastSubHeading = styled.h2`
  text-align: center;
  color: #271b19;
  font-weight: normal;
  font-size: 1.1rem;
`

const PodcastMarkdown = styled.div`
  margin: 0 auto;
  text-align: left;

  @media (min-width: ${lgBreakpoint}) {
    width: 100%;
  }

  h1 + & {
    margin-top: -${extraSmallSpacing};
  }
`

const PodcastListFooter = styled.div`
  margin-left: auto;
  margin-right: auto;

  @media (min-width: ${lgBreakpoint}) {
    width: 60%;
  }
`

const TeamMemberContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: ${smBreakpoint}) {
    display: block;
  }
`

const ExtendedDivider = styled(Divider)`
  margin-top: ${largeSpacing} !important;
`

const SubscribeAndShare = styled.div`
  margin-top: 24px;
  display: inline-block;
  width: 100%;
`

const PodcastSection = styled.div.attrs({ className: 'container' })`
  margin-top: 3rem;

  @media (min-width: ${smBreakpoint}) {
    margin-top: 2rem;
  }
`

// Component
// =========

const Podcasts: FC<Props> = ({
  metaTitle,
  metaDescription,
  introHeading,
  introSubHeading,
  introMarkdown,
  subscribeText,
  subscribeLinks,
  shareText,
  shareLinks,
  previousPageButtonText,
  nextPageButtonText,
  page,
  totalNumberOfPages,
  contactTextHeading,
  contactText,
  teamMember,
  bannerTitle,
  bannerButtonText,
  bannerButtonUrl,
  podcasts,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <PageSection>
      <h1>{introHeading}</h1>
      <PodcastSubHeading>{introSubHeading}</PodcastSubHeading>
      <PodcastMarkdown> {introMarkdown} </PodcastMarkdown>
      <SubscribeAndShare>
        <Subscribe
          subscribeText={subscribeText}
          subscribeLinks={subscribeLinks}
        />
        <Share shareText={shareText} shareLinks={shareLinks} />
      </SubscribeAndShare>
    </PageSection>

    <PodcastSection>
      <PodcastList podcasts={podcasts} />
    </PodcastSection>

    <Container>
      <PodcastListFooter>
        <PodcastListNavigationButtons
          previousPageButtonText={previousPageButtonText}
          nextPageButtonText={nextPageButtonText}
          page={page}
          totalNumberOfPages={totalNumberOfPages}
        />
      </PodcastListFooter>
    </Container>

    <ExtendedDivider color="orange" />
    <PageSection>
      <TeamMemberContainer>
        <TextWithPortraitPhoto
          header={contactTextHeading}
          text={contactText}
          portraitPhotoTitle={teamMember.name}
          portraitPhotoSubtitle={teamMember.responsibilityArea}
          portraitPhotoImageUrl={teamMember.profileImage.file.url}
          portraitPhotoEmail={teamMember.email}
        />
      </TeamMemberContainer>
    </PageSection>

    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink={bannerButtonUrl}
    />
  </div>
)

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale, page: pageString } = ctx.params!
  const page = parseInt(pageString, 10)
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getStaticPodcastPageContent(locale)),
      ...(await getPodcastListPage(page, locale)),
    },
  }
}

export async function getStaticPaths() {
  const pageCount = await getPodcastPageCount()
  const paths = []

  for (let i = 1; i <= pageCount; i++) {
    const page = String(i)
    paths.push({ params: { page, locale: 'de' } })
    paths.push({ params: { page, locale: 'en' } })
  }

  return { paths, fallback: false }
}

export default Podcasts
