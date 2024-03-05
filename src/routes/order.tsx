import { OrderPage } from '@/app/page/Order/OrderPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/order')({
  component: OrderPage,
})
