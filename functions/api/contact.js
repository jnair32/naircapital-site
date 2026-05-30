const MAX_FIELD_LENGTH = 4000;

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function clean(value, maxLength = MAX_FIELD_LENGTH) {
  return String(value || "").trim().slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function onRequest(context) {
  if (context.request.method !== "POST") {
    return jsonResponse({ ok: false, message: "Method not allowed." }, 405);
  }

  const formData = await context.request.formData();
  const honeypot = clean(formData.get("company"), 200);

  if (honeypot) {
    return jsonResponse({ ok: true });
  }

  const name = clean(formData.get("name"), 200);
  const email = clean(formData.get("email"), 320);
  const topic = clean(formData.get("topic"), 200);
  const message = clean(formData.get("message"), 4000);

  if (!name || !email || !message) {
    return jsonResponse({ ok: false, message: "Please complete all required fields." }, 400);
  }

  if (!isValidEmail(email)) {
    return jsonResponse({ ok: false, message: "Please enter a valid email address." }, 400);
  }

  if (!context.env.CONTACT_SUBMISSIONS) {
    return jsonResponse(
      { ok: false, message: "The contact form is not configured yet." },
      500,
    );
  }

  const now = new Date().toISOString();
  const submission = {
    name,
    email,
    topic,
    message,
    created_at: now,
    user_agent: context.request.headers.get("user-agent") || "",
    ip_country: context.request.cf?.country || "",
  };
  const id = `contact:${now}:${crypto.randomUUID()}`;

  await context.env.CONTACT_SUBMISSIONS.put(id, JSON.stringify(submission));

  return jsonResponse({ ok: true, message: "Thank you. Your message has been sent." });
}
