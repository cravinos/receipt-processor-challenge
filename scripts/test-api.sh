BASE_URL="http://localhost:8000"
RECEIPT_ID=""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' 

echo "Testing Receipt Processor API..."

# 1. Process Receipt sample 1 from readme
echo -e "\n${GREEN}1. Testing Receipt Processing${NC}"
RESPONSE=$(curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },{
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },{
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },{
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },{
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
}' \
  "$BASE_URL/receipts/process")

echo "Response: $RESPONSE"
RECEIPT_ID=$(echo $RESPONSE | jq -r '.id')

if [ -z "$RECEIPT_ID" ] || [ "$RECEIPT_ID" = "null" ]; then
    echo -e "${RED}Failed to get receipt ID${NC}"
    exit 1
fi

# 2. Get Points for sample receupt should be 28 pts 
echo -e "\n${GREEN}2. Testing Points Calculation for Receipt ID: $RECEIPT_ID${NC}"
curl -s "$BASE_URL/receipts/$RECEIPT_ID/points"
echo -e "\n${GREEN}Tests completed!${NC}"