# Add the Financial Calculator to the Neex GitHub Repository

## Files in this package

- `finance.html` — the complete financial calculator page.
- `index-navigation-snippet.html` — optional navigation button to paste into your existing `index.html`.

## Upload through the GitHub website

1. Open the **Neex** repository on GitHub.
2. Select **Add file** → **Upload files**.
3. Upload `finance.html`.
4. Select **Commit changes**.
5. Open your existing `index.html`.
6. Select the pencil icon to edit it.
7. Add this link somewhere inside the `<body>` section:

```html
<a href="finance.html">Financial Calculator</a>
```

8. Select **Commit changes** again.
9. Wait for GitHub Pages to redeploy, then open:

```text
https://YOUR-GITHUB-USERNAME.github.io/Neex/finance.html
```

## Important data-storage note

The page uses browser `localStorage`. Data remains saved on the same browser and device, but it is not automatically synchronized to another phone or computer.

Use **Download Excel** regularly as a backup.

## Fee logic

The fixed fee is 1.5%:

- Deposit fee = Deposit × 1.5%
- Withdrawal fee = Withdrawal × 1.5%
- Balance = Previous balance + Deposit − Deposit fee − Withdrawal − Withdrawal fee

## Excel import format

The first sheet should use these headings:

1. Date
2. Order/Reference Number
3. Deposit Amount
4. Deposit Fee Charged (1.5%)
5. Withdrawal Amount
6. Withdrawal Fee Charged (1.5%)
7. Balance
8. Remarks

The website recalculates fees and balances after import.
