#!/usr/bin/env node

// Load environment variables from .env file
const { loadEnvConfig } = require('@next/env')
const { spawn } = require('child_process')
const path = require('path')

// Load .env file from project root
const projectDir = path.join(__dirname, '..')
loadEnvConfig(projectDir)

// Run chromatic with the loaded environment variables
const chromatic = spawn('npx', ['chromatic'], {
  stdio: 'inherit',
  env: process.env
})

chromatic.on('close', (code) => {
  process.exit(code)
})
