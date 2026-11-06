import React from "react";
import { cn } from "@/lib/utils";

interface ProjectVisualProps {
  type: "circular" | "timeline" | "network" | "gold-medal" | "refinery" | string;
  className?: string;
}

export const ProjectVisual: React.FC<ProjectVisualProps> = ({
  type,
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full h-44 rounded-lg bg-surface/70 border border-border-muted/60 relative overflow-hidden flex items-center justify-center p-4",
        className
      )}
    >
      {/* Background Micro Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1E2D3B_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />

      {type === "gold-medal" && (
        <svg
          viewBox="0 0 320 160"
          className="w-full h-full max-w-[280px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gold Crest Sunburst */}
          <circle cx="160" cy="75" r="48" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" className="animate-spin-slow opacity-50" />
          <circle cx="160" cy="75" r="38" fill="#111A22" stroke="#D4AF37" strokeWidth="2" />
          
          {/* Medal Core */}
          <circle cx="160" cy="75" r="30" fill="url(#goldGrad)" stroke="#F3E5AB" strokeWidth="1.5" />
          <defs>
            <linearGradient id="goldGrad" x1="130" y1="45" x2="190" y2="105" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D4AF37" />
              <stop offset="0.5" stopColor="#B38F24" />
              <stop offset="1" stopColor="#8A6D19" />
            </linearGradient>
          </defs>

          {/* Star and Crest */}
          <path d="M160 58L163 67H172L165 72L167 81L160 76L153 81L155 72L148 67H157L160 58Z" fill="#FFFBEB" />
          
          {/* Ribbon */}
          <path d="M142 104L135 135L148 128L160 135L154 104" fill="#047857" stroke="#10B981" strokeWidth="1" />
          <path d="M166 104L160 135L172 128L185 135L178 104" fill="#065F46" stroke="#10B981" strokeWidth="1" />

          {/* Text Labels */}
          <text x="160" y="24" textAnchor="middle" fill="#D4AF37" fontSize="10" fontFamily="monospace" fontWeight="bold">
            RECTOR'S GOLD MEDAL
          </text>
          <text x="160" y="152" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">
            NUST BE CHEMICAL ENGINEERING
          </text>
        </svg>
      )}

      {type === "refinery" && (
        <svg
          viewBox="0 0 320 160"
          className="w-full h-full max-w-[280px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Distillation Column / Reactor Tower */}
          <rect x="70" y="25" width="40" height="110" rx="6" fill="#111A22" stroke="#10B981" strokeWidth="2" />
          
          {/* Column Internal Trays */}
          <line x1="72" y1="45" x2="108" y2="45" stroke="#34D399" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="72" y1="65" x2="108" y2="65" stroke="#34D399" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="72" y1="85" x2="108" y2="85" stroke="#34D399" strokeWidth="1" strokeDasharray="3 2" />
          <line x1="72" y1="105" x2="108" y2="105" stroke="#34D399" strokeWidth="1" strokeDasharray="3 2" />

          {/* Isomerization Catalytic Reactor */}
          <rect x="175" y="45" width="55" height="75" rx="8" fill="#111A22" stroke="#D4AF37" strokeWidth="2" />
          <circle cx="202" cy="72" r="14" fill="#78350F" stroke="#F3E5AB" strokeWidth="1" strokeDasharray="3 2" className="animate-spin-slow" />
          <text x="202" y="75" textAnchor="middle" fill="#FFFBEB" fontSize="8" fontFamily="monospace">CATALYST</text>

          {/* Interconnecting Process Lines */}
          <path d="M110 50H175" stroke="#10B981" strokeWidth="2" strokeDasharray="4 2" />
          <path d="M110 115H150V85H175" stroke="#D4AF37" strokeWidth="1.5" />
          <path d="M230 80H285" stroke="#34D399" strokeWidth="2" />

          {/* Flow Arrows / Nodes */}
          <circle cx="35" cy="80" r="5" fill="#10B981" />
          <path d="M40 80H70" stroke="#10B981" strokeWidth="2" />

          <text x="52" y="18" fill="#94A3B8" fontSize="8" fontFamily="monospace">FEEDSTOCK</text>
          <text x="175" y="38" fill="#D4AF37" fontSize="8" fontFamily="monospace">ISOMERIZATION</text>
          <text x="285" y="75" textAnchor="end" fill="#34D399" fontSize="8" fontFamily="monospace">HIGH OCTANE</text>
        </svg>
      )}

      {type === "circular" && (
        <svg
          viewBox="0 0 320 160"
          className="w-full h-full max-w-[280px] text-accent-emerald"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular closed-loop orbits */}
          <circle
            cx="160"
            cy="80"
            r="55"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 4"
            className="animate-spin-slow opacity-60"
          />
          <circle
            cx="160"
            cy="80"
            r="35"
            stroke="#D4AF37"
            strokeWidth="1.5"
            className="opacity-70"
          />

          {/* Nodes */}
          <circle cx="160" cy="25" r="7" fill="#10B981" />
          <circle cx="215" cy="80" r="7" fill="#D4AF37" />
          <circle cx="160" cy="135" r="7" fill="#10B981" />
          <circle cx="105" cy="80" r="7" fill="#D4AF37" />

          {/* Central Core */}
          <rect
            x="146"
            y="66"
            width="28"
            height="28"
            rx="6"
            fill="#090D12"
            stroke="#10B981"
            strokeWidth="1.5"
          />
          <path
            d="M154 80H166M160 74V86"
            stroke="#34D399"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Flow Indicator Labels */}
          <text
            x="160"
            y="15"
            textAnchor="middle"
            fill="#94A3B8"
            fontSize="9"
            fontFamily="monospace"
          >
            RESOURCE INFLOW
          </text>
          <text
            x="160"
            y="152"
            textAnchor="middle"
            fill="#94A3B8"
            fontSize="9"
            fontFamily="monospace"
          >
            CLOSED-LOOP RECYCLE
          </text>
        </svg>
      )}

      {type === "timeline" && (
        <svg
          viewBox="0 0 320 160"
          className="w-full h-full max-w-[280px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Grid lines */}
          <line x1="30" y1="40" x2="290" y2="40" stroke="#1E2D3B" strokeWidth="1" />
          <line x1="30" y1="80" x2="290" y2="80" stroke="#1E2D3B" strokeWidth="1" />
          <line x1="30" y1="120" x2="290" y2="120" stroke="#1E2D3B" strokeWidth="1" />

          {/* Primavera P6 Critical Path Gantt Bars */}
          <rect x="40" y="32" width="90" height="16" rx="4" fill="#065F46" stroke="#10B981" strokeWidth="1.5" />
          <rect x="110" y="72" width="110" height="16" rx="4" fill="#78350F" stroke="#D4AF37" strokeWidth="1.5" />
          <rect x="200" y="112" width="80" height="16" rx="4" fill="#065F46" stroke="#10B981" strokeWidth="1.5" />

          {/* Linking Tie-in Connector Arrows */}
          <path d="M130 40V80H110" stroke="#34D399" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M220 80V120H200" stroke="#F3E5AB" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Milestone Node */}
          <circle cx="280" cy="120" r="5" fill="#D4AF37" stroke="#F8FAFC" strokeWidth="1" />

          <text x="45" y="44" fill="#F8FAFC" fontSize="9" fontFamily="monospace" fontWeight="bold">
            PRE-SHUTDOWN
          </text>
          <text x="115" y="84" fill="#F8FAFC" fontSize="9" fontFamily="monospace" fontWeight="bold">
            TIE-IN EXECUTION
          </text>
          <text x="205" y="124" fill="#F8FAFC" fontSize="9" fontFamily="monospace" fontWeight="bold">
            COMMISSIONING
          </text>
        </svg>
      )}

      {type === "network" && (
        <svg
          viewBox="0 0 320 160"
          className="w-full h-full max-w-[280px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Supply Hub Graph Network */}
          <line x1="60" y1="80" x2="160" y2="45" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="60" y1="80" x2="160" y2="115" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="160" y1="45" x2="260" y2="80" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="160" y1="115" x2="260" y2="80" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="160" y1="45" x2="160" y2="115" stroke="#1E2D3B" strokeWidth="1" />

          {/* Hub Nodes */}
          <circle cx="60" cy="80" r="16" fill="#090D12" stroke="#10B981" strokeWidth="2" />
          <text x="60" y="83" textAnchor="middle" fill="#34D399" fontSize="8" fontFamily="monospace" fontWeight="bold">
            SUPPLY
          </text>

          <circle cx="160" cy="45" r="14" fill="#090D12" stroke="#D4AF37" strokeWidth="1.5" />
          <text x="160" y="48" textAnchor="middle" fill="#F3E5AB" fontSize="8" fontFamily="monospace">
            INV-01
          </text>

          <circle cx="160" cy="115" r="14" fill="#090D12" stroke="#D4AF37" strokeWidth="1.5" />
          <text x="160" y="118" textAnchor="middle" fill="#F3E5AB" fontSize="8" fontFamily="monospace">
            INV-02
          </text>

          <circle cx="260" cy="80" r="18" fill="#090D12" stroke="#10B981" strokeWidth="2" />
          <text x="260" y="83" textAnchor="middle" fill="#34D399" fontSize="9" fontFamily="monospace" fontWeight="bold">
            500+
          </text>
          <text x="260" y="105" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">
            ORDERS
          </text>
        </svg>
      )}
    </div>
  );
};
