"use client";

// React and Next.js imports
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
// Icon imports
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
  Home,
  Database,
  BookOpen,
  UserPlus,
  Activity,
  User,
} from "lucide-react";
import {
  createMedicine,
  createBatch,
  createShipment,
} from "@/services/managementService";
// Layout and Background
import Navbar from "@/components/layout/Navbar/Navbar";
import NavLink from "@/components/layout/Navbar/NavLink";
import BlockchainNetwork from "@/components/BlockchainNetwork";
import FloatingHexagons from "@/components/FloatingHexagons";
import ParticlesBackground from "@/components/ParticlesBackground";
import RegisterForm from "@/components/ui/Login/RegisterForm/RegisterForm";
import styles from "./management.module.css";

// Defines which form is currently active in the management view
type FormType = "medicine" | "batch" | "shipment" | "user" | null;

const Management = () => {
  const [activeForm, setActiveForm] = useState<FormType>(null);
  const router = useRouter();

  // Handle user sign out
  const handleSignOut = () => {
    // Simplified sign out logic
    router.push("/");
  };

  // Generic submit handler for all forms
  const handleSubmit = async (e: React.FormEvent, formType: string) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      switch (activeForm) {
        case "medicine":
          await createMedicine({
            name: data.name as string,
            code: data.code as string,
            manufacturer: data.manufacturer as string,
            category: data.category as string,
            tempMin: Number(data.tempMin),
            tempMax: Number(data.tempMax),
            description: data.description as string,
          });
          break;
        case "batch":
          await createBatch({
            batchNumber: data.batchNumber as string,
            medicineId: data.medicineId as string,
            quantity: Number(data.quantity),
            productionDate: data.productionDate as string,
            expiryDate: data.expiryDate as string,
            plant: data.plant as string,
            notes: data.notes as string,
          });
          break;
        case "shipment":
          const batchIdsString = data.batch_ids as string;
          const batchIds = batchIdsString
            ? batchIdsString
                .split(",")
                .map((id) => Number(id.trim()))
                .filter((id) => !isNaN(id))
            : [];

          await createShipment({
            departure_date: new Date(
              data.departure_date as string
            ).toISOString(),
            arrival_date: new Date(data.arrival_date as string).toISOString(),
            min_temperature: Number(data.min_temperature),
            max_temperature: Number(data.max_temperature),
            status: data.status as string,
            origin_location_id: Number(data.origin_location_id),
            destination_location_id: Number(data.destination_location_id),
            operator_id: Number(data.operator_id),
            batch_ids: batchIds,
          });
          break;
      }
      alert(`${formType} registrado correctamente`);
      setActiveForm(null);
    } catch (error) {
      console.error(`Error registering ${formType}:`, error);
      alert(`Error al registrar ${formType}`);
    }
  };

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
    {
      type: "user" as FormType,
      title: "Usuarios",
      icon: UserPlus,
      description: "Registrar nuevos usuarios en el sistema",
      gradient: "from-primary to-glacier",
    },
  ];

  return (
    <>
      {/* Header */}
      <Navbar logoText="MediWave" logoSubtitle="Gestión">
        <NavLink href="/" icon={<Home />}>
          Inicio
        </NavLink>
        <NavLink href="/dashboard" icon={<Database />}>
          Dashboard
        </NavLink>
        <NavLink href="/history" icon={<BookOpen />}>
          Historial
        </NavLink>
        <Button
          size="icon"
          onClick={handleSignOut}
          style={{
            backgroundColor: "transparent",
            color: "hsl(var(--foreground))",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          className="hover:bg-red-500/20"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </Navbar>

      <div className={styles.container}>
        <ParticlesBackground />
        <BlockchainNetwork />
        <FloatingHexagons />

        {/* Gradient Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse-glow" />
          <div
            className="absolute top-1/3 -right-40 w-96 h-96 bg-glacier/30 rounded-full blur-3xl animate-pulse-glow"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute -bottom-40 left-1/3 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse-glow"
            style={{ animationDelay: "4s" }}
          />
        </div>

        {/* Main Content */}
        <main className={styles.mainContent}>
          {/* Selection Cards */}
          {!activeForm && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className={styles.title}>Centro de Gestión</h2>
                <p className={styles.subtitle}>
                  Registra y administra medicamentos, lotes y envíos en el
                  sistema blockchain
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
                    <div
                      className={`${styles.cardGradientOverlay} bg-linear-to-br ${config.gradient}`}
                    />

                    <div className={styles.cardContent}>
                      <div
                        className={`${styles.iconWrapper} bg-linear-to-br ${config.gradient}`}
                      >
                        <config.icon className="w-7 h-7 text-primary-foreground" />
                      </div>

                      <h3 className={styles.cardTitle}>{config.title}</h3>
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
              <div
                className={`glass-strong p-8 rounded-2xl ${styles.formCard}`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-glacier flex items-center justify-center">
                      <Pill className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        Nuevo Medicamento
                      </h3>
                      <p className="text-sm text-white/70">
                        Registrar en blockchain
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setActiveForm(null)}
                    className="text-[hsl(var(--muted-foreground))] cursor-pointer hover:text-[hsl(var(--foreground))]"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <form
                  onSubmit={(e) => handleSubmit(e, "Medicamento")}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="med-name"
                        className="flex items-center gap-2 text-white"
                      >
                        <Package className="w-4 h-4 text-glacier" />
                        Nombre del Medicamento
                      </Label>
                      <Input
                        name="name"
                        placeholder="Ej: Insulina Glargina"
                        className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="med-code"
                        className="flex items-center gap-2 text-white"
                      >
                        <Hash className="w-4 h-4 text-glacier" />
                        Código NDC
                      </Label>
                      <Input
                        name="code"
                        placeholder="Ej: 0002-7714-01"
                        className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="med-manufacturer"
                        className="flex items-center gap-2 text-white"
                      >
                        <Building className="w-4 h-4 text-glacier" />
                        Fabricante
                      </Label>
                      <Input
                        name="manufacturer"
                        placeholder="Ej: Laboratorios XYZ"
                        className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="med-category"
                        className="flex items-center gap-2 text-white"
                      >
                        <Layers className="w-4 h-4 text-glacier" />
                        Categoría
                      </Label>
                      <Select name="category" required>
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
                      <Label
                        htmlFor="med-temp-min"
                        className="flex items-center gap-2 text-white"
                      >
                        <Thermometer className="w-4 h-4 text-glacier" />
                        Temp. Mínima (°C)
                      </Label>
                      <Input
                        name="tempMin"
                        type="number"
                        placeholder="Ej: 2"
                        className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="med-temp-max"
                        className="flex items-center gap-2 text-white"
                      >
                        <Thermometer className="w-4 h-4 text-glacier" />
                        Temp. Máxima (°C)
                      </Label>
                      <Input
                        name="tempMax"
                        type="number"
                        placeholder="Ej: 8"
                        className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="med-description"
                      className="flex items-center gap-2 text-white"
                    >
                      <FileText className="w-4 h-4 text-glacier" />
                      Descripción
                    </Label>
                    <Textarea
                      name="description"
                      placeholder="Descripción detallada del medicamento..."
                      className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50 min-h-[100px]"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveForm(null)}
                      className="flex-1 cursor-pointer glass-strong hover:bg-secondary/50 text-white hover:text-white"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      style={{ backgroundColor: "hsl(var(--primary))" }}
                      className="flex-1 cursor-pointer text-primary-foreground"
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
              <div
                className={`glass-strong p-8 rounded-2xl ${styles.formCard}`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-glacier to-accent flex items-center justify-center">
                      <Layers className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        Nuevo Lote
                      </h3>
                      <p className="text-sm text-white/70">
                        Crear lote de producción
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setActiveForm(null)}
                    className="text-[hsl(var(--muted-foreground))] cursor-pointer hover:text-[hsl(var(--foreground))]"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <form
                  onSubmit={(e) => handleSubmit(e, "Lote")}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="batch-number"
                        className="flex items-center gap-2 text-white"
                      >
                        <Hash className="w-4 h-4 text-glacier" />
                        Número de Lote
                      </Label>
                      <Input
                        name="batchNumber"
                        placeholder="Ej: LOT-2024-001234"
                        className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="batch-medicine"
                        className="flex items-center gap-2 text-white"
                      >
                        <Pill className="w-4 h-4 text-glacier" />
                        Medicamento
                      </Label>
                      <Select name="medicineId" required>
                        <SelectTrigger className="bg-slate-900/50 border border-glacier/60 text-white focus:border-glacier focus:ring-1 focus:ring-glacier/50">
                          <SelectValue placeholder="Seleccionar medicamento" />
                        </SelectTrigger>
                        <SelectContent className="glass-strong border-border/50 bg-slate-900">
                          <SelectItem value="insulina">
                            Insulina Glargina
                          </SelectItem>
                          <SelectItem value="vacuna-covid">
                            Vacuna COVID-19
                          </SelectItem>
                          <SelectItem value="hormona">
                            Hormona de Crecimiento
                          </SelectItem>
                          <SelectItem value="antibiotico">
                            Antibiótico Beta
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="batch-quantity"
                        className="flex items-center gap-2 text-white"
                      >
                        <Package className="w-4 h-4 text-glacier" />
                        Cantidad de Unidades
                      </Label>
                      <Input
                        name="quantity"
                        type="number"
                        placeholder="Ej: 5000"
                        className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="batch-production"
                        className="flex items-center gap-2 text-white"
                      >
                        <Calendar className="w-4 h-4 text-glacier" />
                        Fecha de Producción
                      </Label>
                      <Input
                        name="productionDate"
                        type="date"
                        className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="batch-expiry"
                        className="flex items-center gap-2 text-white"
                      >
                        <Clock className="w-4 h-4 text-glacier" />
                        Fecha de Vencimiento
                      </Label>
                      <Input
                        name="expiryDate"
                        type="date"
                        className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="batch-location"
                        className="flex items-center gap-2 text-white"
                      >
                        <Building className="w-4 h-4 text-glacier" />
                        Planta de Producción
                      </Label>
                      <Select name="plant" required>
                        <SelectTrigger className="bg-slate-900/50 border border-glacier/60 text-white focus:border-glacier focus:ring-1 focus:ring-glacier/50">
                          <SelectValue placeholder="Seleccionar planta" />
                        </SelectTrigger>
                        <SelectContent className="glass-strong border-border/50 bg-slate-900">
                          <SelectItem value="planta-a">
                            Planta A - Madrid
                          </SelectItem>
                          <SelectItem value="planta-b">
                            Planta B - Barcelona
                          </SelectItem>
                          <SelectItem value="planta-c">
                            Planta C - Valencia
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="batch-notes"
                      className="flex items-center gap-2 text-white"
                    >
                      <FileText className="w-4 h-4 text-glacier" />
                      Notas de Producción
                    </Label>
                    <Textarea
                      name="notes"
                      placeholder="Observaciones del proceso de producción..."
                      className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50 min-h-[100px]"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveForm(null)}
                      className="flex-1 cursor-pointer glass-strong hover:bg-secondary/50 text-white hover:text-white"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      style={{ backgroundColor: "hsl(var(--primary))" }}
                      className="flex-1 cursor-pointer text-primary-foreground"
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
              <div
                className={`glass-strong p-8 rounded-2xl ${styles.formCard}`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-glacier flex items-center justify-center">
                      <Truck className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        Nuevo Envío
                      </h3>
                      <p className="text-sm text-white/70">
                        Gestionar transporte
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setActiveForm(null)}
                    className="text-[hsl(var(--muted-foreground))] cursor-pointer hover:text-[hsl(var(--foreground))]"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <form
                  onSubmit={(e) => handleSubmit(e, "Envío")}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <Label
                        htmlFor="departure_date"
                        className="flex items-center gap-2 text-white"
                      >
                        <Calendar className="w-4 h-4 text-glacier" />
                        Fecha Salida
                      </Label>
                      <Input
                        name="departure_date"
                        type="datetime-local"
                        className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="arrival_date"
                        className="flex items-center gap-2 text-white"
                      >
                        <Calendar className="w-4 h-4 text-glacier" />
                        Fecha Llegada
                      </Label>
                      <Input
                        name="arrival_date"
                        type="datetime-local"
                        className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="min_temperature"
                        className="flex items-center gap-2 text-white"
                      >
                         <Thermometer className="w-4 h-4 text-glacier" />
                        Temp. Mínima
                      </Label>
                      <Input
                        name="min_temperature"
                        type="number"
                        placeholder="Ej: -15"
                        className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="max_temperature"
                        className="flex items-center gap-2 text-white"
                      >
                         <Thermometer className="w-4 h-4 text-glacier" />
                        Temp. Máxima
                      </Label>
                      <Input
                        name="max_temperature"
                        type="number"
                        placeholder="Ej: -5"
                        className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label
                          htmlFor="status"
                          className="flex items-center gap-2 text-white"
                        >
                          <Activity className="w-4 h-4 text-glacier" />
                          Estado
                        </Label>
                        <Select name="status" defaultValue="IN_TRANSIT" required>
                          <SelectTrigger className="bg-slate-900/50 border border-glacier/60 text-white focus:border-glacier focus:ring-1 focus:ring-glacier/50">
                            <SelectValue placeholder="Seleccionar estado" />
                          </SelectTrigger>
                          <SelectContent className="glass-strong border-border/50 bg-slate-900">
                            <SelectItem value="PENDING">Pendiente</SelectItem>
                            <SelectItem value="IN_TRANSIT">En Tránsito</SelectItem>
                            <SelectItem value="DELIVERED">Entregado</SelectItem>
                            <SelectItem value="CANCELLED">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="operator_id"
                        className="flex items-center gap-2 text-white"
                      >
                         <User className="w-4 h-4 text-glacier" />
                        ID Operador
                      </Label>
                      <Input
                        name="operator_id"
                        type="number"
                        placeholder="Ej: 1"
                        className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="origin_location_id"
                        className="flex items-center gap-2 text-white"
                      >
                        <MapPin className="w-4 h-4 text-glacier" />
                        ID Origen
                      </Label>
                      <Input
                        name="origin_location_id"
                        type="number"
                        placeholder="Ej: 1"
                        className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="destination_location_id"
                        className="flex items-center gap-2 text-white"
                      >
                        <MapPin className="w-4 h-4 text-glacier" />
                        ID Destino
                      </Label>
                      <Input
                        name="destination_location_id"
                        type="number"
                        placeholder="Ej: 2"
                        className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="batch_ids"
                      className="flex items-center gap-2 text-white"
                    >
                      <Layers className="w-4 h-4 text-glacier" />
                      IDs de Lotes (separados por coma)
                    </Label>
                    <Input
                      name="batch_ids"
                      placeholder="Ej: 1, 2, 3"
                      className="bg-slate-900/50 border border-glacier/60 text-white placeholder:text-white/40 focus:border-glacier focus:ring-1 focus:ring-glacier/50"
                      required
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveForm(null)}
                      className="flex-1 cursor-pointer glass-strong hover:bg-secondary/50 text-white hover:text-white"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      style={{ backgroundColor: "hsl(var(--primary))" }}
                      className="flex-1 cursor-pointer text-primary-foreground"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Crear Envío
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* User Form */}
          {activeForm === "user" && (
            <div className="max-w-2xl mx-auto animate-fade-in">
              <div
                className={`glass-strong p-8 rounded-2xl ${styles.formCard}`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-glacier flex items-center justify-center">
                      <UserPlus className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        Nuevo Usuario
                      </h3>
                      <p className="text-sm text-white/70">
                        Registrar en el sistema
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setActiveForm(null)}
                    className="text-[hsl(var(--muted-foreground))] cursor-pointer hover:text-[hsl(var(--foreground))]"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <RegisterForm />
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Management;
