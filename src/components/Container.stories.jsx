import { Container } from './Container'

export default {
  title: 'Components/Container',
  component: Container,
  tags: ['autodocs'],
}

export const Default = {
  args: {
    children: (
      <div className="h-32 bg-brand-yellow-300 flex items-center justify-center">
        <p className="text-lg font-bold">Container Content</p>
      </div>
    ),
  },
}

export const WithText = {
  args: {
    children: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Sample Heading</h2>
        <p className="text-base text-slate-700">
          This is sample content inside a Container component. The Container
          provides consistent padding and max-width across the application.
        </p>
      </div>
    ),
  },
}