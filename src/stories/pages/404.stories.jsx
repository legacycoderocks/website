import ErrorPage from '../../pages/404'

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