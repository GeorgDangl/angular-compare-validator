$readme = Join-Path -Path (Get-Item $PSScriptRoot).Parent.FullName -ChildPath "README.md"
Copy-Item -Path $readme -Destination "$PSScriptRoot\README.md"
& npm publish
Remove-Item -Path "$PSScriptRoot\README.md"