/* eslint-disable import/prefer-default-export */
import { fetchSingleEntry } from './contentfulService'
import { unwrapImage } from './common'

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
    heroImage: {
      ...content.heroImage.fields,
      url: content.heroImage.fields.file.url,
    },
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

export async function fetchApproachSaPage(locale) {
  const content = await fetchSingleEntry('pageApproachSA', locale)
  return {
    ...content,
    projects: content.projects.map(unwrapProjects),
  }
}
