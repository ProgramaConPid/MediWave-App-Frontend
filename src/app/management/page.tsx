"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse-glow" />
                <div className="absolute top-1/3 -right-40 w-96 h-96 bg-glacier/30 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
                <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "4s" }} />
            </div>

            {/* Header */}
            <header className="relative z-20 border-b border-white/10 backdrop-blur-sm bg-background/50">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/">
                                <Button variant="ghost" size="icon" className="text-white hover:text-glacier">
                                    <ChevronLeft className="w-5 h-5" />
                                </Button>
                            </Link>
                            <div className="flex items-center gap-3">
                                <div 
                                    className="flex items-center justify-center"
                                    style={{
                                        padding: '0.5rem',
                                        backgroundColor: 'hsl(var(--primary) / 0.2)',
                                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                                        width: '50px',
                                        height: '50px'
                                    }}
                                >
                                    <Image
                                        src="/icon.png"
                                        alt="MediWave Logo"
                                        width={40}
                                        height={40}
                                        className="w-10 h-10"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-white">Gestión</h1>
                                    <p className="text-xs text-white/60">Administración de Registros</p>
                                </div>
                            </div>
                        </div>
                        <nav className="flex items-center gap-4">
                            <span className="text-xs text-white/60 hidden md:block">
                                {user?.email || "demo@mediwave.com"}
                            </span>
                            <Link href="/dashboard">
                                <Button 
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        color: 'white'
                                    }}
                                    className="backdrop-blur-sm"
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'hsl(var(--primary))';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                    }}
                                >
                                    Dashboard
                                </Button>
                            </Link>
                            <Button
                                size="icon"
                                onClick={handleSignOut}
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    border: 'none'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
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
                                        <Pill className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">Nuevo Medicamento</h3>
                                        <p className="text-sm text-white/70">Registrar en blockchain</p>
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
                                        <Label htmlFor="med-name" className="flex items-center gap-2 text-white">
                                            <Package className="w-4 h-4 text-glacier" />
                                            Nombre del Medicamento
                                        </Label>
                                        <Input
                                            id="med-name"
                                            placeholder="Ej: Insulina Glargina"
                                            className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="med-code" className="flex items-center gap-2 text-white">
                                            <Hash className="w-4 h-4 text-glacier" />
                                            Código NDC
                                        </Label>
                                        <Input
                                            id="med-code"
                                            placeholder="Ej: 0002-7714-01"
                                            className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="med-manufacturer" className="flex items-center gap-2 text-white">
                                            <Building className="w-4 h-4 text-glacier" />
                                            Fabricante
                                        </Label>
                                        <Input
                                            id="med-manufacturer"
                                            placeholder="Ej: Laboratorios XYZ"
                                            className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="med-category" className="flex items-center gap-2 text-white">
                                            <Layers className="w-4 h-4 text-glacier" />
                                            Categoría
                                        </Label>
                                        <Select required>
                                            <SelectTrigger className="bg-slate-900/50 border border-glacier/60 text-white focus:border-glacier focus:ring-1 focus:ring-glacier/50">
                                                <SelectValue placeholder="Seleccionar categoría" />
                                            </SelectTrigger>
                                            <SelectContent className="glass-strong border-border/50 bg-slate-900">
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
                                        <Label htmlFor="med-temp-min" className="flex items-center gap-2 text-white">
                                            <Thermometer className="w-4 h-4 text-glacier" />
                                            Temp. Mínima (°C)
                                        </Label>
                                        <Input
                                            id="med-temp-min"
                                            type="number"
                                            placeholder="Ej: 2"
                                            className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="med-temp-max" className="flex items-center gap-2 text-white">
                                            <Thermometer className="w-4 h-4 text-glacier" />
                                            Temp. Máxima (°C)
                                        </Label>
                                        <Input
                                            id="med-temp-max"
                                            type="number"
                                            placeholder="Ej: 8"
                                            className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="med-description" className="flex items-center gap-2 text-white">
                                        <FileText className="w-4 h-4 text-glacier" />
                                        Descripción
                                    </Label>
                                    <Textarea
                                        id="med-description"
                                        placeholder="Descripción detallada del medicamento..."
                                        className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50 min-h-[100px]"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setActiveForm(null)}
                                        className="flex-1 glass-strong hover:bg-secondary/50 text-white hover:text-white"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        style={{backgroundColor: 'hsl(var(--primary))'}}
                                        className="flex-1 text-primary-foreground"
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
                                        <h3 className="text-2xl font-bold text-white">Nuevo Lote</h3>
                                        <p className="text-sm text-white/70">Crear lote de producción</p>
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
                                        <Label htmlFor="batch-number" className="flex items-center gap-2 text-white">
                                            <Hash className="w-4 h-4 text-glacier" />
                                            Número de Lote
                                        </Label>
                                        <Input
                                            id="batch-number"
                                            placeholder="Ej: LOT-2024-001234"
                                            className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="batch-medicine" className="flex items-center gap-2 text-white">
                                            <Pill className="w-4 h-4 text-glacier" />
                                            Medicamento
                                        </Label>
                                        <Select required>
                                            <SelectTrigger className="bg-slate-900/50 border border-glacier/60 text-white focus:border-glacier focus:ring-1 focus:ring-glacier/50">
                                                <SelectValue placeholder="Seleccionar medicamento" />
                                            </SelectTrigger>
                                            <SelectContent className="glass-strong border-border/50 bg-slate-900">
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
                                        <Label htmlFor="batch-quantity" className="flex items-center gap-2 text-white">
                                            <Package className="w-4 h-4 text-glacier" />
                                            Cantidad de Unidades
                                        </Label>
                                        <Input
                                            id="batch-quantity"
                                            type="number"
                                            placeholder="Ej: 5000"
                                            className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="batch-production" className="flex items-center gap-2 text-white">
                                            <Calendar className="w-4 h-4 text-glacier" />
                                            Fecha de Producción
                                        </Label>
                                        <Input
                                            id="batch-production"
                                            type="date"
                                            className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="batch-expiry" className="flex items-center gap-2 text-white">
                                            <Clock className="w-4 h-4 text-glacier" />
                                            Fecha de Vencimiento
                                        </Label>
                                        <Input
                                            id="batch-expiry"
                                            type="date"
                                            className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="batch-location" className="flex items-center gap-2 text-white">
                                            <Building className="w-4 h-4 text-glacier" />
                                            Planta de Producción
                                        </Label>
                                        <Select required>
                                            <SelectTrigger className="bg-slate-900/50 border border-glacier/60 text-white focus:border-glacier focus:ring-1 focus:ring-glacier/50">
                                                <SelectValue placeholder="Seleccionar planta" />
                                            </SelectTrigger>
                                            <SelectContent className="glass-strong border-border/50 bg-slate-900">
                                                <SelectItem value="planta-a">Planta A - Madrid</SelectItem>
                                                <SelectItem value="planta-b">Planta B - Barcelona</SelectItem>
                                                <SelectItem value="planta-c">Planta C - Valencia</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="batch-notes" className="flex items-center gap-2 text-white">
                                        <FileText className="w-4 h-4 text-glacier" />
                                        Notas de Producción
                                    </Label>
                                    <Textarea
                                        id="batch-notes"
                                        placeholder="Observaciones del proceso de producción..."
                                        className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50 min-h-[100px]"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setActiveForm(null)}
                                        className="flex-1 glass-strong hover:bg-secondary/50 text-white hover:text-white"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        style={{backgroundColor: 'hsl(var(--primary))'}}
                                        className="flex-1 text-primary-foreground"
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
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-glacier flex items-center justify-center">
                                        <Truck className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">Nuevo Envío</h3>
                                        <p className="text-sm text-white/70">Gestionar transporte</p>
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
                                        <Label htmlFor="ship-tracking" className="flex items-center gap-2 text-white">
                                            <Hash className="w-4 h-4 text-glacier" />
                                            Número de Tracking
                                        </Label>
                                        <Input
                                            id="ship-tracking"
                                            placeholder="Ej: TRK-2024-789456"
                                            className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="ship-batch" className="flex items-center gap-2 text-white">
                                            <Layers className="w-4 h-4 text-glacier" />
                                            Lote a Enviar
                                        </Label>
                                        <Select required>
                                            <SelectTrigger className="bg-slate-900/50 border border-glacier/60 text-white focus:border-glacier focus:ring-1 focus:ring-glacier/50">
                                                <SelectValue placeholder="Seleccionar lote" />
                                            </SelectTrigger>
                                            <SelectContent className="glass-strong border-border/50 bg-slate-900">
                                                <SelectItem value="lot-001">LOT-2024-001234 - Insulina</SelectItem>
                                                <SelectItem value="lot-002">LOT-2024-001235 - Vacuna</SelectItem>
                                                <SelectItem value="lot-003">LOT-2024-001236 - Hormona</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="ship-origin" className="flex items-center gap-2 text-white">
                                            <MapPin className="w-4 h-4 text-glacier" />
                                            Origen
                                        </Label>
                                        <Input
                                            id="ship-origin"
                                            placeholder="Ej: Madrid, España"
                                            className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="ship-destination" className="flex items-center gap-2 text-white">
                                            <MapPin className="w-4 h-4 text-glacier" />
                                            Destino
                                        </Label>
                                        <Input
                                            id="ship-destination"
                                            placeholder="Ej: Barcelona, España"
                                            className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="ship-date" className="flex items-center gap-2 text-white">
                                            <Calendar className="w-4 h-4 text-glacier" />
                                            Fecha de Salida
                                        </Label>
                                        <Input
                                            id="ship-date"
                                            type="datetime-local"
                                            className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="ship-carrier" className="flex items-center gap-2 text-white">
                                            <Truck className="w-4 h-4 text-glacier" />
                                            Transportista
                                        </Label>
                                        <Select required>
                                            <SelectTrigger className="bg-slate-900/50 border border-glacier/60 text-white focus:border-glacier focus:ring-1 focus:ring-glacier/50">
                                                <SelectValue placeholder="Seleccionar transportista" />
                                            </SelectTrigger>
                                            <SelectContent className="glass-strong border-border/50 bg-slate-900">
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
                                        <Label htmlFor="ship-temp-set" className="flex items-center gap-2 text-white">
                                            <Thermometer className="w-4 h-4 text-glacier" />
                                            Temperatura Objetivo (°C)
                                        </Label>
                                        <Input
                                            id="ship-temp-set"
                                            type="number"
                                            placeholder="Ej: 5"
                                            className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="ship-priority" className="flex items-center gap-2 text-white">
                                            <Clock className="w-4 h-4 text-glacier" />
                                            Prioridad
                                        </Label>
                                        <Select required>
                                            <SelectTrigger className="bg-slate-900/50 border border-glacier/60 text-white focus:border-glacier focus:ring-1 focus:ring-glacier/50">
                                                <SelectValue placeholder="Seleccionar prioridad" />
                                            </SelectTrigger>
                                            <SelectContent className="glass-strong border-border/50 bg-slate-900">
                                                <SelectItem value="normal">Normal</SelectItem>
                                                <SelectItem value="high">Alta</SelectItem>
                                                <SelectItem value="urgent">Urgente</SelectItem>
                                                <SelectItem value="critical">Crítica</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ship-instructions" className="flex items-center gap-2 text-white">
                                        <FileText className="w-4 h-4 text-glacier" />
                                        Instrucciones Especiales
                                    </Label>
                                    <Textarea
                                        id="ship-instructions"
                                        placeholder="Instrucciones de manejo, requisitos especiales..."
                                        className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50 min-h-[100px]"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setActiveForm(null)}
                                        className="flex-1 glass-strong hover:bg-secondary/50 text-white hover:text-white"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        style={{backgroundColor: 'hsl(var(--primary))'}}
                                        className="flex-1 text-primary-foreground"
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
