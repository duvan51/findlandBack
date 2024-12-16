/**
 * Calcula el rendimiento con intereses compuestos.
 *
 * @param capitalInicial - El capital inicial invertido.
 * @param interesMensual - La tasa de interés mensual (en porcentaje, ej.: 5% = 5).
 * @param meses - El número de meses que dura la inversión.
 * @param aporteMensual - La cantidad adicional ingresada cada mes (opcional, por defecto 0).
 * @returns El total acumulado después de los meses indicados.
 */
export default function calcularInteresCompuesto(
  capitalInicial: number,
  interesMensual: number,
  meses: number,
  aporteMensual: number = 0
): number {
  if (capitalInicial < 0 || interesMensual < 0 || meses < 0 || aporteMensual < 0) {
    throw new Error("Todos los valores deben ser positivos.");
  }

  const tasaMensual = interesMensual / 100; // Convertir porcentaje a decimal
  let totalAcumulado = capitalInicial;

  for (let mes = 1; mes <= meses; mes++) {
    // Calcular intereses del capital acumulado hasta el momento
    totalAcumulado += totalAcumulado * tasaMensual;

    // Agregar el aporte mensual al final del mes
    totalAcumulado += aporteMensual;
  }

  return parseFloat(totalAcumulado.toFixed(2)); // Redondear a dos decimales
}

// Ejemplo de uso:
try {
  const capitalInicial = 10000;  // Capital inicial
  const interesMensual = 1.5;    // Tasa de interés mensual en porcentaje (1.5%)
  const meses = 12;              // Duración en meses
  const aporteMensual = 500;     // Dinero ingresado mensualmente

  const total = calcularInteresCompuesto(capitalInicial, interesMensual, meses, aporteMensual);
  console.log(`El total acumulado después de ${meses} meses es: $${total}`);
} catch (error) {
  console.error(error);
}
