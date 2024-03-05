import { CategoryPage } from '@/app/page/Category/CategoryPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/category/$categoryid')({
  component: CategoryPage,
})
