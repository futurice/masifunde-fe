export const formInputClassFactory = (meta) =>
  `form-control ${meta.error && meta.touched ? 'is-invalid' : ''}`
