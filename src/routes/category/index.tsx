import { Categories } from '@/app/page/Category/Categories/Categories'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/category/')({
  component: Categories,
})
