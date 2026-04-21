$file = 'src\pages\CheckoutPage.jsx'
$lines = Get-Content $file -Encoding UTF8

# Replace lines 512-518 (0-indexed) with fixed conditional map button
$newLines = @()
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($i -eq 512) {
        # Insert the conditional map block
        $newLines += "                        "
        $newLines += "                        {hasRealLocation && ("
        $newLines += "                          <a"
        $newLines += "                            href={`https://www.google.com/maps/dir/?api=1&destination=${finalLocation.lat},${finalLocation.lng}`}"
        $newLines += "                            target=""_blank"" rel=""noopener noreferrer"""
        $newLines += "                            style={{ padding: '12px 18px', background: colors.gold, color: 'white', borderRadius: '12px', fontSize: '14px', textDecoration: 'none', fontWeight: 'bold', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', boxShadow: ``0 5px 15px ${colors.gold}40``, flexShrink: 0 }}"
        $newLines += "                          >"
        $newLines += "                            <GeoAlt size={18} /> فتح الخريطة"
        $newLines += "                          </a>"
        $newLines += "                        )}"
        $newLines += "                      </div>"
        # skip lines 513-518 (they are broken)
        $i = 518
    } else {
        $newLines += $lines[$i]
    }
}

[System.IO.File]::WriteAllLines((Resolve-Path $file), $newLines, [System.Text.UTF8Encoding]::new($false))
Write-Host "Done. Total lines: $($newLines.Count)"
