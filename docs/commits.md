# Guía mínima para commits

Objetivo: pocas reglas claras para commits consistentes y legibles en GitHub.

## Formato obligatorio
Usar:
```text
type(scope): breve descripción
```
- `scope` es opcional. Úsalo solo si aclara el área afectada (p. ej. `auth`, `api`, `docker`, `deps`).

## Tipos recomendados
- `feat` — Nueva funcionalidad  
- `fix` — Corrección de bug  
- `chore` — Mantenimiento (usar `chore(deps)` para dependencias)  
- `ci` — Cambios en pipelines / workflows  
- `docs` — Documentación  
- `test` — Tests / infra de tests  
- `perf` — Mejoras de rendimiento  
- `breaking` — Cambio incompatible (usar con cuidado; explicar en el body/footer)

## Reglas rápidas
- Dependencias: `chore(deps): actualizar <paquete> a x.y.z`  
- CI: `ci: <breve descripción>` (opcional `ci(workflow-name)`)  
- No usar tipo `deps` separado; preferir `chore(deps)`  
- Evitar scopes genéricos; usa el área concreta cuando aporte contexto

## Ejemplos
```text
feat(auth): agregar endpoint de autenticación
fix(registration): corregir validación de email
chore(deps): actualizar react a 19.2.3
chore: eliminar script obsoleto de deploy
ci(tests): actualizar workflow de GitHub Actions para tests
docs: agregar sección de despliegue con docker
test: migrar suite de phpunit a pest
perf(users): reducir consultas N+1 en listado de usuarios
breaking(api): cambiar ruta /users a /v2/users (incompatible)
```

## Consejos prácticos
- Si un PR toca múltiples áreas no relacionadas, preferir commits separados por área.  
- Mantén la línea de título ≤ 72 caracteres.  
- Si hace falta, en el cuerpo explica el "por qué" y cómo probar los cambios.  
- Para cambios incompatibles, incluye un footer claro con las instrucciones de migración.

Mantén esto simple: títulos claros, scopes cuando aporten contexto, y ejemplos en el mismo estilo para que GitHub muestre commits legibles.
