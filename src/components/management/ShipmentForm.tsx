// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Icons
import {
  Truck,
  X,
  Hash,
  Layers,
  MapPin,
  Calendar,
  Thermometer,
  Clock,
  FileText,
  Plus,
} from "lucide-react";

// Interface for ShipmentForm props
interface ShipmentFormProps {
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

// Form component for creating new shipment
const ShipmentForm = ({ onCancel, onSubmit }: ShipmentFormProps) => {
  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="glass-strong p-8 rounded-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <Truck className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                Nuevo Envío
              </h3>
              <p className="text-sm text-muted-foreground">
                Gestionar transporte
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="ship-tracking"
                className="text-foreground flex items-center gap-2"
              >
                <Hash className="w-4 h-4 text-accent" />
                Número de Tracking
              </Label>
              <Input
                id="ship-tracking"
                placeholder="Ej: TRK-2024-789456"
                className="glass border-border/50 focus:border-accent"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="ship-batch"
                className="text-foreground flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-accent" />
                Lote a Enviar
              </Label>
              <Select required>
                <SelectTrigger className="glass border-border/50 focus:border-accent">
                  <SelectValue placeholder="Seleccionar lote" />
                </SelectTrigger>
                <SelectContent className="glass-strong border-border/50">
                  <SelectItem value="lot-001">
                    LOT-2024-001234 - Insulina
                  </SelectItem>
                  <SelectItem value="lot-002">
                    LOT-2024-001235 - Vacuna
                  </SelectItem>
                  <SelectItem value="lot-003">
                    LOT-2024-001236 - Hormona
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="ship-origin"
                className="text-foreground flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-temperature-cold" />
                Origen
              </Label>
              <Input
                id="ship-origin"
                placeholder="Ej: Madrid, España"
                className="glass border-border/50 focus:border-accent"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="ship-destination"
                className="text-foreground flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-temperature-optimal" />
                Destino
              </Label>
              <Input
                id="ship-destination"
                placeholder="Ej: Barcelona, España"
                className="glass border-border/50 focus:border-accent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="ship-date"
                className="text-foreground flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-accent" />
                Fecha de Salida
              </Label>
              <Input
                id="ship-date"
                type="datetime-local"
                className="glass border-border/50 focus:border-accent"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="ship-carrier"
                className="text-foreground flex items-center gap-2"
              >
                <Truck className="w-4 h-4 text-accent" />
                Transportista
              </Label>
              <Select required>
                <SelectTrigger className="glass border-border/50 focus:border-accent">
                  <SelectValue placeholder="Seleccionar transportista" />
                </SelectTrigger>
                <SelectContent className="glass-strong border-border/50">
                  <SelectItem value="coldchain-express">
                    ColdChain Express
                  </SelectItem>
                  <SelectItem value="pharma-logistics">
                    Pharma Logistics
                  </SelectItem>
                  <SelectItem value="bio-transport">Bio Transport</SelectItem>
                  <SelectItem value="cryo-ship">
                    CryoShip International
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="ship-temp-set"
                className="text-foreground flex items-center gap-2"
              >
                <Thermometer className="w-4 h-4 text-temperature-cold" />
                Temperatura Objetivo (°C)
              </Label>
              <Input
                id="ship-temp-set"
                type="number"
                placeholder="Ej: 5"
                className="glass border-border/50 focus:border-accent"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="ship-priority"
                className="text-foreground flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-accent" />
                Prioridad
              </Label>
              <Select required>
                <SelectTrigger className="glass border-border/50 focus:border-accent">
                  <SelectValue placeholder="Seleccionar prioridad" />
                </SelectTrigger>
                <SelectContent className="glass-strong border-border/50">
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                  <SelectItem value="critical">Crítica</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="ship-instructions"
              className="text-foreground flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-accent" />
              Instrucciones Especiales
            </Label>
            <Textarea
              id="ship-instructions"
              placeholder="Instrucciones de manejo, requisitos especiales..."
              className="glass border-border/50 focus:border-accent min-h-[100px]"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 glass-strong hover:bg-secondary/50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-accent to-primary hover:opacity-90 text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Crear Envío
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShipmentForm;
