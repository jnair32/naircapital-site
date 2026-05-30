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

## Publishing Reports

Copy generated report files from StockScreener:

```bash
cp ../StockScreener/visualizations/sp500_interactive_dashboard.html research/reports/
cp ../StockScreener/visualizations/nasdaq100_interactive_dashboard.html research/reports/
```

