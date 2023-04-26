import { Container } from '@/components/Container'

export function ProseContainer({children}) {
  return (
    <Container className='prose prose-h1:text-brand-red-500 prose-h2:mt-0 prose-a:text-brand-red-500'>
      {children}
    </Container>
  )
}
