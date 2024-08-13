param (
    [Parameter(Mandatory=$true)]
    [string]$SubscriptionId,

    [Parameter(Mandatory=$true)]
    [string]$ResourcePrefix,

    [Parameter(Mandatory=$true)]
    [string]$Location,

    [Parameter(Mandatory=$true)]
    [string]$OrgUrl,

    [Parameter(Mandatory=$true)]
    [string]$ProjectName
)

# Login to Azure
Write-Host "Logging into Azure..."
az login --use-device-code

# Set the subscription
Write-Host "Setting subscription..."
az account set --subscription $SubscriptionId

# Create Resource Group
$resourceGroupName = "${ResourcePrefix}-rg"
Write-Host "Creating resource group $resourceGroupName in $Location..."
az group create --name $resourceGroupName --location $Location

# Create Azure Storage Account (example)
$storageAccountName = "${ResourcePrefix}storage"
Write-Host "Creating storage account $storageAccountName..."
az storage account create --name $storageAccountName --resource-group $resourceGroupName --location $Location --sku Standard_LRS

# (Add more resource creation as needed...)

# Create .nextazure.json file
$config = @{
    SubscriptionId = $SubscriptionId
    ResourceGroupName = $resourceGroupName
    StorageAccountName = $storageAccountName
    Location = $Location
    OrgUrl = $OrgUrl
    ProjectName = $ProjectName
}

$config | ConvertTo-Json | Set-Content -Path ".nextazure.json"

Write-Host "Initialization complete. Configuration saved to .nextazure.json."
