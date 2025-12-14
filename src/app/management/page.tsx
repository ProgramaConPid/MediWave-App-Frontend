"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import {
    Droplets,
    ChevronLeft,
    Package,
    Layers,
    Truck,
    Plus,
    X,
    Pill,
    Calendar,
    Thermometer,
    MapPin,
    Building,
    Hash,
    FileText,
    Clock,
    LogOut,
} from "lucide-react";
import BlockchainNetwork from "@/components/BlockchainNetwork";
import FloatingHexagons from "@/components/FloatingHexagons";
import ParticlesBackground from "@/components/ParticlesBackground";
import styles from "./management.module.css";

type FormType = "medicine" | "batch" | "shipment" | null;

const Management = () => {
    const [activeForm, setActiveForm] = useState<FormType>(null);
    const { toast } = useToast();
    const { user, loading, signOut } = useAuth();
    const router = useRouter();

    // useEffect(() => {
    //     if (!loading && !user) {
    //         router.push("/management");
    //     }
    // }, [user, loading, router]);

    const handleSignOut = async () => {
        await signOut();
        toast({
            title: "Sesión cerrada",
            description: "Has cerrado sesión correctamente",
        });
        router.push("/");
    };

    const handleSubmit = (e: React.FormEvent, formType: string) => {
        e.preventDefault();
        toast({
            title: "Registro Exitoso",
            description: `${formType} registrado correctamente en el sistema blockchain.`,
        });
        setActiveForm(null);
    };

    if (loading) {
        return (
            <div className="min-h-screen gradient-cold flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    // if (!user) {
    //     return null;
    // }

    const formConfigs = [
        {
            type: "medicine" as FormType,
            title: "Medicamentos",
            icon: Pill,
            description: "Registrar nuevos medicamentos en el sistema",
            gradient: "from-primary to-glacier",
        },
        {
            type: "batch" as FormType,
            title: "Lotes",
            icon: Layers,
            description: "Crear lotes de producción para medicamentos",
            gradient: "from-glacier to-accent",
        },
        {
            type: "shipment" as FormType,
            title: "Envíos",
            icon: Truck,
            description: "Gestionar envíos y transporte de medicamentos",
            gradient: "from-primary to-glacier",
        },
    ];

    return (
        <div className={styles.container}>
            <ParticlesBackground />
            <BlockchainNetwork />
            <FloatingHexagons />

            {/* Gradient Orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
                <div className="absolute top-1/3 -right-40 w-96 h-96 bg-glacier/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
                <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "4s" }} />
            </div>

            {/* Header */}
            <header className={styles.header}>
                <div className="container mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                    <ChevronLeft className="w-5 h-5" />
                                </Button>
                            </Link>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/20">
                                    <Droplets className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h1 className={`text-2xl font-bold ${styles.textGradient}`}>Gestión</h1>
                                    <p className={`text-xs ${styles.textGradient}`}>Administración de Registros</p>
                                </div>
                            </div>
                        </div>
                        <nav className="flex items-center gap-4">
                            <span className="text-xs text-muted-foreground hidden md:block">
                                {user?.email || "demo@mediwave.com"}
                            </span>
                            <Link href="/dashboard">
                                <Button variant="outline" className="glass-strong hover:bg-secondary/50">
                                    Dashboard
                                </Button>
                            </Link>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleSignOut}
                                className="text-muted-foreground hover:text-destructive"
                            >
                                <LogOut className="w-5 h-5" />
                            </Button>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {/* Selection Cards */}
                {!activeForm && (
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className={styles.title}>
                                Centro de Gestión
                            </h2>
                            <p className={styles.subtitle}>
                                Registra y administra medicamentos, lotes y envíos en el sistema blockchain
                            </p>
                        </div>

                        <div className={styles.grid}>
                            {formConfigs.map((config, index) => (
                                <button
                                    key={config.type}
                                    onClick={() => setActiveForm(config.type)}
                                    className={styles.cardButton}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className={`${styles.cardGradientOverlay} bg-gradient-to-br ${config.gradient}`} />

                                    <div className={styles.cardContent}>
                                        <div className={`${styles.iconWrapper} bg-gradient-to-br ${config.gradient}`}>
                                            <config.icon className="w-7 h-7 text-primary-foreground" />
                                        </div>

                                        <h3 className={styles.cardTitle}>
                                            {config.title}
                                        </h3>
                                        <p className={styles.cardDescription}>
                                            {config.description}
                                        </p>

                                        <div className={styles.cardAction}>
                                            <Plus className="w-5 h-5" />
                                            <span className="font-medium">Agregar Nuevo</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Medicine Form */}
                {activeForm === "medicine" && (
                    <div className="max-w-2xl mx-auto animate-fade-in">
                        <div className="glass-strong p-8 rounded-2xl">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-glacier flex items-center justify-center">
                                        <Pill className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h3 className={`text-2xl font-bold ${styles.textGradient}`}>Nuevo Medicamento</h3>
                                        <p className={`text-sm ${styles.textGradient}`}>Registrar en blockchain</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setActiveForm(null)}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            <form onSubmit={(e) => handleSubmit(e, "Medicamento")} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="med-name" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                        <Label htmlFor="med-code" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                        <Label htmlFor="med-manufacturer" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                        <Label htmlFor="med-category" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                        <Label htmlFor="med-temp-min" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                        <Label htmlFor="med-temp-max" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                    <Label htmlFor="med-description" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                        onClick={() => setActiveForm(null)}
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
                )}

                {/* Batch Form */}
                {activeForm === "batch" && (
                    <div className="max-w-2xl mx-auto animate-fade-in">
                        <div className="glass-strong p-8 rounded-2xl">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-glacier to-accent flex items-center justify-center">
                                        <Layers className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h3 className={`text-2xl font-bold ${styles.textGradient}`}>Nuevo Lote</h3>
                                        <p className={`text-sm ${styles.textGradient}`}>Crear lote de producción</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setActiveForm(null)}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            <form onSubmit={(e) => handleSubmit(e, "Lote")} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="batch-number" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                        <Label htmlFor="batch-medicine" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                        <Label htmlFor="batch-quantity" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                        <Label htmlFor="batch-production" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                        <Label htmlFor="batch-expiry" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                        <Label htmlFor="batch-location" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                    <Label htmlFor="batch-notes" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                        onClick={() => setActiveForm(null)}
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
                )}

                {/* Shipment Form */}
                {activeForm === "shipment" && (
                    <div className="max-w-2xl mx-auto animate-fade-in">
                        <div className="glass-strong p-8 rounded-2xl">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                                        <Truck className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h3 className={`text-2xl font-bold ${styles.textGradient}`}>Nuevo Envío</h3>
                                        <p className={`text-sm ${styles.textGradient}`}>Gestionar transporte</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setActiveForm(null)}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            <form onSubmit={(e) => handleSubmit(e, "Envío")} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="ship-tracking" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                        <Label htmlFor="ship-batch" className={`${styles.textGradient} flex items-center gap-2`}>
                                            <Layers className="w-4 h-4 text-accent" />
                                            Lote a Enviar
                                        </Label>
                                        <Select required>
                                            <SelectTrigger className="glass border-border/50 focus:border-accent">
                                                <SelectValue placeholder="Seleccionar lote" />
                                            </SelectTrigger>
                                            <SelectContent className="glass-strong border-border/50">
                                                <SelectItem value="lot-001">LOT-2024-001234 - Insulina</SelectItem>
                                                <SelectItem value="lot-002">LOT-2024-001235 - Vacuna</SelectItem>
                                                <SelectItem value="lot-003">LOT-2024-001236 - Hormona</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="ship-origin" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                        <Label htmlFor="ship-destination" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                        <Label htmlFor="ship-date" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                        <Label htmlFor="ship-carrier" className={`${styles.textGradient} flex items-center gap-2`}>
                                            <Truck className="w-4 h-4 text-accent" />
                                            Transportista
                                        </Label>
                                        <Select required>
                                            <SelectTrigger className="glass border-border/50 focus:border-accent">
                                                <SelectValue placeholder="Seleccionar transportista" />
                                            </SelectTrigger>
                                            <SelectContent className="glass-strong border-border/50">
                                                <SelectItem value="coldchain-express">ColdChain Express</SelectItem>
                                                <SelectItem value="pharma-logistics">Pharma Logistics</SelectItem>
                                                <SelectItem value="bio-transport">Bio Transport</SelectItem>
                                                <SelectItem value="cryo-ship">CryoShip International</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="ship-temp-set" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                        <Label htmlFor="ship-priority" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                    <Label htmlFor="ship-instructions" className={`${styles.textGradient} flex items-center gap-2`}>
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
                                        onClick={() => setActiveForm(null)}
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
                )}
            </main>
        </div>
    );
};

export default Management;
