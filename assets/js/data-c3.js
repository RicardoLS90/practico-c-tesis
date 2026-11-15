/* ==========================================================================
   Práctico — contenido del boceto C v3 · "La Tesis" con columna vertebral
   de consultora (hero con foto + cita, problemas numerados, cifras, etapas,
   tabla comparativa, diferenciales y cierre).
   ES y EN completos: ninguna clave queda vacía.
   ========================================================================== */

/* PENDIENTE DE REEMPLAZO: datos de contacto reales (email y WhatsApp). */
window.CONTACT = { email: "contacto@practico.com", wa: "" };

window.CONTENT = {
  es: {
    meta: {
      title: "Práctico — La conversación empieza por el negocio",
      description: "Consultoría de negocio, reportes e información y automatización de procesos. Cuatro etapas, cada una con un entregable que se puede verificar."
    },
    a11y: {
      skip: "Saltar al contenido",
      langToggle: "Cambiar idioma: español o inglés",
      nav: "Navegación principal",
      logo: "Práctico — ir al inicio"
    },
    brand: {
      descriptor: "Consultoría, Software e IA",
      logoAlt: "Práctico"
    },
    nav: {
      links: [
        { href: "#resolvemos", label: "Lo que resolvemos" },
        { href: "#resultados", label: "Resultados" },
        { href: "#metodo", label: "Cómo trabajamos" },
        { href: "#porque", label: "Por qué Práctico" }
      ],
      menu: "Menú",
      close: "Cerrar",
      cta: "Diagnóstico"
    },

    /* ------------------------------------------------------------- HERO
       La cita es copy literal del brief, sin atribución: no es un testimonio
       y no se le inventa cliente. */
    hero: {
      eyebrow: "CONSULTORÍA DE NEGOCIO · SOFTWARE · IA",
      quote: "«Crecí, pero no me quedó más dinero.»",
      sub: "Si esa frase te suena familiar, no estás solo.",
      para: "El problema casi nunca es que no trabajes suficiente. Es que nadie te mostró, con tus propios datos, dónde se pierde el margen.",
      cta1: "Hacer el diagnóstico",
      cta2: "Ver el método"
    },

    /* ----------------------------------------------- 01 lo que resolvemos */
    s2: {
      pill: "01",
      title: "Lo que resolvemos",
      intro: "No vendemos servicios. Resolvemos problemas específicos de empresas que crecen pero no capturan valor.",
      items: [
        {
          n: "01",
          title: "Consultoría de negocio",
          text: "Antes de comprar nada: qué preguntar, qué priorizar y qué dejar para después."
        },
        {
          n: "02",
          title: "Reportes e información",
          text: "Qué medir, con qué definición y cada cuánto se mira. Un tablero que se abre sirve; uno que nadie abre, no."
        },
        {
          n: "03",
          title: "Automatización de procesos",
          text: "Recién cuando el proceso y el dato están claros. Antes, automatizar es congelar el desorden."
        }
      ]
    },

    /* ----------------------------------------------- 02 resultados reales */
    s3: {
      pill: "02",
      title: "Resultados reales",
      intro: "No inflamos números. Preferimos un dato pendiente a uno inventado.",
      items: [
        { value: "15", label: "años de experiencia" },
        { value: "+30", label: "clientes acompañados" },
        { value: "5", label: "sectores: retail, distribución, manufactura, servicios, agro" },
        { value: "0", label: "cifras publicadas sin autorización del cliente" }
      ]
    },

    /* ------------------------------------------------ 03 cómo trabajamos */
    s4: {
      pill: "03",
      title: "Cómo trabajamos",
      intro: "Cuatro etapas. Cada una con un entregable que se puede verificar.",
      deliverableLabel: "Entregable",
      phases: [
        {
          n: "01",
          name: "Negocio",
          text: "Qué preguntar antes de comprar nada.",
          deliverable: "diagnóstico, prioridades y decisión de qué no hacer."
        },
        {
          n: "02",
          name: "Proceso",
          text: "Dónde se pierde el tiempo y el margen.",
          deliverable: "mapa de proceso, cuellos de botella, responsables."
        },
        {
          n: "03",
          name: "Datos",
          text: "Qué medir para poder decidir.",
          deliverable: "reportes, definiciones y frecuencia de revisión."
        },
        {
          n: "04",
          name: "Tecnología",
          text: "Solo aquí aparece el software.",
          deliverable: "automatización de procesos e integraciones."
        }
      ],
      diffs: [
        "Diagnosticamos y ejecutamos con tu equipo, no te dejamos un informe para archivar.",
        "Cada etapa tiene un entregable verificable.",
        "Ninguna herramienta entra antes de que la etapa 3 esté resuelta.",
        "Tu equipo se queda con el método, no con una dependencia."
      ]
    },

    /* ------------------------------------------------------- 04 comparativa */
    s5: {
      pill: "04",
      title: "Lo que otros hacen / Lo que Práctico hace",
      otherShort: "Otros",
      practicoShort: "Práctico",
      rows: [
        {
          other: "Entregan un diagnóstico y desaparecen.",
          ours: "Diagnosticamos y ejecutamos contigo."
        },
        {
          other: "Empiezan por la herramienta.",
          ours: "Empiezan por el negocio."
        },
        {
          other: "Prometen resultados sin línea base.",
          ours: "Medimos contra lo que había antes de empezar."
        },
        {
          other: "Proyectos largos sin hitos claros.",
          ours: "Cuatro etapas, cada una con su entregable."
        },
        {
          other: "Hablan de transformación digital.",
          ours: "Decimos qué número cambia y qué decisión destraba."
        }
      ]
    },

    /* -------------------------------------------------- 05 por qué Práctico */
    s6: {
      pill: "05",
      title: "Por qué Práctico",
      items: [
        {
          n: "01",
          title: "Co-creamos, no entregamos",
          text: "El plan se arma con tu equipo, en tu operación, no en una presentación."
        },
        {
          n: "02",
          title: "Rigor sobre el dato",
          text: "Cada recomendación nace de tus números, no de un marco genérico."
        },
        {
          n: "03",
          title: "Método probado",
          text: "Cuatro etapas en orden, refinadas en más de treinta proyectos."
        },
        {
          n: "04",
          title: "Transparencia",
          text: "Si el problema se resuelve con una decisión y no con un sistema, lo decimos antes de cotizar."
        },
        {
          n: "05",
          title: "Transferencia real",
          text: "Tu equipo aprende haciendo. El objetivo es que no nos necesites para lo mismo dos veces."
        }
      ]
    },

    /* -------------------------------------------------------------- cierre */
    s7: {
      line: "La conversación empieza por el negocio, no por el presupuesto.",
      cta: "Conversar"
    },

    footer: {
      tagline: "Inteligencia empresarial y digital",
      servicesTitle: "Servicios",
      companyTitle: "Empresa",
      contactTitle: "Contacto",
      services: [
        { label: "Consultoría de negocio", mailto: "negocio" },
        { label: "Reportes e información", mailto: "reportes" },
        { label: "Automatización de procesos", mailto: "automatizacion" }
      ],
      company: [
        { label: "Cómo trabajamos", href: "#metodo" },
        { label: "Resultados", href: "#resultados" },
        { label: "Por qué Práctico", href: "#porque" }
      ],
      contactLink: "Escribir un correo",
      legal: "Todos los derechos reservados.",
      bocetos: "Bocetos de home · A / B / C",
      descriptor: "Buenos Aires"
    },

    mailto: {
      diagnostico: {
        subject: "Diagnóstico · Práctico",
        body: "Hola. Quiero hacer el diagnóstico."
      },
      conversar: {
        subject: "Conversación · Práctico",
        body: "Hola. Quiero conversar sobre el negocio."
      },
      negocio: {
        subject: "Consultoría de negocio · Práctico",
        body: "Hola. Quiero consultar por consultoría de negocio."
      },
      reportes: {
        subject: "Reportes e información · Práctico",
        body: "Hola. Quiero consultar por reportes e información."
      },
      automatizacion: {
        subject: "Automatización de procesos · Práctico",
        body: "Hola. Quiero consultar por automatización de procesos."
      }
    }
  },

  en: {
    meta: {
      title: "Práctico — The conversation starts with the business",
      description: "Business consulting, reports and information, and process automation. Four stages, each with a deliverable you can verify."
    },
    a11y: {
      skip: "Skip to content",
      langToggle: "Change language: Spanish or English",
      nav: "Main navigation",
      logo: "Práctico — go to home"
    },
    brand: {
      descriptor: "Consulting, Software and AI",
      logoAlt: "Práctico"
    },
    nav: {
      links: [
        { href: "#resolvemos", label: "What we solve" },
        { href: "#resultados", label: "Results" },
        { href: "#metodo", label: "How we work" },
        { href: "#porque", label: "Why Práctico" }
      ],
      menu: "Menu",
      close: "Close",
      cta: "Assessment"
    },

    hero: {
      eyebrow: "BUSINESS CONSULTING · SOFTWARE · AI",
      quote: "“I grew, but there was no money left.”",
      sub: "If that sentence sounds familiar, you're not alone.",
      para: "The problem is almost never that you don't work hard enough. It's that nobody showed you, with your own numbers, where the margin is lost.",
      cta1: "Request the assessment",
      cta2: "See the method"
    },

    s2: {
      pill: "01",
      title: "What we solve",
      intro: "We don't sell services. We solve specific problems for companies that grow but don't capture value.",
      items: [
        {
          n: "01",
          title: "Business consulting",
          text: "Before buying anything: what to ask, what to prioritise and what to leave for later."
        },
        {
          n: "02",
          title: "Reports and information",
          text: "What to measure, with which definition and how often it is reviewed. A dashboard that gets opened works; one nobody opens doesn't."
        },
        {
          n: "03",
          title: "Process automation",
          text: "Only once the process and the data are clear. Before that, automating is freezing the disorder."
        }
      ]
    },

    s3: {
      pill: "02",
      title: "Real results",
      intro: "We don't inflate numbers. We prefer a pending figure to an invented one.",
      items: [
        { value: "15", label: "years of experience" },
        { value: "+30", label: "clients supported" },
        { value: "5", label: "sectors: retail, distribution, manufacturing, services, agribusiness" },
        { value: "0", label: "figures published without the client's authorisation" }
      ]
    },

    s4: {
      pill: "03",
      title: "How we work",
      intro: "Four stages. Each one with a deliverable you can verify.",
      deliverableLabel: "Deliverable",
      phases: [
        {
          n: "01",
          name: "Business",
          text: "What to ask before buying anything.",
          deliverable: "assessment, priorities and the decision of what not to do."
        },
        {
          n: "02",
          name: "Process",
          text: "Where time and margin are lost.",
          deliverable: "process map, bottlenecks, owners."
        },
        {
          n: "03",
          name: "Data",
          text: "What to measure so you can decide.",
          deliverable: "reports, definitions and review frequency."
        },
        {
          n: "04",
          name: "Technology",
          text: "This is where software finally appears.",
          deliverable: "process automation and integrations."
        }
      ],
      diffs: [
        "We diagnose and execute with your team; we don't leave you a report to file away.",
        "Every stage has a verifiable deliverable.",
        "No tool comes in before stage 3 is resolved.",
        "Your team keeps the method, not a dependency."
      ]
    },

    s5: {
      pill: "04",
      title: "What others do / What Práctico does",
      otherShort: "Others",
      practicoShort: "Práctico",
      rows: [
        {
          other: "They deliver an assessment and disappear.",
          ours: "We diagnose and execute with you."
        },
        {
          other: "They start with the tool.",
          ours: "We start with the business."
        },
        {
          other: "They promise results with no baseline.",
          ours: "We measure against what existed before we started."
        },
        {
          other: "Long projects with no clear milestones.",
          ours: "Four stages, each with its deliverable."
        },
        {
          other: "They talk about digital transformation.",
          ours: "We say which number changes and which decision it unblocks."
        }
      ]
    },

    s6: {
      pill: "05",
      title: "Why Práctico",
      items: [
        {
          n: "01",
          title: "Co-create, don't deliver",
          text: "The plan is built with your team, in your operation, not in a slide deck."
        },
        {
          n: "02",
          title: "Rigor on the data",
          text: "Every recommendation comes from your numbers, not from a generic framework."
        },
        {
          n: "03",
          title: "Proven method",
          text: "Four stages in order, refined across more than thirty projects."
        },
        {
          n: "04",
          title: "Transparency",
          text: "If the problem is solved by a decision and not by a system, we say so before quoting."
        },
        {
          n: "05",
          title: "Real transfer",
          text: "Your team learns by doing. The goal is that you don't need us for the same thing twice."
        }
      ]
    },

    s7: {
      line: "The conversation starts with the business, not with the budget.",
      cta: "Talk to us"
    },

    footer: {
      tagline: "Business and digital intelligence",
      servicesTitle: "Services",
      companyTitle: "Company",
      contactTitle: "Contact",
      services: [
        { label: "Business consulting", mailto: "negocio" },
        { label: "Reports and information", mailto: "reportes" },
        { label: "Process automation", mailto: "automatizacion" }
      ],
      company: [
        { label: "How we work", href: "#metodo" },
        { label: "Results", href: "#resultados" },
        { label: "Why Práctico", href: "#porque" }
      ],
      contactLink: "Write an email",
      legal: "All rights reserved.",
      bocetos: "Home sketches · A / B / C",
      descriptor: "Buenos Aires"
    },

    mailto: {
      diagnostico: {
        subject: "Assessment · Práctico",
        body: "Hello. I would like to request the assessment."
      },
      conversar: {
        subject: "Conversation · Práctico",
        body: "Hello. I would like to talk about the business."
      },
      negocio: {
        subject: "Business consulting · Práctico",
        body: "Hello. I would like to ask about business consulting."
      },
      reportes: {
        subject: "Reports and information · Práctico",
        body: "Hello. I would like to ask about reports and information."
      },
      automatizacion: {
        subject: "Process automation · Práctico",
        body: "Hello. I would like to ask about process automation."
      }
    }
  }
};
