import { GetStaticPaths, GetStaticProps } from 'next'
import { FC } from 'react'
import styled from 'styled-components'
import CenteredGrid from '../../components/CenteredGrid'
import CenteredText from '../../components/CenteredText'
import RoundedImage from '../../components/RoundedImage'
import TeamMember from '../../components/TeamMember'
import { LayoutPageProps, getLayoutProps } from '../../components/layout/Layout'
import Head from '../../components/shared/Head'
import Markdown from '../../components/shared/Markdown'
import PageSection from '../../components/shared/PageSection'
import DonationForm from '../../components/shared/donation/DonationForm'
import {
  CampaignContent,
  getCampaignContent,
} from '../../content/spendenaktion-content'
import { rem } from '../../styling/typography'
import useGuaranteedPath from '../../utils/useGuaranteedPath'
import useURLSearchParams from '../../utils/useURLSearchParams'

// Props & Path Params
// ===================

type Params = {
  locale: string
}

type Props = LayoutPageProps & CampaignContent

// Helpers
// =======

const StyledRoundedImage = styled(RoundedImage)`
  margin-bottom: 1rem;
  display: block;
`

const TeamMemberHeadline = styled.div`
  margin-bottom: 0.5rem;
  font-size: ${rem('18px')};
`

// Component
// =========

const Campaign: FC<Props> = ({
  metaTitle,
  metaDescription,
  introHeading,
  introMarkdown,
  imageList,
  contentMarkdown,
  teamMemberHeading,
  teamMember,
  section2Title,
  section2ReferenceList,
  amountHeading,
  amounts,
  formHeading,
  fundraisingboxIframeHeading,
}) => {
  // WORKAROUND: Currently, the "Einbettungsaddresse" ("embedding URL")
  // configured in Fundraisingbox does not have a locale prefix. To make
  // sure that the Fundraising iframe loads, we need to redirect to the
  // locale-less path so that the browser URL matches the iframe's
  // expectations.
  useGuaranteedPath('/spendenaktion')

  const urlSearchParams = useURLSearchParams()
  const iframeStatus = urlSearchParams.get('status')

  return (
    <>
      <Head title={metaTitle} description={metaDescription} />

      <PageSection>
        <h1>{introHeading}</h1>
        <CenteredText source={introMarkdown} />
      </PageSection>

      <CenteredGrid>
        <PageSection contained={false}>
          <div className="row">
            <div className="col-md">
              {imageList.map((image) => (
                <StyledRoundedImage
                  className="img-fluid"
                  key={image.file.url}
                  src={image.file.url}
                  alt={image.title}
                />
              ))}
            </div>
            <div className="col-md">
              <Markdown source={contentMarkdown} />
            </div>
          </div>
        </PageSection>

        <PageSection contained={false}>
          <TeamMemberHeadline>{teamMemberHeading}</TeamMemberHeadline>
          <div>
            <TeamMember
              imageUrl={teamMember.profileImage.file.url}
              title={teamMember.name}
              email={teamMember.email}
            />
          </div>
        </PageSection>
      </CenteredGrid>

      <DonationForm
        amounts={amounts}
        amountTitle={amountHeading}
        formTitle={formHeading}
        fundraisingboxIframeTitle={fundraisingboxIframeHeading}
        fundraisingboxFormHash="vm0g01lokj4l5e58"
        iframeStatus={iframeStatus}
        disableIntervalSelection={!section2ReferenceList.length}
        intervals={section2ReferenceList}
        intervalTitle={section2Title}
        enableOtherAmount
      />
    </>
  )
}

export const getStaticProps: GetStaticProps<Props, Params> = async (ctx) => {
  const { locale } = ctx.params!
  return {
    props: {
      ...(await getLayoutProps(locale)),
      ...(await getCampaignContent(locale)),
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

export default Campaign
