# Guía para Pull Requests

Resumen rápido: sigue este formato para facilitar revisiones y merges automáticos.

## Formato del título
El título debe seguir exactamente:
`[type]: breve descripción`  
Ejemplo: `[feat]: agregar endpoint para autenticación`

## Tipos permitidos

| Tipo | Descripción |
|---|---|
| `breaking` | Cambios incompatibles que rompen la compatibilidad hacia atrás (requieren incrementar la versión mayor y proporcionar notas/migración claras) |
| `chore` | Mantenimiento y cambios generales (usar `chore(deps)` para actualizaciones de dependencias) |
| `ci` | Integración continua / pipelines |
| `docs` | Documentación |
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de errores |
| `perf` | Mejoras de rendimiento |
| `security` | Arreglos de seguridad |
| `test` | Tests |

## Requisitos obligatorios
- Asignar el label correspondiente al tipo del PR. Sin label no será aprobado.
- Referenciar issues relacionados en la descripción para que se cierren automáticamente al hacer merge (usar `Closes #123`, `Fixes #123`, `Resolves #123`).
- No abrir PRs directamente a `main` si los cambios no han pasado por `next`. Cualquier excepción debe ser aprobada explícitamente por el equipo de liberación.

## Regla especial: merges de next a main
- Flujo obligatorio: primero merge a `next`, luego a `main`. Está prohibido promover un cambio a `main` sin haberlo integrado previamente en `next`.
- Los PR que vayan desde la rama `next` hacia `main` deben llevar el label `skip-changelog`.
- El título de esos PR debe ser exactamente: `Merge to main release`
- Estas PRs no siguen el formato `[type]: ...` en el título (salvo indicación adicional del equipo).

## Checklist sugerido
- [ ] Título en formato `[type]: contexto` (nota: para merges `next -> main` usar `Merge to main release`)
- [ ] Label correspondiente asignado (para `next -> main` añadir `skip-changelog`)
- [ ] Descripción clara de los cambios
- [ ] Issues referenciados con keyword de cierre (ej. `Closes #123`)
- [ ] Confirmado que el cambio ya pasó por `next` antes de abrir PR a `main`
- [ ] Tests relevantes agregados/actualizados
- [ ] Documentación actualizada si aplica

## Plantilla mínima de descripción
- Qué hace: breve resumen (1-2 líneas)  
- Por qué: motivo del cambio / contexto  
- Cómo probar: pasos concretos para reproducir o validar  
- Issues: `Closes #<número>` / `Fixes #<número>`

## Ejemplos

Título:
```
[fix]: corregir validación de email en registro
```

Descripción mínima:
- Qué hace: corrige la validación que rechazaba correos con subdominio.
- Por qué: la regex anterior no permitía subdominios válidos.
- Cómo probar:
  1. Registrar usuario con email `user@mail.example.com`
  2. Verificar que la API responde 201
- Issues: `Closes #42`

Cumplir estas reglas garantiza una revisión más rápida y merges consistentes. Recuerda: ningún cambio debe llegar a `main` sin haber pasado por `next` primero.