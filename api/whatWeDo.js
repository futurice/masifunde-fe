/* eslint-disable import/prefer-default-export */
import { fetchSingleEntry } from './contentfulService'
import { unwrapImage, unwrapPortrait, unwrapStat } from './common'

function unwrapFields(response) {
  return response.fields
}

export async function fetchWhatWeDoPage(locale) {
  const content = await fetchSingleEntry('pageWasWirMachen', locale)

  function createProject(project) {
    return {
      ...project.fields,
      image: {
        title: project.fields.image.fields.title,
        url: project.fields.image.fields.file.url,
      },
    }
  }

  const programmes = [
    {
      title: content.projectsTitleSa,
      description: content.projectsDescriptionSa,
      projects: content.projectsSa.map(createProject),
      button: content.projectsButtonSa,
    },
    {
      title: content.projectsTitleDe,
      description: content.projectsDescriptionDe,
      projects: content.projectsDe.map(createProject),
      button: content.projectsButtonDe,
    },
  ]

  return {
    ...content,
    programmes,
    stats: content.stats.map(unwrapFields),
  }
}

const unwrapProjects = ({ fields }) => ({
  ...fields,
  image: unwrapImage(fields.image),
})

export async function fetchApproachDePage(locale) {
  const content = await fetchSingleEntry('pageApproachDE', locale)
  return {
    ...content,
    projects: content.projects.map(unwrapProjects),
  }
}

export async function fetchImpactPage(locale) {
  const content = await fetchSingleEntry('pageImpact', locale)
  return {
    ...content,
    stats1: content.stats1.map(unwrapStat),
    stats2: content.stats2.map(unwrapStat),
    portrait1: unwrapPortrait(content.portrait1),
    portrait2: unwrapPortrait(content.portrait2),
  }
}

export async function fetchApproachSaPage(locale) {
  const content = await fetchSingleEntry('pageApproachSA', locale)
  return {
    ...content,
    projects: content.projects.map(unwrapProjects),
  }
}
