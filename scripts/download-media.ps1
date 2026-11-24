$ErrorActionPreference = 'Stop'
$dest = 'C:\1-2\ok\public\media'
New-Item -ItemType Directory -Force -Path $dest | Out-Null

$items = @(
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/logo_95_02.png', 'logo.png'),
  @('https://www.irlenhof.de/wp-content/uploads/2022/02/logo-irlenhof-mobil.png', 'logo-mobil.png'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/hofladen-02.jpg', 'hofladen.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/philosophie-02.jpg', 'philosophie.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/aktuelles-03.jpg', 'aktuelles.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/MG_6437.jpg', 'kaninchen.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/content_us_01-800x534.jpg', 'hof.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/content_us_06.png', 'gaense-stall.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/20170915_193851-scaled.jpg', 'gaense-flock.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/JY5C0014.jpg', 'team.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/MG_7976b-600x400.jpg', 'hofladen-theke.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/content_us_08-600x400.jpg', 'eier-sortierung.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/20190822_173647-600x450.jpg', 'kartoffeln.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/2015-10-08-09.17.06-300x169.jpg', 'feldgemuese.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/IMG_6966.jpg', 'gaense.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/20200205_110803.jpg', 'haehnchen.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/JY5C0375.jpg', 'puten.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/20200306_081915.jpg', 'schweine.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/20200520_185629.jpg', 'milchkuhe.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/MG_6391.jpg', 'kaelber.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/IMG_3754.jpg', 'legehennen.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/11/iStock-492528037-500x333.jpg', 'produkt-kohlrabi.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/11/iStock-1281158606-500x333.jpg', 'produkt-honig.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/11/iStock-521372400-500x333.jpg', 'produkt-lyoner.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/11/iStock-1045012086-500x333.jpg', 'produkt-kartoffeln.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/11/iStock-1316985407-500x333.jpg', 'produkt-grillwurst.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/11/suppenhuhn-1-500x333.jpg', 'produkt-suppenhuhn.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/11/iStock-890775108-500x333.jpg', 'produkt-brathaehnchen.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/11/iStock-1184623437-500x333.jpg', 'produkt-rinderbeinscheibe.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/11/iStock-1279883538-500x333.jpg', 'produkt-rinderbraten.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/11/iStock-1306529902-500x333.jpg', 'produkt-eier.jpg'),
  @('https://www.irlenhof.de/wp-content/uploads/2021/08/tiersilhouette-01-01.png', 'tiersilhouette.png'),
  @('https://www.irlenhof.de/wp-content/uploads/2022/01/nrw_w_rgb.png', 'nrw-foerderung.png')
)

foreach ($item in $items) {
  $url = $item[0]
  $name = $item[1]
  $out = Join-Path $dest $name
  try {
    Invoke-WebRequest -Uri $url -OutFile $out -TimeoutSec 60 -UseBasicParsing
    $size = (Get-Item $out).Length
    Write-Output "$name OK $size"
  } catch {
    Write-Output "$name FAIL $($_.Exception.Message)"
  }
}
