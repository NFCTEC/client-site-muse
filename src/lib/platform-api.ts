/** Open API contract copied from the live platform console (platform.nfctec.com), not invented here. */
export const PLATFORM_API_ORIGIN = "https://platform.nfctec.com";

export const OPEN_API_ENDPOINTS = [
  { method: "GET", path: "/api/open/tags/issued" },
  { method: "POST", path: "/api/open/tags/bind" },
  { method: "POST", path: "/api/open/tags/activate" },
  { method: "POST", path: "/api/open/tags/revoke" },
  { method: "POST", path: "/api/open/verify" },
] as const;

export const VERIFY_REQUEST_EXAMPLE = `{
  "uid": "04A1B2C3D4E5F6",
  "ctr": "000001",
  "cmac": "<16 hex characters>"
}`;

export const VERIFY_RESPONSE_EXAMPLE = `{
  "result": "GENUINE",
  "uid": "04A1B2C3D4E5F6",
  "counter": 1,
  "lifecycle": "IN_SERVICE",
  "productCode": "SKU-1001",
  "productName": "Bottle 750ml",
  "lotCode": "2026-A01",
  "validUntil": "2027-11-11T07:00:00.000Z"
}`;

export const BIND_REQUEST_EXAMPLE = `{
  "uid": "04A1B2C3D4E5F6",
  "productCode": "SKU-1001",
  "productName": "Bottle 750ml",
  "lotCode": "2026-A01"
}`;

export const ACTIVATE_REQUEST_EXAMPLE = `{
  "uid": "04A1B2C3D4E5F6",
  "validDays": 365
}`;

export const REVOKE_REQUEST_EXAMPLE = `{
  "uid": "04A1B2C3D4E5F6",
  "reason": "recall"
}`;

const origin = PLATFORM_API_ORIGIN;

export const VERIFY_NODE_EXAMPLE = `const response = await fetch("${origin}/api/open/verify", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + credential,
  },
  body: JSON.stringify({ url: tapUrl }),
});
const result = await response.json();`;

export const VERIFY_PHP_EXAMPLE = `<?php
$ch = curl_init("${origin}/api/open/verify");
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => [
    "Content-Type: application/json",
    "Authorization: Bearer " . $credential,
  ],
  CURLOPT_POSTFIELDS => json_encode(["url" => $tapUrl], JSON_UNESCAPED_SLASHES),
]);
$result = json_decode(curl_exec($ch), true);`;

export const VERIFY_PYTHON_EXAMPLE = `import json
import urllib.request

request = urllib.request.Request(
    "${origin}/api/open/verify",
    data=json.dumps({"url": tap_url}).encode(),
    headers={
        "Content-Type": "application/json",
        "Authorization": "Bearer " + credential,
    },
    method="POST",
)
result = json.load(urllib.request.urlopen(request))`;
