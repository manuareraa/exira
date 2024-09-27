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
  { uid: "yourShares", name: "Your Shares" },
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
  yourShares?: number;
}

export default function YourPropertiesTable(props: { dummyData: Property[] }) {
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
    // Filter items with "yourShares" field
    let filtered = props.dummyData.filter(
      (item) => item.yourShares !== undefined
    );

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
          const priceA = parseFloat(
            (first as string).replace(/[^0-9.-]+/g, "")
          );
          const priceB = parseFloat(
            (second as string).replace(/[^0-9.-]+/g, "")
          );
          cmp = priceA - priceB;
          break;

        case "yourShares":
          cmp = (first as number) - (second as number);
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
      <div className="flex items-center justify-between gap-4 mt-2 mb-4">
        <div className="flex flex-row gap-x-4">
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
        aria-label="User-owned property table"
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
            <TableRow key={item.id} className="pb-2 my-6">
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
