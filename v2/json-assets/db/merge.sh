#!/bin/bash

# Directory containing the JSON files
input_directory="./"
output_csv="all_properties.csv"

# Create CSV headers based on the schema
echo "created_at,Name,Location,Status,IRR,ARR,Highlights,Gallery,NFTImage,JSONFile,UUID,Area,BaseValue,BonusValue,RentType,RentValue,ValueParameters,Proposals" > "$output_csv"

# Iterate over each JSON file in the input directory
for json_file in "$input_directory"/*.json; do
    # Extract values from JSON using jq and format them for CSV
    created_at=$(jq -r '.created_at' "$json_file" | sed 's/T/ /; s/Z//') # Format datetime
    name=$(jq -r '.Name' "$json_file")
    location=$(jq -r '.Location' "$json_file")
    status=$(jq -r '.Status' "$json_file")
    irr=$(jq -r '.IRR' "$json_file")
    arr=$(jq -r '.ARR' "$json_file")
    
    # Format Highlights and Gallery as a comma-separated string
    highlights=$(jq -r '.Highlights | join(" | ")' "$json_file")
    gallery=$(jq -r '.Gallery | join(" | ")' "$json_file")

    nft_image=$(jq -r '.NFTImage' "$json_file")
    json_file_link=$(jq -r '.JSONFile' "$json_file")
    uuid=$(jq -r '.uuid' "$json_file")
    area=$(jq -r '.Area' "$json_file")
    base_value=$(jq -r '.BaseValue' "$json_file")
    bonus_value=$(jq -r '.BonusValue' "$json_file")
    
    # Extract RentType and RentValue
    rent_type=$(jq -r '.RentType | if . != null then .period else null end' "$json_file")
    rent_value=$(jq -r '.RentType | if . != null then .amount else null end' "$json_file")
    
    # Convert ValueParameters and Proposals to JSON strings
    value_parameters=$(jq -c '.ValueParameters' "$json_file" | sed 's/,/|/g')
    Proposals=$(jq -c '.Proposals' "$json_file" | sed 's/,/|/g')

    # Write extracted values to CSV, handling empty/null fields properly
    echo "$created_at,$name,$location,$status,$irr,$arr,\"$highlights\",\"$gallery\",$nft_image,$json_file_link,$uuid,$area,$base_value,$bonus_value,$rent_type,$rent_value,\"$value_parameters\",\"$Proposals\"" >> "$output_csv"
done

echo "CSV conversion completed. All data saved to $output_csv."

