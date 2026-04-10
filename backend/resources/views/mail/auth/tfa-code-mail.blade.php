<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Código de Seguridad</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Montserrat', Arial, sans-serif; margin:0; padding:0; background:#f5f7fb; color:#333; }
    .container { max-width:600px; margin:24px auto; background:#fff; border-radius:6px; overflow:hidden; box-shadow:0 4px 18px rgba(0,0,0,.06); }
    .header { background:#000F6A; color:#fff; padding:18px 20px; display:flex; align-items:center; gap:12px; }
    .logo { width:44px; height:44px; object-fit:contain; }
    .brand { font-family:'Poppins', Arial, sans-serif; font-weight:700; font-size:18px; margin:0; }
    .body { padding:24px; }
    .greeting { margin:0 0 12px 0; font-size:15px; }
    .message { margin:0 0 18px 0; color:#444; line-height:1.5; }
    .code-box { display:flex; align-items:center; justify-content:center; background:#f4f6fb; border:1px dashed #d8e0ff; padding:20px; border-radius:8px; margin-bottom:18px; }
    .code { font-family:'Poppins', Arial, sans-serif; font-size:28px; letter-spacing:4px; color:#e20600; font-weight:700; }
    .meta { font-size:13px; color:#666; margin-bottom:18px; }
    .cta { display:inline-block; background:#e20600; color:#fff; padding:10px 16px; border-radius:6px; text-decoration:none; font-weight:600; font-family:'Poppins', Arial, sans-serif; }
    .footer { background:#fafafa; border-top:4px solid #000F6A; padding:14px 20px; font-size:12px; color:#666; }
    @media (max-width:480px){ .code { font-size:22px; letter-spacing:3px; } .header{padding:14px} .body{padding:16px} }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="{{ asset('favicon.svg') }}" alt="logo" class="logo">
      <div>
        <p class="brand">System Example</p>
        <p style="margin:0;font-size:12px;opacity:.85">noreply@example.com</p>
      </div>
    </div>

    <div class="body">
      <p class="greeting">Hola {{ $name ?? 'Usuario' }},</p>

      <p class="message">Se te envía este código de verificación para poder acceder a tu cuenta. Ingresa el siguiente código en la aplicación para continuar.</p>

      <div class="code-box" role="presentation" aria-hidden="true">
        <span class="code">{{ $code ?? '—' }}</span>
      </div>

      <p class="meta">
        Este código expira {{ $expires ?? 'en 10 minutos' }}. Si no solicitaste este código, puedes ignorar este correo o contactar a soporte.
      </p>
    </div>

    <div class="footer">
      <div>Sistem Example® | Example dir</div>
      <div style="margin-top:6px;">Si necesitas ayuda, intente contactar con sistemas.</div>
      <div style="margin-top:8px;font-size:11px;color:#999">Este es un mensaje automático. Por favor, no responda directamente si viene de noreply.</div>
    </div>
  </div>
</body>
</html>