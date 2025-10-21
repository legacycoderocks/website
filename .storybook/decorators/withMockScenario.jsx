import { setMockScenario, resetMockScenario } from '../../src/api/__mocks__/mockDataManager'
import { useEffect } from 'react'

/**
 * Storybook decorator that sets the mock data scenario before rendering
 *
 * Usage in stories:
 * export const MyStory = {
 *   parameters: {
 *     mockScenario: 'fewEpisodes'
 *   }
 * }
 */
export const withMockScenario = (Story, context) => {
  const scenario = context.parameters.mockScenario || 'default'

  useEffect(() => {
    setMockScenario(scenario)
    return () => resetMockScenario()
  }, [scenario])

  // Also set it immediately for server component rendering
  setMockScenario(scenario)

  return <Story />
}
