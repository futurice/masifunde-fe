/* eslint-disable */

// These typings are a workaround for:
// https://github.com/final-form/final-form-calculate/issues/47

import { Decorator } from 'final-form'

declare module 'final-form-calculate' {
  interface FFUpdatesByName<TFormValues> {
    [FieldName: string]: (
      value: unknown,
      allValues?: TFormValues,
      prevValues?: TFormValues
    ) => any
  }

  type FFUpdatesForAll<TFormValues = object> = (
    value: unknown,
    field: string,
    allValues?: TFormValues,
    prevValues?: TFormValues
  ) => { [FieldName: string]: any }

  type FFUpdates<TFormValues> =
    | FFUpdatesByName<TFormValues>
    | FFUpdatesForAll<TFormValues>

  interface FFCalculation<TFormValues> {
    field: FieldPattern
    updates: FFUpdates<TFormValues>
    isEqual?: (a: unknown, b: unknown) => boolean
  }

  export default function createDecorator<TFormValues = object>(
    ...calculations: FFCalculation<TFormValues>[]
  ): Decorator<TFormValues>
}
