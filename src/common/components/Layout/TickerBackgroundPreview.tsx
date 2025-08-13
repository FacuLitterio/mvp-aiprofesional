import { Box } from "@mui/material"
import PreviewPage1 from "common/assets/previews/preview-page-1.png"
import PreviewPage2 from "common/assets/previews/preview-page-2.png"
import PreviewPage3 from "common/assets/previews/preview-page-3.png"
import PreviewPage4 from "common/assets/previews/preview-page-4.png"
import PreviewPage5 from "common/assets/previews/preview-page-5.png"
import PreviewPage6 from "common/assets/previews/preview-page-6.png"
import PreviewPage7 from "common/assets/previews/preview-page-7.png"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"

// Hook personalizado para animación infinita
const useTickerAnimation = (count: number, direction: "columns" | "rows") => {
  const controls = useAnimation()
  const controls2 = useAnimation()
  const controls3 = useAnimation()
  const controls4 = useAnimation()
  const controls5 = useAnimation()

  const allControls = [
    controls,
    controls2,
    controls3,
    controls4,
    controls5,
  ].slice(0, count)

  useEffect(() => {
    const animate = async () => {
      await Promise.all(
        allControls.map(async (control, index) => {
          const isEven = index % 2 === 0
          const animationProps =
            direction === "columns"
              ? { y: isEven ? [0, 100] : [0, -100] } // Columnas: arriba/abajo
              : { x: isEven ? [0, 100] : [0, -100] } // Filas: izquierda/derecha
          await control.start({
            ...animationProps,
            transition: {
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            },
          })
        }),
      )
    }
    void animate()
  }, [allControls, direction])

  return allControls
}

// Imágenes de previews
const previewImages = [
  PreviewPage1,
  PreviewPage2,
  PreviewPage3,
  PreviewPage4,
  PreviewPage5,
  PreviewPage6,
  PreviewPage7,
]

// Configuración de la cuadrícula
const rows = 4
const cols = 5

// Generar matriz sin adyacentes iguales
function generateGridNoAdjacents(
  images: string[],
  rows: number,
  cols: number,
): string[] {
  const grid: string[][] = Array.from({ length: rows }, () =>
    Array<string>(cols).fill(""),
  )
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const exclude = new Set<string>()
      if (c > 0) exclude.add(grid[r][c - 1])
      if (r > 0) exclude.add(grid[r - 1][c])
      const options = images.filter(img => !exclude.has(img))
      const choice = options[Math.floor(Math.random() * options.length)]
      grid[r][c] = choice
    }
  }
  return grid.flat()
}

const templateImages = generateGridNoAdjacents(previewImages, rows, cols)

// Dirección del movimiento (configurable)
const movementDirection: "columns" | "rows" = "columns"

const TickerBackgroundPreview = () => {
  // Generar controles de animación
  const controls = useTickerAnimation(cols, movementDirection)

  // Agrupar imágenes por columnas
  const groups = Array.from({ length: cols }, (_, c) =>
    Array.from({ length: rows }, (_, r) => templateImages[r * cols + c]),
  )

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        zIndex: -1,
      }}
    >
      {/* Base overlay oscuro para contraste */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.92)",
          zIndex: 0,
        }}
      />

      {/* Vignette radial - efecto de cine principal */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,1) 100%)",
        }}
      />

      {/* Vignette radial secundario para mayor profundidad */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 2,
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 35%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,1) 100%)",
        }}
      />

      {/* Overlay gradiente vertical suave */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 3,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.05) 65%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* Overlay gradiente horizontal suave */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 3,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.05) 65%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* Efecto de borde de película - líneas sutiles */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 4,
          background: `
            linear-gradient(90deg, transparent 0%, transparent 2%, rgba(255,255,255,0.03) 2.5%, transparent 3%, transparent 97%, rgba(255,255,255,0.03) 97.5%, transparent 98%, transparent 100%),
            linear-gradient(180deg, transparent 0%, transparent 2%, rgba(255,255,255,0.03) 2.5%, transparent 3%, transparent 97%, rgba(255,255,255,0.03) 97.5%, transparent 98%, transparent 100%)
          `,
        }}
      />

      {/* Efecto de grano sutil para textura cinematográfica */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 5,
          opacity: 0.15,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 1px)
          `,
          backgroundSize: "4px 4px, 3px 3px",
          animation: "grain 8s steps(10) infinite",
          "@keyframes grain": {
            "0%, 100%": { transform: "translate(0, 0)" },
            "10%": { transform: "translate(-5%, -5%)" },
            "20%": { transform: "translate(-10%, 5%)" },
            "30%": { transform: "translate(5%, -10%)" },
            "40%": { transform: "translate(-5%, 15%)" },
            "50%": { transform: "translate(-10%, 5%)" },
            "60%": { transform: "translate(15%, 0%)" },
            "70%": { transform: "translate(0%, 10%)" },
            "80%": { transform: "translate(-15%, 0%)" },
            "90%": { transform: "translate(10%, 5%)" },
          },
        }}
      />

      {/* Contenedor de la cuadrícula animada */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "0.7vw",
          width: "110vw",
          height: "110vh",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {groups.map((group, groupIndex) => (
          <motion.div
            key={groupIndex}
            animate={controls[groupIndex]}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.7vw",
            }}
          >
            {group.map((image, index) => (
              <img
                key={index}
                src={image as unknown as string}
                alt={`Template ${String(groupIndex * group.length + index + 1)}`}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  opacity: 0.85,
                  borderRadius: "12px",
                  boxShadow:
                    "0 4px 20px rgba(0,0,0,0.25), 0 0 40px rgba(0,0,0,0.15)",
                  filter: "contrast(1.1) saturate(1.05)",
                }}
              />
            ))}
          </motion.div>
        ))}
      </Box>
    </Box>
  )
}

export default TickerBackgroundPreview
