import { GeneralPage } from '@/app/page/Genral/GeneralPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: GeneralPage,
})
