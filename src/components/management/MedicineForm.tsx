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
    Pill,
    X,
    Package,
    Hash,
    Building,
    Layers,
    Thermometer,
    FileText,
    Plus,
} from "lucide-react";

interface MedicineFormProps {
    onCancel: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

const MedicineForm = ({ onCancel, onSubmit }: MedicineFormProps) => {
    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="glass-strong p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-glacier flex items-center justify-center">
                            <Pill className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-foreground">Nuevo Medicamento</h3>
                            <p className="text-sm text-muted-foreground">Registrar en blockchain</p>
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
                            <Label htmlFor="med-name" className="text-foreground flex items-center gap-2">
                                <Package className="w-4 h-4 text-primary" />
                                Nombre del Medicamento
                            </Label>
                            <Input
                                id="med-name"
                                placeholder="Ej: Insulina Glargina"
                                className="glass border-border/50 focus:border-primary"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="med-code" className="text-foreground flex items-center gap-2">
                                <Hash className="w-4 h-4 text-primary" />
                                Código NDC
                            </Label>
                            <Input
                                id="med-code"
                                placeholder="Ej: 0002-7714-01"
                                className="glass border-border/50 focus:border-primary"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="med-manufacturer" className="text-foreground flex items-center gap-2">
                                <Building className="w-4 h-4 text-primary" />
                                Fabricante
                            </Label>
                            <Input
                                id="med-manufacturer"
                                placeholder="Ej: Laboratorios XYZ"
                                className="glass border-border/50 focus:border-primary"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="med-category" className="text-foreground flex items-center gap-2">
                                <Layers className="w-4 h-4 text-primary" />
                                Categoría
                            </Label>
                            <Select required>
                                <SelectTrigger className="glass border-border/50 focus:border-primary">
                                    <SelectValue placeholder="Seleccionar categoría" />
                                </SelectTrigger>
                                <SelectContent className="glass-strong border-border/50">
                                    <SelectItem value="biologico">Biológico</SelectItem>
                                    <SelectItem value="quimico">Químico</SelectItem>
                                    <SelectItem value="vacuna">Vacuna</SelectItem>
                                    <SelectItem value="hormonal">Hormonal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="med-temp-min" className="text-foreground flex items-center gap-2">
                                <Thermometer className="w-4 h-4 text-temperature-cold" />
                                Temp. Mínima (°C)
                            </Label>
                            <Input
                                id="med-temp-min"
                                type="number"
                                placeholder="Ej: 2"
                                className="glass border-border/50 focus:border-primary"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="med-temp-max" className="text-foreground flex items-center gap-2">
                                <Thermometer className="w-4 h-4 text-temperature-warm" />
                                Temp. Máxima (°C)
                            </Label>
                            <Input
                                id="med-temp-max"
                                type="number"
                                placeholder="Ej: 8"
                                className="glass border-border/50 focus:border-primary"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="med-description" className="text-foreground flex items-center gap-2">
                            <FileText className="w-4 h-4 text-primary" />
                            Descripción
                        </Label>
                        <Textarea
                            id="med-description"
                            placeholder="Descripción detallada del medicamento..."
                            className="glass border-border/50 focus:border-primary min-h-[100px]"
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
                            className="flex-1 bg-gradient-to-r from-primary to-glacier hover:opacity-90 text-primary-foreground"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Registrar Medicamento
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MedicineForm;
