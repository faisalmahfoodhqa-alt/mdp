$file = "src\pages\CheckoutPage.jsx"
$content = Get-Content $file -Raw -Encoding UTF8

$old = @"
               {paymentMethod === 'wallet' && (
                  <div style={{ padding: '15px', marginTop: '5px', background: colors.lightGray, borderRadius: '10px' }}>
                     <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '10px', color: colors.gray }}>`u{0627}`u{062E}`u{062A}`u{0631} `u{0648}`u{0633}`u{064A}`u{0644}`u{0629} `u{0627}`u{0644}`u{062F}`u{0641}`u{0639} `u{0627}`u{0644}`u{0645}`u{0646}`u{0627}`u{0633}`u{0628}`u{0629}:</div>
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
"@

Write-Output "Searching..."
if ($content.Contains("repeat(3, 1fr)")) {
    Write-Output "Found target content!"
} else {
    Write-Output "NOT FOUND"
}

