import { Pagination } from './Pagination'

export default {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    allPageNumbers: {
      control: 'object',
      description: 'Array of all page numbers',
    },
    currentPage: {
      control: 'number',
      description: 'The current page number',
    },
  },
}

const allPageNumbers = Array.from({ length: 25 }, (_, i) => i + 1)

export const FirstPage = {
  args: {
    allPageNumbers,
    currentPage: 1,
  },
}

export const SecondPage = {
  args: {
    allPageNumbers,
    currentPage: 2,
  },
}

export const MiddlePage = {
  args: {
    allPageNumbers,
    currentPage: 10,
  },
}

export const SecondToLastPage = {
  args: {
    allPageNumbers,
    currentPage: 24,
  },
}

export const LastPage = {
  args: {
    allPageNumbers,
    currentPage: 25,
  },
}

export const FewPages = {
  args: {
    allPageNumbers: [1, 2, 3, 4, 5],
    currentPage: 3,
  },
}