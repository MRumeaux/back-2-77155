export const errorHandler = (error, req, res, next) => {
    const status = error.status || 500; // Muestra código de error, sea por parámetro si posee o por defecto
    const message = error.message || "Error interno de Servidor"; // Muestra mensaje del error de acuerdo a try-catch
    res.status(status).json({message});
};