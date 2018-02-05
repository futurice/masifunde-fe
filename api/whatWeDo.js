/* eslint-disable import/prefer-default-export */
import { RouteNames } from '../routes'
import { fetchSingleEntry } from './contentfulService'
import {
  unwrapFields,
  unwrapImage,
  unwrapPageUrl,
  unwrapPortrait,
  unwrapStat,
  unwrapTeamMember,
} from './common'
import { jpegQuality } from '../utils/constants'

export async function fetchWhatWeDoPage(locale) {
  const content = await fetchSingleEntry('pageWasWirMachen', locale)

  function createProject(project) {
    return {
      ...project.fields,
      image: unwrapImage(project && project.fields && project.fields.image),
    }
  }

  const countries = {
    southAfrica: {
      buttonLink: RouteNames.ApproachSA,
      title: content && content.projectsTitleSa,
      description: content && content.projectsDescriptionSa,
      projects: content && content.projectsSa.map(createProject),
      button: content && content.projectsButtonSa,
    },
    germany: {
      buttonLink: RouteNames.ApproachDE,
      title: content && content.projectsTitleDe,
      description: content && content.projectsDescriptionDe,
      projects: content && content.projectsDe.map(createProject),
      button: content && content.projectsButtonDe,
    },
  }

  return {
    ...content,
    countries,
    stats: content && content.stats.map(unwrapFields),
    bannerButtonUrl: unwrapPageUrl(content.bannerButtonUrl),
  }
}

const unwrapProjects = ({ fields }) => ({
  ...fields,
  image: unwrapImage(fields && fields.image),
})

export async function fetchApproachDePage(locale) {
  const content = await fetchSingleEntry('pageApproachDE', locale)
  return {
    ...content,
    teamMember: unwrapTeamMember(content && content.teamMember),
    image1: unwrapImage(content && content.image1, { q: jpegQuality }),
    projects: content && content.projects.map(unwrapProjects),
    bannerButtonUrl: unwrapPageUrl(content.bannerButtonUrl),
  }
}

export async function fetchImpactPage(locale) {
  const content = await fetchSingleEntry('pageImpact', locale)
  return {
    ...content,
    stats1: content && content.stats1.map(unwrapStat),
    stats2: content && content.stats2.map(unwrapStat),
    portrait1: unwrapPortrait(content && content.portrait1),
    portrait2: unwrapPortrait(content && content.portrait2),
    bannerButtonUrl: unwrapPageUrl(content.bannerButtonUrl),
  }
}

export async function fetchApproachSaPage(locale) {
  const content = await fetchSingleEntry('pageApproachSA', locale)
  return {
    ...content,
    projects: content && content.projects.map(unwrapProjects),
    bannerButtonUrl: unwrapPageUrl(content.bannerButtonUrl),
  }
}
