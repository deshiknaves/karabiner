import { isObject, snakeCase } from 'lodash'
import { SnakeCasedPropertiesDeep } from 'type-fest'

export function convertKeysToSnakeCase<Data extends object>(
  input: Data
): SnakeCasedPropertiesDeep<Data> {
  if (!isObject(input) || input === null) {
    return input as SnakeCasedPropertiesDeep<Data>
  }

  if (Array.isArray(input)) {
    return input.map((item) =>
      convertKeysToSnakeCase(item as Data)
    ) as SnakeCasedPropertiesDeep<Data>
  }

  const result: Record<string, unknown> = {}
  for (const key in input) {
    if (key in input) {
      result[snakeCase(key)] = convertKeysToSnakeCase(input[key] as Data)
    }
  }

  return result as SnakeCasedPropertiesDeep<Data>
}
