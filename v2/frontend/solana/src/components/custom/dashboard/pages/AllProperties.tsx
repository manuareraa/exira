import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";

import { usePropertiesStore } from "../../../../state-management/store";

export default function PropertyTable() {
  const { fetchProperties, properties } = usePropertiesStore();

  function calculateTotalShares(sharePerNFT) {
    return Math.round(1 / sharePerNFT);
  }

  // // Process the properties data to flatten necessary fields
  // const processedProperties = React.useMemo(() => {
  //   return properties.map((item) => {
  //     const propertyType = item.JSONData.attributes.propertyType;
  //     const initialSharePrice = parseFloat(
  //       item.JSONData.attributes.initialSharePrice
  //     );
  //     // For currentPrice, use initialSharePrice or "Not Trading" based on Status
  //     const currentPrice =
  //       item.Status === "trading" ? `$${initialSharePrice}` : "Not Trading";
  //     // Assuming totalShares is available; otherwise, set as "N/A"
  //     const totalShares = item.totalShares || "N/A";

  //     return {
  //       UUID: item.UUID,
  //       Name: item.Name,
  //       Location: item.Location,
  //       propertyType,
  //       initialSharePrice,
  //       currentPrice,
  //       totalShares,
  //     };
  //   });
  // }, [properties]);
  const processedProperties = React.useMemo(() => {
    return properties.map((item) => {
      const propertyType = item.JSONData.attributes.propertyType;
      const initialSharePrice = parseFloat(
        item.JSONData.attributes.initialSharePrice
      );
      const sharePerNFT = parseFloat(item.JSONData.attributes.sharePerNFT);
      const totalShares =
        item.JSONData.attributes.initialPropertyValue /
        item.JSONData.attributes.initialSharePrice;

      // Assuming you have a way to determine available shares
      // For demonstration, let's assume all shares are available
      const availableShares = totalShares; // Replace with actual available shares if different

      // For currentPrice, use initialSharePrice or "Not Trading" based on Status
      const currentPrice =
        item.Status === "trading" ? `$${initialSharePrice}` : "Not Trading";

      return {
        UUID: item.UUID,
        Name: item.Name,
        Location: item.Location,
        propertyType,
        initialSharePrice,
        currentPrice,
        totalShares,
        availableShares,
        // Include other necessary fields
      };
    });
  }, [properties]);

  // Generate property types dynamically
  const propertyTypes = React.useMemo(() => {
    const uniqueTypes = Array.from(
      new Set(processedProperties.map((item) => item.propertyType))
    );
    return uniqueTypes.map((type) => ({
      uid: type.toLowerCase(),
      name: type.charAt(0).toUpperCase() + type.slice(1),
    }));
  }, [processedProperties]);

  // Generate locations dynamically
  const locations = React.useMemo(() => {
    const uniqueCountries = Array.from(
      new Set(
        processedProperties.map((item) => {
          const parts = item.Location.split(",").map((part) => part.trim());
          const country = parts[parts.length - 1]; // Take the last entry as country
          return country;
        })
      )
    );
    return uniqueCountries.map((country) => ({
      uid: country.toLowerCase().replace(/\s+/g, "-"),
      name: country,
    }));
  }, [processedProperties]);

  // Generate price ranges dynamically
  const priceRanges = React.useMemo(() => {
    // Extract ticket prices and convert them to numbers
    const prices = processedProperties.map((item) => item.initialSharePrice);

    // Determine the minimum and maximum prices
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Define the number of ranges you want
    const rangeCount = 4;

    // Calculate the size of each range
    const rangeSize = (maxPrice - minPrice) / rangeCount;

    // Generate the ranges
    const ranges = [];
    for (let i = 0; i < rangeCount; i++) {
      const start = minPrice + i * rangeSize;
      const end =
        i < rangeCount - 1 ? minPrice + (i + 1) * rangeSize : Infinity;
      const uid =
        end !== Infinity
          ? `${Math.floor(start)}-${Math.floor(end)}`
          : `${Math.floor(start)}+`;
      const name =
        end !== Infinity
          ? `$${Math.floor(start)} - $${Math.floor(end)}`
          : `$${Math.floor(start)}+`;
      ranges.push({ uid, name });
    }
    return ranges;
  }, [processedProperties]);

  const columns = [
    { uid: "Name", name: "Property Name" },
    { uid: "Location", name: "Location" },
    { uid: "propertyType", name: "Property Type" },
    { uid: "initialSharePrice", name: "Ticket Price" },
    { uid: "currentPrice", name: "Current Price" },
    { uid: "totalShares", name: "Total Shares" },
    { uid: "actions", name: "Actions" },
  ];

  interface Property {
    UUID: string;
    Name: string;
    Location: string;
    propertyType: string;
    initialSharePrice: number;
    currentPrice: string | number;
    totalShares: string;
  }

  const [filterValue, setFilterValue] = React.useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = React.useState<Selection>(
    new Set(["all"])
  );
  const [locationFilter, setLocationFilter] = React.useState<Selection>(
    new Set(["all"])
  );
  const [priceFilter, setPriceFilter] = React.useState<Selection>(
    new Set(["all"])
  );
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "Name",
    direction: "ascending",
  });

  const filteredItems = React.useMemo(() => {
    let filtered = [...processedProperties];

    if (filterValue) {
      filtered = filtered.filter((item) =>
        item.Name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (!propertyTypeFilter.has("all")) {
      filtered = filtered.filter((item) =>
        Array.from(propertyTypeFilter).some(
          (type) => type === item.propertyType.toLowerCase()
        )
      );
    }

    if (!locationFilter.has("all")) {
      filtered = filtered.filter((item) => {
        const parts = item.Location.split(",").map((part) => part.trim());
        const country = parts[parts.length - 1];
        return Array.from(locationFilter).some(
          (loc) => loc === country.toLowerCase().replace(/\s+/g, "-")
        );
      });
    }

    if (!priceFilter.has("all")) {
      filtered = filtered.filter((item) => {
        const price = item.initialSharePrice;
        return Array.from(priceFilter).some((range) => {
          if (range === "all") return true;
          const [minStr, maxStr] = range.split("-");
          const min = parseFloat(minStr);
          const max = maxStr ? parseFloat(maxStr) : Infinity;
          return price >= min && price <= max;
        });
      });
    }

    return filtered;
  }, [
    filterValue,
    propertyTypeFilter,
    locationFilter,
    priceFilter,
    processedProperties,
  ]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Property];
      const second = b[sortDescriptor.column as keyof Property];
      let cmp: number;

      switch (sortDescriptor.column) {
        case "Name":
        case "propertyType":
          cmp = (first as string).localeCompare(second as string);
          break;
        case "Location":
          // Group by country first, then sort alphabetically by city
          const [cityA, ...restA] = (a.Location as string)
            .split(", ")
            .map((part) => part.trim());
          const countryA = restA[restA.length - 1];
          const [cityB, ...restB] = (b.Location as string)
            .split(", ")
            .map((part) => part.trim());
          const countryB = restB[restB.length - 1];
          cmp = countryA.localeCompare(countryB) || cityA.localeCompare(cityB);
          break;
        case "initialSharePrice":
          cmp = (first as number) - (second as number);
          break;
        case "currentPrice":
          if (first === "Not Trading" && second === "Not Trading") {
            cmp = 0;
          } else if (first === "Not Trading") {
            cmp = 1;
          } else if (second === "Not Trading") {
            cmp = -1;
          } else {
            const priceA = parseFloat(first as string);
            const priceB = parseFloat(second as string);
            cmp = priceA - priceB;
          }
          break;
        // Add case for "totalShares" if necessary
        default:
          cmp = 0;
      }

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  // const renderCell = React.useCallback(
  //   (item: Property, columnKey: React.Key) => {
  //     const cellValue = item[columnKey as keyof Property];

  //     switch (columnKey) {
  //       case "actions":
  //         return (
  //           <button className="px-4 py-2 font-bold text-white bg-black border-2 border-black rounded-full hover:bg-white hover:text-black">
  //             View
  //           </button>
  //         );
  //       case "initialSharePrice":
  //         return `$${cellValue}`;
  //       case "propertyType":
  //         if (cellValue === "residential") {
  //           return "Residential";
  //         } else if (cellValue === "commercial") {
  //           return "Commercial";
  //         } else if (cellValue === "industrial") {
  //           return "Industrial";
  //         } else if (cellValue === "emptyPlot") {
  //           return "Empty Plot";
  //         } else if (cellValue === "farmingLand") {
  //           return "Farming Land";
  //         }
  //       default:
  //         return cellValue;
  //     }
  //   },
  //   []
  // );

  const renderCell = React.useCallback(
    (item: Property, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof Property];

      switch (columnKey) {
        case "actions":
          return (
            <button className="px-4 py-2 font-bold text-white bg-black border-2 border-black rounded-full hover:bg-white hover:text-black">
              View
            </button>
          );
        case "initialSharePrice":
          return `$${cellValue}`;
        case "propertyType":
          switch (cellValue) {
            case "residential":
              return "Residential";
            case "commercial":
              return "Commercial";
            case "industrial":
              return "Industrial";
            case "emptyPlot":
              return "Empty Plot";
            case "farmingLand":
              return "Farming Land";
            default:
              return cellValue;
          }
        case "totalShares":
          // Display available shares and total shares
          return `${item.availableShares} / ${item.totalShares}`;
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <div className="w-full max-w-full px-4 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-normal">Explore Properties</h2>
          <h1 className="text-5xl font-bold">Your Next Investment</h1>
        </div>
        <div className="text-right">
          <p className="text-2xl">Total Asset Value</p>
          <p className="text-5xl font-bold">₹ 8,56,52,600</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 mt-8 mb-6 md:flex-row">
        <div className="flex flex-wrap gap-4">
          {/* Property Type Filter */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                endContent={<ChevronDownIcon />}
                variant="flat"
                className="h-12 text-md"
              >
                Property Type
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              selectedKeys={propertyTypeFilter}
              selectionMode="multiple"
              onSelectionChange={setPropertyTypeFilter}
              closeOnSelect={false}
            >
              <DropdownItem key="all">All Types</DropdownItem>
              {propertyTypes.map((type) => (
                <DropdownItem key={type.uid}>{type.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Location Filter */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                endContent={<ChevronDownIcon />}
                variant="flat"
                className="h-12 text-md"
              >
                Location
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              selectedKeys={locationFilter}
              selectionMode="multiple"
              onSelectionChange={setLocationFilter}
              closeOnSelect={false}
            >
              <DropdownItem key="all">All Locations</DropdownItem>
              {locations.map((location) => (
                <DropdownItem key={location.uid}>{location.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          {/* Price Filter */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                endContent={<ChevronDownIcon />}
                variant="flat"
                className="h-12 text-md"
              >
                Price
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              selectedKeys={priceFilter}
              selectionMode="multiple"
              onSelectionChange={setPriceFilter}
              closeOnSelect={false}
            >
              <DropdownItem key="all">All Prices</DropdownItem>
              {priceRanges.map((range) => (
                <DropdownItem key={range.uid}>{range.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Search Input */}
        <Input
          className="w-full max-w-lg text-xl"
          placeholder="Search for a property by name, location, etc..."
          startContent={<SearchIcon />}
          value={filterValue}
          onValueChange={setFilterValue}
          size="lg"
        />
      </div>

      <Table
        aria-label="Property investment table"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              allowsSorting
              align={column.uid === "actions" ? "center" : "start"}
              className="text-black text-md"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={sortedItems}>
          {(item) => (
            <TableRow key={item.UUID}>
              {(columnKey) => (
                <TableCell className="text-md">
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
