import { Pill, Layers, Truck, Plus } from "lucide-react";

// Types for form selection
type FormType = "medicine" | "batch" | "shipment" | null;

interface SelectionMenuProps {
  setActiveForm: (form: FormType) => void;
}

// Component for selecting management actions
const SelectionMenu = ({ setActiveForm }: SelectionMenuProps) => {
  // Configuration for menu cards
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
      gradient: "from-accent to-primary",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-glacier bg-clip-text text-transparent">
          Centro de Gestión
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Registra y administra medicamentos, lotes y envíos en el sistema
          blockchain
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {formConfigs.map((config, index) => (
          <button
            key={config.type}
            onClick={() => setActiveForm(config.type)}
            className="group glass-strong p-8 rounded-2xl text-left hover:scale-105 transition-all duration-300 relative overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
            />

            <div className="relative z-10">
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <config.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {config.title}
              </h3>
              <p className="text-muted-foreground mb-6">{config.description}</p>

              <div className="flex items-center gap-2 text-primary">
                <Plus className="w-5 h-5" />
                <span className="font-medium">Agregar Nuevo</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectionMenu;
