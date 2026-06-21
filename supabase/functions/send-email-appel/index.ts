import nodemailer from "nodemailer";

interface Payload {
  name: string;
  phone: string;
  email: string;
  company?: string;
}

const SMTP_HOST = Deno.env.get("SMTP_HOST") || "";
const SMTP_PORT = parseInt(Deno.env.get("SMTP_PORT") || "587", 10);
const SMTP_USER = Deno.env.get("SMTP_USER") || "";
const SMTP_PASS = Deno.env.get("SMTP_PASS") || "";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "";
const TO_EMAIL = Deno.env.get("TO_EMAIL") || "";

const corsHeaders = (req: Request) => ({
  "Access-Control-Allow-Origin": "https://appel.eiden-group.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": req.headers.get("Access-Control-Request-Headers") || "Content-Type, Authorization, x-client-info, apikey",
  "Access-Control-Max-Age": "86400",
});

Deno.serve(async (req: Request) => {
  const headers = corsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...headers, "Content-Type": "application/json" },
    });
  }

  try {
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !FROM_EMAIL || !TO_EMAIL) {
      throw new Error(
        "Missing SMTP configuration. Set SMTP_HOST, SMTP_USER, SMTP_PASS, FROM_EMAIL, TO_EMAIL in Supabase secrets."
      );
    }

    const { name, phone, email, company } = (await req.json()) as Payload;

    if (!name || !phone || !email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, phone, email" }),
        { status: 400, headers: { ...headers, "Content-Type": "application/json" } }
      );
    }

    const companyInfo = company?.trim() || "Non renseigné";
    const html = buildEmailHtml({ name, phone, email, company: companyInfo });

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `EIDEN Group <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Appel découverte · ${name}${company && company !== "Non renseigné" ? ` · ${company}` : ""}`,
      html,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...headers, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Internal server error" }),
      { status: 500, headers: { ...headers, "Content-Type": "application/json" } }
    );
  }
});

function buildEmailHtml(data: Payload): string {
  const { name, phone, email, company } = data;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Appel découverte · EIDEN</title>
</head>
<body style="margin:0;padding:0;background-color:#f7f5f0;font-family:Georgia,'Times New Roman',serif;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f5f0;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#f7f5f0;border-radius:12px;overflow:hidden;">

          <tr>
            <td style="height:6px;background-color:#0C5657;"></td>
          </tr>

          <tr>
            <td style="padding:32px 36px 0;">
              <table role="presentation" width="100%">
                <tr>
                  <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#0C5657;">
                    EIDEN GROUP
                  </td>
                  <td align="right" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:1px;color:#9b8c6b;">
                    ARCHITECTURE D'ENTREPRISE
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:16px 36px 0;">
              <table role="presentation" width="100%"><tr><td style="height:1px;background-color:#0C5657;opacity:0.15;"></td></tr></table>
            </td>
          </tr>

          <tr>
            <td style="padding:28px 36px 0;">
              <h1 style="margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;letter-spacing:-0.3px;color:#1a2e2b;">
                Nouvelle demande d'appel découverte
              </h1>
              <p style="margin:8px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.6;color:#4a5552;">
                Un prospect a rempli le formulaire et souhaite être contacté.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#efece4;border-radius:8px;">
                <tr>
                  <td style="padding:24px 28px;">

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                      <tr>
                        <td width="120" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#9b8c6b;vertical-align:top;padding:4px 0;">
                          Nom complet
                        </td>
                        <td style="font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#1a2e2b;padding:4px 0;">
                          ${escapeHtml(name)}
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                      <tr>
                        <td width="120" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#9b8c6b;vertical-align:top;padding:4px 0;">
                          Téléphone
                        </td>
                        <td style="font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#1a2e2b;padding:4px 0;">
                          <a href="tel:${escapeHtml(phone)}" style="color:#0C5657;text-decoration:none;">${escapeHtml(phone)}</a>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                      <tr>
                        <td width="120" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#9b8c6b;vertical-align:top;padding:4px 0;">
                          E-mail
                        </td>
                        <td style="font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#1a2e2b;padding:4px 0;">
                          <a href="mailto:${escapeHtml(email)}" style="color:#0C5657;text-decoration:none;">${escapeHtml(email)}</a>
                        </td>
                      </tr>
                    </table>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="120" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#9b8c6b;vertical-align:top;padding:4px 0;">
                          Entreprise
                        </td>
                        <td style="font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#1a2e2b;padding:4px 0;">
                          ${escapeHtml(company || "Non renseigné")}
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 36px 8px;">
              <table role="presentation" width="100%">
                <tr>
                  <td align="center">
                    <a href="mailto:${escapeHtml(email)}"
                       style="display:inline-block;padding:14px 32px;background-color:#0C5657;color:#f7f5f0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.5px;text-decoration:none;border-radius:50px;">
                      Répondre à cette demande →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 36px 32px;">
              <table role="presentation" width="100%"><tr><td style="height:1px;background-color:#0C5657;opacity:0.1;"></td></tr></table>
              <table role="presentation" width="100%" style="margin-top:16px;">
                <tr>
                  <td style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;color:#9b8c6b;letter-spacing:0.5px;">
                    EIDEN GROUP · Agadir Bay, Technopole, Agadir, Maroc
                  </td>
                  <td align="right" style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:10px;color:#9b8c6b;">
                    contact@eiden-group.com
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
