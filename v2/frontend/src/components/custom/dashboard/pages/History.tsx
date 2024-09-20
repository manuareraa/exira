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

// New Transaction dummy data
const txnDummyData = [
  {
    id: 1,
    propertyName: "Riverside Apartments",
    location: "Bengaluru, India",
    country: "India",
    propertyType: "Residential",
    ticketPrice: "$25",
    sharesBought: 1000,
    purchasedOn: "2023-09-12T15:34:00", // ISO format
    txnLink: "https://blockchain-explorer.com/tx/123456",
  },
  {
    id: 2,
    propertyName: "Central Mall",
    location: "Paris, France",
    country: "France",
    propertyType: "Commercial",
    ticketPrice: "$345",
    sharesBought: 200,
    purchasedOn: "2023-08-30T10:15:00",
    txnLink: "https://blockchain-explorer.com/tx/7891011",
  },
  {
    id: 3,
    propertyName: "Dzokevic Warehouse",
    location: "St.Petersburg, Russia",
    country: "Russia",
    propertyType: "Industrial",
    ticketPrice: "$85",
    sharesBought: 300,
    purchasedOn: "2023-09-01T12:00:00",
    txnLink: "https://blockchain-explorer.com/tx/121314",
  },
];

const propertyTypes = [
  { uid: "residential", name: "Residential" },
  { uid: "commercial", name: "Commercial" },
  { uid: "industrial", name: "Industrial" },
];

const txnColumns = [
  { uid: "propertyName", name: "Property Name" },
  { uid: "location", name: "Location" },
  { uid: "propertyType", name: "Property Type" },
  { uid: "ticketPrice", name: "Ticket Price" },
  { uid: "sharesBought", name: "Shares Bought" },
  { uid: "purchasedOn", name: "Purchased On" },
  { uid: "totalPaid", name: "Total Paid" }, // Add this new column
  { uid: "actions", name: "Actions" },
];

const locations = [
  { uid: "india", name: "India" },
  { uid: "france", name: "France" },
  { uid: "russia", name: "Russia" },
  { uid: "usa", name: "USA" },
];

export default function History() {
  const [filterValue, setFilterValue] = React.useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = React.useState<Selection>(
    new Set(["all"])
  );
  const [locationFilter, setLocationFilter] = React.useState<Selection>(
    new Set(["all"])
  );
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "propertyName",
    direction: "ascending",
  });

  const filteredItems = React.useMemo(() => {
    let filtered = [...txnDummyData];

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

    return filtered;
  }, [filterValue, propertyTypeFilter, locationFilter]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof (typeof txnDummyData)[0]];
      const second = b[sortDescriptor.column as keyof (typeof txnDummyData)[0]];
      let cmp: number;

      switch (sortDescriptor.column) {
        case "propertyName":
        case "propertyType":
          cmp = first.localeCompare(second);
          break;
        case "location":
          const [cityA, countryA] = (a.location as string).split(", ");
          const [cityB, countryB] = (b.location as string).split(", ");
          cmp = countryA.localeCompare(countryB) || cityA.localeCompare(cityB);
          break;
        case "ticketPrice":
          const priceA = parseFloat(
            (first as string).replace(/[^0-9.-]+/g, "")
          );
          const priceB = parseFloat(
            (second as string).replace(/[^0-9.-]+/g, "")
          );
          cmp = priceA - priceB;
          break;

        case "sharesBought":
          cmp = (first as number) - (second as number);
          break;

        case "purchasedOn":
          const dateA = new Date(first).getTime();
          const dateB = new Date(second).getTime();
          cmp = dateA - dateB;
          break;

        default:
          cmp = 0;
      }

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const renderCell = React.useCallback((item, columnKey) => {
    const cellValue = item[columnKey as keyof (typeof txnDummyData)[0]];

    switch (columnKey) {
      case "actions":
        return (
          <a
            href={item.txnLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-white bg-black border-2 border-black rounded-full hover:bg-white hover:text-black"
          >
            View Txn
          </a>
        );
      case "purchasedOn":
        return new Date(cellValue).toLocaleDateString(); // Format date
      case "totalPaid":
        const ticketPrice = parseFloat(item.ticketPrice.replace("$", ""));
        return `$ ${(ticketPrice * item.sharesBought).toFixed(2)}`; // Calculate Total Paid
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="w-full max-w-full px-4 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-normal">Transaction History</h2>
          <h1 className="text-5xl font-bold">Your Investment Records</h1>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mt-8 mb-6">
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
        aria-label="Transaction history table"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={txnColumns}>
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
        <TableBody items={sortedItems} className="py-2">
          {(item) => (
            <TableRow key={item.id} className="">
              {(columnKey) => (
                <TableCell className="py-3 text-md">
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
