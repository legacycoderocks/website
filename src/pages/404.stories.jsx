import ErrorPage from './404'

export default {
  title: 'Pages/404 Error',
  component: ErrorPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export const Default = {
  render: () => <ErrorPage />,
}