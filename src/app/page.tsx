import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Thermometer, 
  Package, 
  Lock, 
  Activity, 
  ChevronRight,
  Droplets,
  Eye,
  TrendingUp,
  BarChart3
} from "lucide-react";
import BlockchainNetwork from "@/components/BlockchainNetwork";
import FloatingHexagons from "@/components/FloatingHexagons";
import FeatureCard from "@/components/FeatureCard";
import ParticlesBackground from "@/components/ParticlesBackground";

const Index = () => {
  const features = [
    {
      icon: Thermometer,
      title: "Cadena de Frío",
      description: "Monitoreo en tiempo real de temperaturas durante todo el proceso de transporte y almacenamiento.",
      gradient: "gradient-ice",
    },
    {
      icon: Shield,
      title: "Blockchain",
      description: "Verificación inmutable de cada etapa del proceso mediante registros en blockchain descentralizado.",
      gradient: "gradient-cold",
    },
    {
      icon: Package,
      title: "Trazabilidad Total",
      description: "Seguimiento completo desde el origen hasta el destino final con datos precisos y verificables.",
      gradient: "gradient-ice",
    },
    {
      icon: Lock,
      title: "Seguridad",
      description: "Protección de datos mediante encriptación avanzada y autenticación multifactor.",
      gradient: "gradient-cold",
    },
    {
      icon: Activity,
      title: "Alertas Inteligentes",
      description: "Notificaciones automáticas ante cualquier desviación de los parámetros establecidos.",
      gradient: "gradient-ice",
    },
    {
      icon: Eye,
      title: "Transparencia",
      description: "Acceso completo a la información para todos los actores autorizados de la cadena.",
      gradient: "gradient-cold",
    },
  ];

  return (
    <div className="min-h-screen gradient-cold overflow-hidden relative">
      {/* Animated Background Elements */}
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
      <header className="relative z-20 border-b border-border/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Droplets className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">MediWave</h1>
                <p className="text-xs text-muted-foreground">Pharmaceutical Traceability</p>
              </div>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button className="group bg-primary hover:bg-primary/90 text-primary-foreground">
                  Dashboard
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/history">
                <Button variant="outline" className="group glass-strong hover:bg-secondary/50">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Historial
                </Button>
              </Link>
              <Link href="/documentation">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Documentación
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-20 pb-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-float">
            <div className="w-2 h-2 rounded-full bg-temperature-optimal animate-pulse" />
            <span className="text-sm text-muted-foreground">Sistema Activo • Blockchain Verificado</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-glacier bg-clip-text text-transparent animate-gradient">
            Trazabilidad Farmacéutica del Futuro
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Garantizamos la integridad de medicamentos mediante tecnología blockchain, 
            monitoreo IoT en tiempo real y verificación descentralizada de la cadena de frío.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/dashboard">
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-primary to-glacier hover:opacity-90 text-primary-foreground text-lg px-8 py-6 rounded-xl shadow-lg shadow-primary/20"
              >
                Ver Dashboard
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <Link href="/documentation">
              <Button 
                size="lg" 
                variant="outline" 
                className="glass-strong hover:bg-secondary/50 text-lg px-8 py-6 rounded-xl group"
              >
                Documentación
                <TrendingUp className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            <div className="glass p-6 rounded-2xl hover:scale-105 transition-transform">
              <p className="text-4xl font-bold text-primary mb-2">99.9%</p>
              <p className="text-sm text-muted-foreground">Precisión</p>
            </div>
            <div className="glass p-6 rounded-2xl hover:scale-105 transition-transform" style={{ animationDelay: "0.1s" }}>
              <p className="text-4xl font-bold text-glacier mb-2">24/7</p>
              <p className="text-sm text-muted-foreground">Monitoreo</p>
            </div>
            <div className="glass p-6 rounded-2xl hover:scale-105 transition-transform" style={{ animationDelay: "0.2s" }}>
              <p className="text-4xl font-bold text-accent mb-2">100%</p>
              <p className="text-sm text-muted-foreground">Trazable</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Tecnología de Vanguardia
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Combinamos blockchain, IoT y IA para crear el sistema más avanzado 
            de trazabilidad farmacéutica del mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-foreground">
            Cómo Funciona
          </h2>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Registro Inicial",
                description: "El medicamento se registra en blockchain al momento de manufacturación con todos sus datos críticos.",
              },
              {
                step: "02",
                title: "Monitoreo IoT",
                description: "Sensores inteligentes registran temperatura, ubicación y condiciones ambientales en tiempo real.",
              },
              {
                step: "03",
                title: "Verificación Blockchain",
                description: "Cada evento se registra de forma inmutable en la blockchain para garantizar transparencia total.",
              },
              {
                step: "04",
                title: "Alertas Automáticas",
                description: "El sistema notifica instantáneamente cualquier desviación de los parámetros establecidos.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="glass-strong p-8 rounded-2xl flex items-start gap-6 hover:scale-102 transition-all duration-300 group"
              >
                <div className="flex-shrink-0">
                  <div className="text-5xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-6 py-20 mb-20">
        <div className="glass-strong p-12 rounded-3xl text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-glacier/10 animate-gradient" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Comienza a Monitorear Ahora
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Únete a las empresas farmacéuticas que ya confían en MedChain 
              para garantizar la integridad de sus productos.
            </p>
            <Link href="/dashboard">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-glacier hover:opacity-90 text-primary-foreground text-lg px-10 py-6 rounded-xl shadow-xl shadow-primary/30"
              >
                Acceder al Dashboard
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                © 2024 MedChain. Blockchain Pharmaceutical Traceability.
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="w-4 h-4 text-temperature-optimal animate-pulse" />
              <span>Sistema Operativo</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
