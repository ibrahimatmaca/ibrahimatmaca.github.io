export interface EmailData {
  name: string;
  email: string;
  message: string;
}

export function generateEmailTemplate(data: EmailData): string {
  const { name, email, message } = data;
  const date = new Date().toLocaleString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Istanbul'
  });

  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #020617; color: #e2e8f0;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #020617;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #0f172a; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                IBRAHIM<span style="color: #e0f2fe;">DEV</span>
              </h1>
              <p style="margin: 8px 0 0 0; color: #e0f2fe; font-size: 14px; font-weight: 500;">
                New Contact Form Submission
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <!-- Date/Time -->
              <div style="margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #1e293b;">
                <p style="margin: 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                  Received
                </p>
                <p style="margin: 8px 0 0 0; color: #38bdf8; font-size: 16px; font-weight: 500;">
                  ${date}
                </p>
              </div>

              <!-- Sender Info -->
              <div style="margin-bottom: 32px;">
                <div style="margin-bottom: 24px;">
                  <p style="margin: 0 0 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                    From
                  </p>
                  <p style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 600;">
                    ${escapeHtml(name)}
                  </p>
                  <p style="margin: 4px 0 0 0; color: #38bdf8; font-size: 14px;">
                    ${escapeHtml(email)}
                  </p>
                </div>
              </div>

              <!-- Message -->
              <div style="background-color: #1e293b; border-left: 4px solid #0ea5e9; padding: 24px; border-radius: 8px; margin-bottom: 32px;">
                <p style="margin: 0 0 12px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">
                  Message
                </p>
                <div style="color: #e2e8f0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">
${escapeHtml(message)}
                </div>
              </div>

              <!-- Footer -->
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #1e293b; text-align: center;">
                <p style="margin: 0; color: #64748b; font-size: 12px;">
                  This email was sent from your portfolio contact form
                </p>
              </div>
            </td>
          </tr>
        </table>
        
        <!-- Bottom Spacing -->
        <table role="presentation" style="max-width: 600px; margin: 24px auto 0;">
          <tr>
            <td style="text-align: center; padding: 20px;">
              <p style="margin: 0; color: #475569; font-size: 12px;">
                © ${new Date().getFullYear()} İbrahim Atmaca. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

