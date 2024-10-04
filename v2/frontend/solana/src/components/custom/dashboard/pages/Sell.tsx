import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
  Input,
  SortDescriptor,
} from "@nextui-org/react";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { usePropertiesStore } from "../../../../state-management/store";
import { useNavigate } from "react-router-dom";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import toast from "react-hot-toast";

export default function Sell() {
  const navigate = useNavigate();
  const {
    sellOrdersForUser,
    addSellOrder,
    removeSellOrder,
    userInvestments,
    fetchSellOrdersForAUser,
  } = usePropertiesStore();

  const wallet = useWallet();
  const { connection } = useConnection();
  const umi = createUmi(connection)
    .use(walletAdapterIdentity(wallet))
    // this is for minting programmable NFTs
    .use(mplTokenMetadata());

  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [shareCount, setShareCount] = useState<number>(0);
  const [sellPrice, setSellPrice] = useState<number>(0);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "propertyName",
    direction: "ascending",
  });

  // Dropdown options for user properties
  const propertyOptions = useMemo(() => {
    return userInvestments.properties.map((property) => ({
      uid: property.UUID,
      name: property.JSONData.name,
      sharesOwned: property.quantity, // User's available shares
    }));
  }, [userInvestments]);

  // Handle form submission for listing shares
  const handleListShares = () => {
    if (!selectedProperty || shareCount <= 0 || sellPrice <= 0) {
      toast.error("Please fill out all fields with valid values.");
      return;
    }

    const selectedInvestment = userInvestments.properties.find(
      (prop) => prop.UUID === selectedProperty
    );

    if (!selectedInvestment) {
      toast.error("Selected property not found.");
      return;
    }

    if (shareCount > selectedInvestment.quantity) {
      toast.error("You can't list more shares than you own.");
      return;
    }

    // Call addSellOrder function
    addSellOrder({
      UUID: selectedProperty,
      TokenAddress: selectedInvestment.TokenAddress,
      SellerAddress: umi.identity.publicKey, // Use actual userAddress from auth
      Quantity: shareCount,
      PricePerShare: sellPrice,
    });

    fetchSellOrdersForAUser(umi.identity?.publicPublicKey);
    setSelectedProperty(null);
    setShareCount(0);
    setSellPrice(0);
  };

  // Handle removing a sell order
  const handleWithdrawListing = (orderId) => {
    removeSellOrder(orderId);
  };

  // Sorting for sell orders
  const sortedSellOrders = useMemo(() => {
    return [...sellOrdersForUser].sort((a, b) => {
      const first =
        a[sortDescriptor.column as keyof (typeof sellOrdersForUser)[0]];
      const second =
        b[sortDescriptor.column as keyof (typeof sellOrdersForUser)[0]];
      let cmp = 0;

      switch (sortDescriptor.column) {
        case "propertyName":
          cmp = a.propertyData.Name.localeCompare(b.propertyData.Name);
          break;
        case "location":
          cmp = a.propertyData.Location.localeCompare(b.propertyData.Location);
          break;
        case "sellPrice":
          cmp = a.Price - b.Price;
          break;
        case "sharesListed":
          cmp = a.Quantity - b.Quantity;
          break;
        default:
          cmp = 0;
      }

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, sellOrdersForUser]);

  return (
    <div className="w-full max-w-full px-4 mx-auto">
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-normal">List your shares</h2>
          <h1 className="text-5xl font-bold">Sell Your Properties</h1>
        </div>
      </div>

      {/* divider */}
      <div className="py-0 my-0 divider before:bg-black/5 after:bg-black/5"></div>

      {/* sell form */}
      <div className="flex flex-col items-start mb-6">
        <div className="my-3 mb-4">
          <p className="text-xl font-semibold">Sell your shares</p>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <Dropdown className="">
            <DropdownTrigger className="">
              <Button
                endContent={<ChevronDownIcon />}
                variant="flat"
                className="px-16 py-4 text-md"
              >
                {selectedProperty
                  ? propertyOptions.find(
                      (prop: {
                        uid: string;
                        name: string;
                        sharesOwned: number;
                      }) => prop.uid === selectedProperty
                    )?.name +
                    " (" +
                    propertyOptions.find(
                      (prop: {
                        uid: string;
                        name: string;
                        sharesOwned: number;
                      }) => prop.uid === selectedProperty
                    )?.sharesOwned +
                    ")"
                  : "Select Property"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              selectionMode="single"
              selectedKeys={new Set([selectedProperty])}
              onSelectionChange={(keys) => setSelectedProperty(keys.anchorKey)}
            >
              {propertyOptions.map((property) => (
                <DropdownItem key={property.uid}>
                  {property.name + " (" + property.sharesOwned + ")"}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Input
            placeholder="Enter number of shares"
            type="number"
            value={shareCount}
            onValueChange={(value) => setShareCount(parseInt(value))}
            className="w-[15rem]"
          />

          <Input
            placeholder="Enter selling price per share"
            type="number"
            value={sellPrice}
            onValueChange={(value) => setSellPrice(parseFloat(value))}
            className="w-[15rem]"
          />

          {/*  a disabled input that multiplies and shows the final total amount */}
          <Input
            placeholder="Total Amount"
            type="number"
            value={(sellPrice * shareCount).toFixed(2)}
            disabled
            className="w-[15rem]"
          />

          <Button onClick={handleListShares} className="bg-alpha text-beta">
            List Shares
          </Button>
        </div>
      </div>

      {/* listing table */}
      <div className="flex flex-col items-start">
        <div className="my-3 mb-4">
          <p className="text-xl font-semibold">Your Listed Shares</p>
        </div>
        <Table
          aria-label="Sell orders table"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
        >
          <TableHeader
            columns={[
              { uid: "propertyName", name: "Property Name" },
              { uid: "location", name: "Location" },
              { uid: "sellPrice", name: "Selling Price" },
              { uid: "sharesListed", name: "Shares Listed" },
              { uid: "actions", name: "Actions" },
            ]}
            className="text-lg"
          >
            {(column) => (
              <TableColumn
                key={column.uid}
                allowsSorting
                align="start"
                className="text-md text-alpha"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={sortedSellOrders}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>{item.propertyData.Name}</TableCell>
                <TableCell>{item.propertyData.Location}</TableCell>
                <TableCell>${item.Price.toFixed(2)}</TableCell>
                <TableCell>{item.Quantity}</TableCell>
                <TableCell>
                  <div className="flex gap-x-2">
                    <Button
                      onClick={() =>
                        window.open(
                          `https://property-platform.com/view/${item.UUID}`,
                          "_blank"
                        )
                      }
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => handleWithdrawListing(item.id)}
                      variant="danger"
                    >
                      Withdraw
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
