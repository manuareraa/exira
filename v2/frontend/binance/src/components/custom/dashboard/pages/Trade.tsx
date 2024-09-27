import React from "react";
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

const propertyTypes = [
  { uid: "residential", name: "Residential" },
  { uid: "commercial", name: "Commercial" },
  { uid: "industrial", name: "Industrial" },
];

const locations = [
  { uid: "india", name: "India" },
  { uid: "france", name: "France" },
  { uid: "russia", name: "Russia" },
  { uid: "usa", name: "USA" },
];

const priceRanges = [
  { uid: "0-100", name: "$0 - $100" },
  { uid: "101-500", name: "$101 - $500" },
  { uid: "501-1000", name: "$501 - $1000" },
  { uid: "1001+", name: "$1001+" },
];

const columns = [
  { uid: "propertyName", name: "Property Name" },
  { uid: "location", name: "Location" },
  { uid: "propertyType", name: "Property Type" },
  { uid: "ticketPrice", name: "Ticket Price" },
  { uid: "currentPrice", name: "Current Price" },
  { uid: "totalShares", name: "Total Shares" },
  { uid: "actions", name: "Actions" },
];

interface Property {
  id: number;
  propertyName: string;
  location: string;
  country: string;
  propertyType: string;
  ticketPrice: string;
  currentPrice: string;
  totalShares: string;
}

const dummyData: Property[] = [
  {
    id: 1,
    propertyName: "Riverside Apartments",
    location: "Bengaluru, India",
    country: "India",
    propertyType: "Residential",
    ticketPrice: "$25",
    currentPrice: "Not Trading",
    totalShares: "4533 / 6800",
  },
  {
    id: 2,
    propertyName: "Central Mall",
    location: "Paris, France",
    country: "France",
    propertyType: "Commercial",
    ticketPrice: "$345",
    currentPrice: "Not Trading",
    totalShares: "90 / 980",
  },
  {
    id: 3,
    propertyName: "Dzokevic Warehouse",
    location: "St.Petersburg, Russia",
    country: "Russia",
    propertyType: "Industrial",
    ticketPrice: "$85",
    currentPrice: "$85.5 / share",
    totalShares: "90 / 980",
  },
  {
    id: 4,
    propertyName: "Sunset Condos",
    location: "Mumbai, India",
    country: "India",
    propertyType: "Residential",
    ticketPrice: "$50",
    currentPrice: "Not Trading",
    totalShares: "2000 / 3000",
  },
  {
    id: 5,
    propertyName: "Tech Park",
    location: "San Francisco, USA",
    country: "USA",
    propertyType: "Commercial",
    ticketPrice: "$1200",
    currentPrice: "$1250 / share",
    totalShares: "50 / 100",
  },
];

export default function Trade() {
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
    column: "propertyName",
    direction: "ascending",
  });

  const filteredItems = React.useMemo(() => {
    let filtered = [...dummyData];

    if (filterValue) {
      filtered = filtered.filter((item) =>
        item.propertyName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (!propertyTypeFilter.has("all")) {
      filtered = filtered.filter((item) =>
        propertyTypeFilter.has(item.propertyType.toLowerCase())
      );
    }

    if (!locationFilter.has("all")) {
      filtered = filtered.filter((item) =>
        locationFilter.has(item.country.toLowerCase())
      );
    }

    if (!priceFilter.has("all")) {
      filtered = filtered.filter((item) => {
        const price = parseFloat(item.ticketPrice.replace("$", ""));
        return Array.from(priceFilter).some((range) => {
          const [min, max] = range.split("-").map(Number);
          return price >= min && (max ? price <= max : true);
        });
      });
    }

    // Filter to include only properties where currentPrice is "Not Trading"
    filtered = filtered.filter((item) => item.currentPrice !== "Not Trading");

    return filtered;
  }, [filterValue, propertyTypeFilter, locationFilter, priceFilter]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Property];
      const second = b[sortDescriptor.column as keyof Property];
      let cmp: number;

      switch (sortDescriptor.column) {
        case "propertyName":
        case "propertyType":
          cmp = first.localeCompare(second);
          break;
        case "location":
          // Group by country first, then sort alphabetically by city
          const [cityA, countryA] = (a.location as string).split(", ");
          const [cityB, countryB] = (b.location as string).split(", ");
          cmp = countryA.localeCompare(countryB) || cityA.localeCompare(cityB);
          break;
        case "ticketPrice":
        case "currentPrice":
          const isNotTradingA = (first as string).includes("Not Trading");
          const isNotTradingB = (second as string).includes("Not Trading");

          if (isNotTradingA && isNotTradingB) {
            cmp = 0; // Both are "Not Trading"
          } else if (isNotTradingA) {
            cmp = 1; // "Not Trading" comes after
          } else if (isNotTradingB) {
            cmp = -1; // "Not Trading" comes after
          } else {
            // Both have prices, extract and compare
            const priceA = parseFloat(
              (first as string).replace(/[^0-9.-]+/g, "")
            );
            const priceB = parseFloat(
              (second as string).replace(/[^0-9.-]+/g, "")
            );
            cmp = priceA - priceB;
          }
          break;

        case "totalShares":
          const availableSharesA = parseInt((first as string).split(" / ")[0]);
          const availableSharesB = parseInt((second as string).split(" / ")[0]);
          cmp = availableSharesA - availableSharesB;
          break;

        default:
          cmp = 0;
      }

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

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
          <h1 className="text-5xl font-bold">Find and Trade Profitable Shares</h1>
        </div>
        <div className="text-right">
          <p className="text-2xl">Total Asset Value</p>
          <p className="text-5xl font-bold">₹ 8,56,52,600</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mt-8 mb-6">
        <div className="flex flex-row gap-x-4">
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
        // isStriped
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
            <TableRow key={item.id}>
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
