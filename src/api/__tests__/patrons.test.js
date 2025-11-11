import { describe, it, expect, beforeAll } from 'vitest'
import nock from 'nock'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { loadEnvConfig } from '@next/env'
import { gunzipSync, gzipSync } from 'zlib'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables from .env files BEFORE importing patrons
const projectDir = join(__dirname, '..', '..', '..')
const envConfig = loadEnvConfig(projectDir)

// Ensure environment variables are loaded into process.env
if (envConfig && envConfig.combinedEnv) {
  Object.assign(process.env, envConfig.combinedEnv)
}

// Import patrons module AFTER environment variables are loaded
const { getPatronsByTier, getPatrons, getMembershipLevels } = await import('../patrons.js')

// Fake names for masking patron data
const fakeNames = [
  'Alice Anderson', 'Bob Brown', 'Charlie Chen', 'Diana Davis', 'Ethan Evans',
  'Fiona Foster', 'George Garcia', 'Hannah Harris', 'Ian Irving', 'Julia Johnson',
  'Kevin King', 'Laura Lee', 'Michael Moore', 'Nancy Nelson', 'Oliver Olson',
  'Patricia Parker', 'Quinn Quinn', 'Rachel Roberts', 'Samuel Smith', 'Tina Turner'
]

let nameIndex = 0
const idMap = new Map()
const nameMap = new Map()

function sanitizePatronData(data) {
  if (!data) return data

  // Helper to get consistent fake ID
  function getFakeId(realId) {
    if (!idMap.has(realId)) {
      idMap.set(realId, `fake-id-${idMap.size + 1}`)
    }
    return idMap.get(realId)
  }

  // Helper to get consistent fake name
  function getFakeName(realName) {
    if (!nameMap.has(realName)) {
      nameMap.set(realName, fakeNames[nameIndex % fakeNames.length])
      nameIndex++
    }
    return nameMap.get(realName)
  }

  // Recursively sanitize objects
  function sanitizeObject(obj) {
    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject)
    }

    if (obj && typeof obj === 'object') {
      const sanitized = {}
      for (const [key, value] of Object.entries(obj)) {
        // Mask patron IDs
        if (key === 'id' && typeof value === 'string') {
          sanitized[key] = getFakeId(value)
        }
        // Mask full names
        else if (key === 'full_name' && typeof value === 'string') {
          sanitized[key] = getFakeName(value)
        }
        // Mask email addresses
        else if (key === 'email' && typeof value === 'string') {
          sanitized[key] = `patron${idMap.size}@example.com`
        }
        // Recursively process nested objects
        else if (typeof value === 'object') {
          sanitized[key] = sanitizeObject(value)
        }
        // Keep other values as-is (tier titles, amounts, status, etc.)
        else {
          sanitized[key] = value
        }
      }
      return sanitized
    }

    return obj
  }

  return sanitizeObject(data)
}

describe('Patreon API Integration', () => {
  beforeAll(async () => {
    // Configure nockBack
    nock.back.fixtures = join(__dirname, 'fixtures')
    nock.back.setMode(process.env.NOCK_BACK_MODE || 'lockdown')
  })

  // Helper to normalize query parameters for matching
  function normalizeQueryParams(path) {
    const [pathname, queryString] = path.split('?')
    if (!queryString) return path

    // Parse query params
    const params = new URLSearchParams(queryString)

    // Sort params alphabetically
    const sortedParams = new URLSearchParams(
      [...params.entries()].sort((a, b) => a[0].localeCompare(b[0]))
    )

    return `${pathname}?${sortedParams.toString()}`
  }

  describe('getMembershipLevels', () => {
    it('should fetch and parse membership levels', async () => {
      const { nockDone } = await nock.back('patreon-membership-levels.json', {
        before: (scope) => {
          // Normalize query parameters to ignore order differences
          scope.filteringPath = (path) => normalizeQueryParams(path)
        },
        afterRecord: (scopes) => {
          return scopes.map(scope => {
            try {
              // Handle gzip-compressed responses
              if (scope.response && Array.isArray(scope.response) && scope.response.length > 0) {
                const hexResponse = scope.response[0]

                // Check if response is gzipped (hex starting with 1f8b)
                if (typeof hexResponse === 'string' && hexResponse.startsWith('1f8b')) {
                  // Decode hex -> buffer -> gunzip -> JSON
                  const buffer = Buffer.from(hexResponse, 'hex')
                  const decompressed = gunzipSync(buffer)
                  const jsonString = decompressed.toString('utf-8')
                  const parsed = JSON.parse(jsonString)

                  // Sanitize the data
                  const sanitizedData = sanitizePatronData(parsed)

                  // Re-gzip and encode to hex
                  const sanitizedJson = JSON.stringify(sanitizedData)
                  const recompressed = gzipSync(sanitizedJson)
                  scope.response[0] = recompressed.toString('hex')
                } else if (typeof hexResponse === 'string') {
                  // Non-gzipped JSON
                  try {
                    const parsed = JSON.parse(hexResponse)
                    scope.response[0] = JSON.stringify(sanitizePatronData(parsed))
                  } catch (e) {
                    // Not JSON, leave as-is
                  }
                }
              }
            } catch (e) {
              console.warn('Failed to sanitize response:', e.message)
            }

            // Remove auth headers
            if (scope.reqheaders) {
              delete scope.reqheaders.authorization
              delete scope.reqheaders.Authorization
            }
            return scope
          })
        }
      })

      const levels = await getMembershipLevels()
      expect(levels).toMatchSnapshot()

      nockDone()
    })
  })

  describe('getPatrons', () => {
    it('should fetch and parse active patrons', async () => {
      const { nockDone } = await nock.back('patreon-patrons.json', {
        before: (scope) => {
          // Normalize query parameters to ignore order differences
          scope.filteringPath = (path) => normalizeQueryParams(path)
        },
        afterRecord: (scopes) => {
          return scopes.map(scope => {
            try {
              // Handle gzip-compressed responses
              if (scope.response && Array.isArray(scope.response) && scope.response.length > 0) {
                const hexResponse = scope.response[0]

                // Check if response is gzipped (hex starting with 1f8b)
                if (typeof hexResponse === 'string' && hexResponse.startsWith('1f8b')) {
                  // Decode hex -> buffer -> gunzip -> JSON
                  const buffer = Buffer.from(hexResponse, 'hex')
                  const decompressed = gunzipSync(buffer)
                  const jsonString = decompressed.toString('utf-8')
                  const parsed = JSON.parse(jsonString)

                  // Sanitize the data
                  const sanitizedData = sanitizePatronData(parsed)

                  // Re-gzip and encode to hex
                  const sanitizedJson = JSON.stringify(sanitizedData)
                  const recompressed = gzipSync(sanitizedJson)
                  scope.response[0] = recompressed.toString('hex')
                } else if (typeof hexResponse === 'string') {
                  // Non-gzipped JSON
                  try {
                    const parsed = JSON.parse(hexResponse)
                    scope.response[0] = JSON.stringify(sanitizePatronData(parsed))
                  } catch (e) {
                    // Not JSON, leave as-is
                  }
                }
              }
            } catch (e) {
              console.warn('Failed to sanitize response:', e.message)
            }

            // Remove auth headers
            if (scope.reqheaders) {
              delete scope.reqheaders.authorization
              delete scope.reqheaders.Authorization
            }
            return scope
          })
        }
      })

      const patrons = await getPatrons()
      expect(patrons).toMatchSnapshot()

      nockDone()
    })
  })

  describe('getPatronsByTier', () => {
    it('should organize patrons by membership tier', async () => {
      const { nockDone } = await nock.back('patreon-by-tier.json', {
        before: (scope) => {
          // Normalize query parameters to ignore order differences
          scope.filteringPath = (path) => normalizeQueryParams(path)
        },
        afterRecord: (scopes) => {
          return scopes.map(scope => {
            try {
              // Handle gzip-compressed responses
              if (scope.response && Array.isArray(scope.response) && scope.response.length > 0) {
                const hexResponse = scope.response[0]

                // Check if response is gzipped (hex starting with 1f8b)
                if (typeof hexResponse === 'string' && hexResponse.startsWith('1f8b')) {
                  // Decode hex -> buffer -> gunzip -> JSON
                  const buffer = Buffer.from(hexResponse, 'hex')
                  const decompressed = gunzipSync(buffer)
                  const jsonString = decompressed.toString('utf-8')
                  const parsed = JSON.parse(jsonString)

                  // Sanitize the data
                  const sanitizedData = sanitizePatronData(parsed)

                  // Re-gzip and encode to hex
                  const sanitizedJson = JSON.stringify(sanitizedData)
                  const recompressed = gzipSync(sanitizedJson)
                  scope.response[0] = recompressed.toString('hex')
                } else if (typeof hexResponse === 'string') {
                  // Non-gzipped JSON
                  try {
                    const parsed = JSON.parse(hexResponse)
                    scope.response[0] = JSON.stringify(sanitizePatronData(parsed))
                  } catch (e) {
                    // Not JSON, leave as-is
                  }
                }
              }
            } catch (e) {
              console.warn('Failed to sanitize response:', e.message)
            }

            // Remove auth headers
            if (scope.reqheaders) {
              delete scope.reqheaders.authorization
              delete scope.reqheaders.Authorization
            }
            return scope
          })
        }
      })

      const patronsByTier = await getPatronsByTier()
      expect(patronsByTier).toMatchSnapshot()

      nockDone()
    })
  })
})
