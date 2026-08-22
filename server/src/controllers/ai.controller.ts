import { Request, Response } from 'express';

const DAYFLOW_SYSTEM_INSTRUCTION = `You are Dayflow AI, the intelligent virtual assistant for Dayflow HRMS (Human Resource Management System).
Your task is to help users, HR directors, admins, and employees understand Dayflow HRMS features and get assistance.

Key Information about Dayflow HRMS:
- **Core Modules**:
  1. Digital Onboarding: Paperless 60-second company setup, company logo upload, auto-generated employee login IDs & temporary passwords (format: COMP-JD-2026-0001), digital KYC vault.
  2. Smart Attendance: Real-time one-click clock-in / clock-out telemetry, geo-fenced tracking, overtime & anomaly detection, live presence dashboard.
  3. Leave Management: Annual, Sick, & Casual leave balance matrix, 1-click approvals, holiday calendar integration, automated policy enforcement.
  4. Payroll Visibility: Automated calculation engine, net pay vs gross pay breakdown, tax deduction audits, instant 1-click PDF payslip downloads.
  5. Role-Based Access: Strict separation between Admin/HR Officer Control Center (full setup, payroll, leave review) and Employee Self-Service Portal (personal clock in/out, leave request, payslip view).
- **Pricing**:
  - Starter: $29/mo ($22/mo annual) for up to 25 employees.
  - Growth: $79/mo ($59/mo annual) for up to 150 employees (Most Popular).
  - Enterprise: Custom pricing for unlimited employees with custom SSO & dedicated SLA.
- **Trial**: 14-day free trial with full feature access.

Keep responses concise (2-4 paragraphs max), helpful, friendly, and formatted nicely in markdown with bullet points where appropriate. Always assist users with Dayflow HR workflow questions.`;

// Intelligent fallback responses when GEMINI_API_KEY is not configured or offline
function generateFallbackResponse(userMessage: string): string {
  const query = userMessage.toLowerCase();

  if (query.includes('attendance') || query.includes('clock') || query.includes('check in') || query.includes('timesheet')) {
    return `### ⏱️ **Smart Attendance Tracking**
Dayflow HRMS provides real-time attendance telemetry:
- **One-Click Check-In / Check-Out**: Employees can record attendance from their desktop or mobile portal.
- **Geo & IP Rules**: Ensure check-ins occur from authorized workplace locations.
- **Overtime & Anomaly Detection**: Automatically flags late entries, early departures, and overtime hours.`;
  }

  if (query.includes('leave') || query.includes('vacation') || query.includes('time off') || query.includes('holiday')) {
    return `### 🌴 **Leave Management Matrix**
Dayflow simplifies time-off management:
- **Leave Balances**: Real-time tracking of Annual, Sick, and Casual leave quotas.
- **Instant Approvals**: HR Officers and Managers receive push notifications to approve or deny requests in 1 click.
- **Shift & Holiday Integration**: Automatically syncs with company holiday calendars.`;
  }

  if (query.includes('payroll') || query.includes('salary') || query.includes('payslip') || query.includes('tax')) {
    return `### 💸 **Automated Payroll Engine**
Clear payroll visibility for both HR and Employees:
- **Gross & Net Salary Breakdown**: Automated tax and benefit deductions.
- **PDF Downloads**: Employees can download official PDF payslips directly from their portal.
- **Direct Distribution**: Eliminates manual payroll distribution friction.`;
  }

  if (query.includes('onboard') || query.includes('register') || query.includes('id') || query.includes('sign up')) {
    return `### 🚀 **Frictionless Onboarding & Employee IDs**
Getting started takes under 60 seconds:
- **Auto-Generated Employee IDs**: Dayflow generates unique IDs in the format \`COMPANY-INITIALS-YEAR-SERIAL\` (e.g. \`ACME-JD-2026-0001\`).
- **Digital KYC Vault**: Securely store photo IDs, NDAs, and tax documents in one centralized vault.`;
  }

  if (query.includes('price') || query.includes('cost') || query.includes('plan') || query.includes('trial') || query.includes('free')) {
    return `### 💳 **Dayflow Pricing Plans**
We offer transparent pricing with a **14-day free trial**:
- **Starter ($22/mo annual)**: Up to 25 employees. Attendance, leaves & employee directory.
- **Growth ($59/mo annual)**: Up to 150 employees. Includes automated payroll & geo rules.
- **Enterprise (Custom)**: Unlimited employees with custom SSO and 99.99% SLA.`;
  }

  if (query.includes('role') || query.includes('admin') || query.includes('employee') || query.includes('permission')) {
    return `### 🛡️ **Role-Based Access Control**
Dayflow enforces strict multi-tier permissions:
- **Admin & HR Officers**: Full executive oversight, policy setup, leave approval, and payroll execution.
- **Employees**: Clean self-service portal to track personal attendance, apply for leave, and view payslips.`;
  }

  return `Welcome to **Dayflow HRMS AI Support**! 👋

I can help answer questions about:
1. **Attendance & Time Tracking** ⏱️
2. **Leave Applications & Approvals** 🌴
3. **Payroll & PDF Payslips** 💸
4. **Onboarding & Employee Login IDs** 🚀
5. **Pricing & Plans** 💳

What would you like to know more about?`;
}

export const handleAiChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message string is required' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Return smart fallback answer if no Gemini API key is configured
      const reply = generateFallbackResponse(message);
      res.json({
        ok: true,
        reply,
        source: 'dayflow-fallback-engine'
      });
      return;
    }

    // Call Google Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

    const formattedContents = [
      {
        role: 'user',
        parts: [{ text: `${DAYFLOW_SYSTEM_INSTRUCTION}\n\nUser Question: ${message}` }]
      }
    ];

    // Include recent conversation history if provided
    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-6).map((h: any) => ({
        role: h.role === 'model' || h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.text || h.message || '' }]
      }));
      formattedContents.unshift(...recentHistory);
    }

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: formattedContents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn('Gemini API Warning:', response.status, errText);
      const reply = generateFallbackResponse(message);
      res.json({ ok: true, reply, source: 'dayflow-fallback-engine' });
      return;
    }

    const data: any = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      const reply = generateFallbackResponse(message);
      res.json({ ok: true, reply, source: 'dayflow-fallback-engine' });
      return;
    }

    res.json({
      ok: true,
      reply: replyText,
      source: 'gemini-3.6-flash'
    });

  } catch (error: any) {
    console.error('AI Chat Error:', error);
    const reply = generateFallbackResponse(req.body?.message || '');
    res.json({ ok: true, reply, source: 'dayflow-fallback-engine' });
  }
};
