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
import {
    Layers,
    X,
    Hash,
    Pill,
    Package,
    Calendar,
    Clock,
    Building,
    FileText,
    Plus,
} from "lucide-react";

interface BatchFormProps {
    onCancel: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

const BatchForm = ({ onCancel, onSubmit }: BatchFormProps) => {
    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="glass-strong p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-glacier to-accent flex items-center justify-center">
                            <Layers className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-foreground">Nuevo Lote</h3>
                            <p className="text-sm text-muted-foreground">Crear lote de producción</p>
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
                            <Label htmlFor="batch-number" className="text-foreground flex items-center gap-2">
                                <Hash className="w-4 h-4 text-glacier" />
                                Número de Lote
                            </Label>
                            <Input
                                id="batch-number"
                                placeholder="Ej: LOT-2024-001234"
                                className="glass border-border/50 focus:border-glacier"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="batch-medicine" className="text-foreground flex items-center gap-2">
                                <Pill className="w-4 h-4 text-glacier" />
                                Medicamento
                            </Label>
                            <Select required>
                                <SelectTrigger className="glass border-border/50 focus:border-glacier">
                                    <SelectValue placeholder="Seleccionar medicamento" />
                                </SelectTrigger>
                                <SelectContent className="glass-strong border-border/50">
                                    <SelectItem value="insulina">Insulina Glargina</SelectItem>
                                    <SelectItem value="vacuna-covid">Vacuna COVID-19</SelectItem>
                                    <SelectItem value="hormona">Hormona de Crecimiento</SelectItem>
                                    <SelectItem value="antibiotico">Antibiótico Beta</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="batch-quantity" className="text-foreground flex items-center gap-2">
                                <Package className="w-4 h-4 text-glacier" />
                                Cantidad de Unidades
                            </Label>
                            <Input
                                id="batch-quantity"
                                type="number"
                                placeholder="Ej: 5000"
                                className="glass border-border/50 focus:border-glacier"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="batch-production" className="text-foreground flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-glacier" />
                                Fecha de Producción
                            </Label>
                            <Input
                                id="batch-production"
                                type="date"
                                className="glass border-border/50 focus:border-glacier"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="batch-expiry" className="text-foreground flex items-center gap-2">
                                <Clock className="w-4 h-4 text-glacier" />
                                Fecha de Vencimiento
                            </Label>
                            <Input
                                id="batch-expiry"
                                type="date"
                                className="glass border-border/50 focus:border-glacier"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="batch-location" className="text-foreground flex items-center gap-2">
                                <Building className="w-4 h-4 text-glacier" />
                                Planta de Producción
                            </Label>
                            <Select required>
                                <SelectTrigger className="glass border-border/50 focus:border-glacier">
                                    <SelectValue placeholder="Seleccionar planta" />
                                </SelectTrigger>
                                <SelectContent className="glass-strong border-border/50">
                                    <SelectItem value="planta-a">Planta A - Madrid</SelectItem>
                                    <SelectItem value="planta-b">Planta B - Barcelona</SelectItem>
                                    <SelectItem value="planta-c">Planta C - Valencia</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="batch-notes" className="text-foreground flex items-center gap-2">
                            <FileText className="w-4 h-4 text-glacier" />
                            Notas de Producción
                        </Label>
                        <Textarea
                            id="batch-notes"
                            placeholder="Observaciones del proceso de producción..."
                            className="glass border-border/50 focus:border-glacier min-h-[100px]"
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
                            className="flex-1 bg-gradient-to-r from-glacier to-accent hover:opacity-90 text-primary-foreground"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Crear Lote
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BatchForm;
