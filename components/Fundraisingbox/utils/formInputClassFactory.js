/* eslint-disable import/prefer-default-export */
export const formInputClassFactory = meta =>
  `form-control ${meta.error && meta.touched ? 'is-invalid' : ''}`
