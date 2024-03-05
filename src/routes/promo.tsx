import { PromoPage } from '@/app/page/Promo/PromoPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/promo')({
  component: PromoPage,
})
