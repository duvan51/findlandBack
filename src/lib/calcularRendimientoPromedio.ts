/**
 * Calcula el rendimiento promedio para inversores.
 *
 * @param ingresosTotales - Ingresos totales generados por las inversiones.
 * @param capitalInvertido - El capital total invertido por los usuarios.
 * @param costosOpcionales - Costos asociados, como comisiones o pérdidas. Valor por defecto: 0.
 * @returns Rendimiento promedio neto en porcentaje.
 */
export default function calcularRendimientoPromedio(
  ingresosTotales: number,
  capitalInvertido: number,
  costosOpcionales: number = 0
): number {
  if (capitalInvertido <= 0) {
    throw new Error("El capital invertido debe ser mayor a 0.");
  }

  const gananciaNeta = ingresosTotales - capitalInvertido - costosOpcionales;
  const rendimiento = (gananciaNeta / capitalInvertido) * 100;

  return parseFloat(rendimiento.toFixed(2)); // Redondea a dos decimales.
}
