/* eslint-disable import/prefer-default-export */
import { RouteNames } from '../routes'
import { fetchSingleEntry } from './contentfulService'
import { unwrapImage, unwrapFields, unwrapPortrait, unwrapStat } from './common'

export async function fetchWhatWeDoPage(locale) {
  const content = await fetchSingleEntry('pageWasWirMachen', locale)

  function createProject(project) {
    return {
      ...project.fields,
      image: {
        title:
          project &&
          project.fields &&
          project.fields.image &&
          project.fields.image.fields &&
          project.fields.image.fields.title,
        url:
          project &&
          project.fields &&
          project.fields.image &&
          project.fields.image.fields &&
          project.fields.image.fields.file &&
          project.fields.image.fields.file.url,
      },
    }
  }

  const programmes = [
    {
      buttonLink: RouteNames.ApproachSA,
      title: content && content.projectsTitleSa,
      description: content && content.projectsDescriptionSa,
      projects: content && content.projectsSa.map(createProject),
      button: content && content.projectsButtonSa,
    },
    {
      buttonLink: RouteNames.ApproachDE,
      title: content && content.projectsTitleDe,
      description: content && content.projectsDescriptionDe,
      projects: content && content.projectsDe.map(createProject),
      button: content && content.projectsButtonDe,
    },
  ]

  return {
    ...content,
    programmes,
    stats: content && content.stats.map(unwrapFields),
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
    projects: content && content.projects.map(unwrapProjects),
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
  }
}

export async function fetchApproachSaPage(locale) {
  const content = await fetchSingleEntry('pageApproachSA', locale)
  return {
    ...content,
    projects: content && content.projects.map(unwrapProjects),
  }
}
