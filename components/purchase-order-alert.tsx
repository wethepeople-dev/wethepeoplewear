import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Package, Truck } from "lucide-react"
import { cn } from "@/lib/utils"

type OrderStatus = "processing" | "delivered" | "completed"

interface PurchaseOrderAlertProps {
  status: OrderStatus
  trackingUrl?: string
}

export default function PurchaseOrderAlert({ status, trackingUrl = "#" }: PurchaseOrderAlertProps) {
  const getAlertContent = () => {
    switch (status) {
      case "processing":
        return {
          icon: <CheckCircle2 className="h-4 w-4" />,
          title: "Orden Recibida",
          description: "Tu orden ha sido recibida. Estamos preparando tu paquete para envío.",
        }
      case "delivered":
        return {
          icon: <Truck className="h-4 w-4" />,
          title: "Paquete Enviado",
          description: "Tu paquete ha sido entregado. Da click en Rastrear para más detalles.",
          action: (
            <Button size="sm" asChild>
              <a href={trackingUrl} target="_blank">
                Rastrear paquete
              </a>
            </Button>
          ),
        }
      case "completed":
        return {
          icon: <CheckCircle2 className="h-4 w-4" />,
          title: "Orden Completada",
          description: "Tu orden ha sido entregada. Gracias por tu compra.",
        }
      default:
        return null
    }
  }

  const content = getAlertContent()

  if (!content) return null

  return (
    <Alert className={cn("border border-gray-300",
      status === "processing" && "bg-gray-200 text-gray-800",
      status === "delivered" && "bg-blue-100 text-blue-800",
      status === "completed" && "bg-green-100 text-green-800"
    )}>
      <div className="flex items-center gap-4">
        {content.icon}
        <div className="flex-1">
          <AlertTitle className="font-semibold">{content.title}</AlertTitle>
          <AlertDescription>{content.description}</AlertDescription>
        </div>
        {content.action}
      </div>
    </Alert>
  )
}