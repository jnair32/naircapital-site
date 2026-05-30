# Nair Capital Site

Static website for `naircapital.ch`.

## Structure

```text
/
  Public marketing and firm pages

/research/
  Research and market analysis section intended to be protected with Cloudflare Access

/research/reports/
  Generated interactive stock reports copied from StockScreener
```

## Local Preview

Open `index.html` directly, or run a local static server:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Cloudflare Access

Deploy this folder to Cloudflare Pages, then protect:

```text
/research/*
```

with Cloudflare Access and allow only approved email addresses.

## Contact Form

The contact form posts to a Cloudflare Pages Function at:

```text
/api/contact
```

Create a Workers KV namespace in Cloudflare, then bind it to the Pages project:

```text
Variable name: CONTACT_SUBMISSIONS
```

Cloudflare path:

```text
Workers & Pages -> naircapital-site -> Settings -> Bindings -> Add -> KV namespace
```

Redeploy after adding the binding. Submissions are stored as JSON records with keys starting with `contact:`.

## Publishing Reports

Copy generated report files from StockScreener:

```bash
cp ../StockScreener/visualizations/sp500_interactive_dashboard.html research/reports/
cp ../StockScreener/visualizations/nasdaq100_interactive_dashboard.html research/reports/
```
